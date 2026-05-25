const PREVIEW_BASE = '/main-page-preview';

export function mainPreviewImg(file: string): string {
  return `${PREVIEW_BASE}/${file}.png`;
}

export const lumaCovers = {
  desktop: mainPreviewImg('d-ht-luma-thinq-preview'),
  tablet: mainPreviewImg('vt-luma-thinq-preview'),
  mobile: mainPreviewImg('m-luma-thinq-preview'),
  alt: 'LUMA ThinQ — приложения для умного дома',
} as const;
