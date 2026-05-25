const BASE = '/yandex-market-wishlist-alice-ai';
const PREVIEW_BASE = '/main-page-preview';

export function yandexImg(file: string): string {
  return `${BASE}/${file}.png`;
}

export function mainPreviewImg(file: string): string {
  return `${PREVIEW_BASE}/${file}.png`;
}

export const yandexCovers = {
  desktop: mainPreviewImg('ht-case-preview'),
  tablet: mainPreviewImg('vt-case-preview'),
  mobile: mainPreviewImg('m-case-preview'),
  alt: 'Вишлист Alice AI — Яндекс Маркет',
} as const;

export const yandexUserFlow = {
  desktop: yandexImg('d-ht-userflow'),
  tablet: yandexImg('vt-userflow'),
  mobile: yandexImg('m-userflow'),
} as const;

export const yandexPrototype = {
  desktop: yandexImg('d-ht-prototype-screen'),
  tablet: yandexImg('vt-prototype-screen'),
  mobile: yandexImg('m-prototype-screen'),
} as const;

/** Галерея «Результат»: booking-button, wishlist, special-product-card, stories */
export const yandexGallery = [
  {
    alt: 'Кнопка бронирования',
    desktop: yandexImg('d-ht-booking-button-4'),
    tablet: yandexImg('vt-booking-button-4'),
    mobile: yandexImg('m-booking-button-4'),
  },
  {
    alt: 'Экран вишлиста',
    desktop: yandexImg('d-ht-wishlist-display-2'),
    tablet: yandexImg('vt-wishlist-display-2'),
    mobile: yandexImg('m-wishlist-display-2'),
  },
  {
    alt: 'Специальная карточка товара',
    desktop: yandexImg('d-ht-special-product-card-1'),
    tablet: yandexImg('vt-special-product-card-1'),
    mobile: yandexImg('m-special-product-card-1'),
  },
  {
    alt: 'Stories',
    desktop: yandexImg('d-ht-stories-display-3'),
    tablet: yandexImg('vt-stories-display-3'),
    mobile: yandexImg('m-stories-display-3'),
  },
] as const;
