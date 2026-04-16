import type { BookedSeat } from "#common/model";

export type Booking = {
  id: string;
  userId: number;
  sessionId: number;
  movieSessionId: number; // ID для API запросов
  bookedAt: string; // ISO строка
  seats: BookedSeat[];
  isPaid: boolean;
};

export type CategorizedBookings = {
  // Неоплаченные билеты (истекают по времени)
  unpaid: Booking[];
  // Будущие сеансы (оплаченные, время сеанса > текущего)
  upcoming: Booking[];
  // Прошедшие сеансы (оплаченные, время сеанса <= текущего)
  past: Booking[];
};
