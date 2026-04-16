interface PageSeoOptions {
  title: string;
  description: string;
  path?: string;
  image?: string;
  noindex?: boolean;
}

const APP_NAME = "Cinema Booking";

const normalizeUrl = (value: string): string => value.replace(/\/+$/, "");

export const usePageSeo = (options: MaybeRefOrGetter<PageSeoOptions>): void => {
  const route = useRoute();
  const requestUrl = useRequestURL();
  const runtimeConfig = useRuntimeConfig();

  const seo = computed(() => toValue(options));
  const siteUrl = computed(() =>
    normalizeUrl(runtimeConfig.public.siteUrl || requestUrl.origin),
  );
  const canonicalPath = computed(() => seo.value.path || route.path);
  const canonicalUrl = computed(() => {
    return new URL(canonicalPath.value, `${siteUrl.value}/`).toString();
  });
  const previewImage = computed(() => {
    if (!seo.value.image) return undefined;

    return new URL(seo.value.image, `${siteUrl.value}/`).toString();
  });

  useSeoMeta({
    title: () => seo.value.title,
    description: () => seo.value.description,
    ogTitle: () => seo.value.title,
    ogDescription: () => seo.value.description,
    ogSiteName: APP_NAME,
    ogLocale: "ru_RU",
    ogType: "website",
    twitterCard: "summary_large_image",
    twitterTitle: () => seo.value.title,
    twitterDescription: () => seo.value.description,
    robots: () =>
      seo.value.noindex
        ? "noindex, nofollow"
        : "index, follow, max-image-preview:large",
    ogUrl: () => canonicalUrl.value,
    ogImage: () => previewImage.value,
    twitterImage: () => previewImage.value,
  });

  useHead(() => ({
    link: [
      {
        rel: "canonical",
        href: canonicalUrl.value,
      },
    ],
  }));
};
