# Code Example - Cinema Booking

> [!NOTE]
> Демонстрационный проект онлайн-бронирования билетов в кинотеатрах, построенный на **Nuxt 3 / Vue 3**, реализующий **Feature‑Sliced Design (FSD) архитектуру**.

Основной фокус – архитектурная чистота, масштабируемость и поддерживаемость кода.

- BFF (Backend‑For‑Frontend) – выделенный слой на сервере Nuxt 3 (Nitro), агрегирующий данные от upstream API, с кэшированием (Nitro storage) и централизованной обработкой ошибок.
- Feature‑Sliced Design (FSD) – чёткое разделение на слои (features, widgets, pages, shared) и контроль границ через ESLint.
- Оптимистичные UI‑обновления (оплата билетов) с плавными анимациями TransitionGroup.
- Типобезопасность – единые модели common/model для клиента и сервера.
- Тесты (Vitest, Playwright) – планируются.


## Что реализовано

- Каталог фильмов и кинотеатров.
- Страницы деталей фильма, кинотеатра и сеанса.
- Выбор мест в зале и создание бронирования.
- Авторизация, регистрация, logout, проверка сессии.
- Страница «Мои билеты» с оплатой и обновлением состояния билета.
- Агрегация данных на BFF (сеанс + фильм + кинотеатр + lifecycle брони).

## Стек

- `Nuxt 3`, `Vue 3`, `TypeScript`
- `@nuxt/ui`, `Tailwind CSS`
- `@vueuse/core`
- `Vitest`, `Playwright`
- `ESLint` (flat config), `Prettier`
- BFF на `Nitro` (`server/`)

## Быстрый старт

```bash
pnpm install
cp .env.example .env
pnpm dev
```

Локальный фронт: `http://localhost:3000`.

## Переменные окружения

Минимально необходимые переменные:

```env
NUXT_PUBLIC_API_BASE_URL=http://localhost:3022
API_BASE_URL=http://localhost:3022
SESSION_SECRET=test-secret-test-secret-test-secret-test
```

- `NUXT_PUBLIC_API_BASE_URL` — публичный base URL для запросов из браузера.
- `API_BASE_URL` — base URL для BFF -> upstream (server-side).
- `SESSION_SECRET` — secret для cookie-сессии BFF.

Для production есть шаблон: [`.env.production.example`](./.env.production.example).

## Скрипты

```bash
pnpm dev
pnpm build
pnpm preview
pnpm generate
pnpm clean

pnpm test
pnpm test:watch
pnpm test:coverage
pnpm test:unit
pnpm test:nuxt
pnpm test:e2e
pnpm test:e2e:ui

pnpm exec eslint src server common nuxt.config.ts eslint.config.mjs
pnpm exec nuxi typecheck
```

## Архитектура

### Клиент (`src/`)

Проект использует FSD-слои:

- `app` — инициализация Nuxt, `layouts`, `middleware`, Nuxt роутинг `pages`.
- `pages` — UI страниц (оркестрация виджетов/фич).
- `widgets` — крупные переиспользуемые UI-блоки.
- `features` — пользовательские сценарии (`auth`, `create-booking`, `pay-booking`).
- `shared` — общие утилиты, маршруты, auth-хелперы, UI-блоки.

> [!NOTE]
> Слой `entities` решил не выделять отдельно, что допустимо в случае тонкого клиента ([https://feature-sliced.design/docs/guides/issues/excessive-entities#how-to-keep-entities-layer-clean]): доменные типы вынесены в [`common/model`](./common/model). 

### BFF (`server/`)

- `api/` — HTTP-эндпоинты Nuxt/Nitro.
- `services/` — бизнес-логика и агрегация данных.
- `gateways/` — вызовы upstream API.
- `utils/` — кэш, валидация, обработка ошибок, auth-утилиты.

Ключевой инвариант: запросы в upstream выполняются через [`upstreamFetch`](./server/gateways/upstream-http.ts), а не напрямую из `services`/`api`.

### Общие модели (`common/`)

- `common/model` — shared типы для клиента и сервера.
- `common/lib/validation` — `zod`-схемы для валидации payload.
- `common/config` — общие конфиги (например, `useApiBaseUrl`).

## Соглашение по наименованию

### Файлы и директории

- Директории слайсов: `kebab-case` (`my-tickets`, `create-booking`).
- Vue-компоненты: `PascalCase.vue` (`TicketCard.vue`, `CinemaHall.vue`).
- Composable/хуки: `useXxx.ts` (`useMyTicketsPageData.ts`, `useAuth.ts`).
- Клиентские файлы `api/lib/model`: `camelCase.ts` (`getErrorMessage.ts`, `groupSeatsByRow.ts`, `mapSeatIdsToBookedSeats.ts`).
- Server/common utilities and services: `camelCase.ts` (`errorMapper.ts`, `bookingLifecycle.ts`).
- Public API слайса: `index.ts` в корне слайса.

### Эндпоинты Nuxt/Nitro

- Файлы роутов: `*.get.ts`, `*.post.ts`.
- Динамические сегменты: `[id].get.ts`, `[id]/bookings.post.ts`.

### Импорты

- Используем алиасы: `@shared`, `@features`, `@widgets`, `@pages`, `#common`.
- Клиентский код не импортирует `#server`.
- Импорты не должны нарушать направление слоёв (проверяется ESLint-правилами).
- Импорты внутреннего кода слайсов используют относительный путь `./` `../`.

## Архитектурные инварианты

1. `shared` не зависит от `features/widgets/pages`.
2. `features` не зависит от `widgets/pages`.
3. `widgets` не зависит от `pages`.
4. Upstream-вызовы идут только через `server/gateways/*` + `upstreamFetch`.
5. Валидация входных данных API выполняется через `common/lib/validation`.
6. Типы домена не дублируются между клиентом и BFF, а берутся из `common/model`.

## BFF API

Реализованные маршруты:

- `POST /api/auth/login`
- `POST /api/auth/register`
- `POST /api/auth/logout`
- `GET /api/auth/session`
- `GET /api/movies`
- `GET /api/movies/:id`
- `GET /api/cinemas`
- `GET /api/cinemas/:id`
- `GET /api/movie-sessions/:id`
- `POST /api/movie-sessions/:id/bookings`
- `GET /api/my-tickets`
- `GET /api/my-tickets/:id`
- `POST /api/bookings/:id/payments`

## Кэширование

В BFF включено кэширование справочников через Nitro storage:

- `movies:all` — TTL `300` секунд.
- `cinemas:all` — TTL `300` секунд.

## Качество и тесты

Текущее состояние тестов:

- Есть базовые примеры unit/nuxt/e2e тестов.
- Покрытие пока низкое и не отражает все критические бизнес-сценарии.

## Самопроверка перед ревью 

Перед отправкой на проверку прогоняйте:

```bash
pnpm exec eslint src server common nuxt.config.ts eslint.config.mjs
pnpm exec nuxi typecheck
pnpm test --run
```

И дополнительно проверяйте:

- Нет ли новых импортов против правил слоёв. (Возможно позже стоит добавить Steiger [https://github.com/feature-sliced/steiger]).
- Не появился ли прямой вызов upstream вне `server/gateways`.
- Не разошлись ли README и фактические значения (эндпоинты, TTL, скрипты, env).