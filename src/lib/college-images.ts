const BASE = '/made-redesign-landing-online-college';
const PREVIEW_BASE = '/main-page-preview';

export function collegeImg(file: string): string {
  return `${BASE}/${file}.png`;
}

export function collegeVideo(file: string): string {
  return `${BASE}/${file}.mp4`;
}

export function mainPreviewImg(file: string): string {
  return `${PREVIEW_BASE}/${file}.png`;
}

export function collegeGalleryAl2(index: 1 | 2 | 3 | 4): {
  desktop: string;
  tablet: string;
  mobile: string;
} {
  const n = index;
  return {
    desktop: collegeImg(`d-ht-online-college-callery-al2-${n}`),
    tablet: collegeImg(`vt-online-college-callery-al2-${n}`),
    mobile: collegeImg(`m-online-college-callery-al2-${n}`),
  };
}

export const collegeKonkurenti = {
  desktop: collegeImg('vt-konkurenti'),
  tablet: collegeImg('vt-konkurenti'),
  mobile: collegeImg('m-konkurenti'),
} as const;

export const collegeCovers = {
  desktop: mainPreviewImg('d-ht-online-college-callery-preview'),
  tablet: mainPreviewImg('vt-online-college-callery-preview'),
  mobile: mainPreviewImg('m-online-college-callery-preview'),
  alt: 'Редизайн лендинга Онлайн-колледжа',
} as const;

export const collegeScrollVideos = {
  desktop: collegeVideo('online-college-scroll-880'),
  tablet: collegeVideo('online-college-scroll-740'),
  mobile: collegeVideo('online-college-scroll-442'),
} as const;
