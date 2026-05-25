import { withBase } from './paths';

/** Paths to SVG assets in /public/icons */
export const icons = {
  pin: withBase('/icons/Pin icon.svg'),
  arrow1: withBase('/icons/Arrow 1 Icon.svg'),
  arrowLeft: withBase('/icons/Left Arrow Icon.svg'),
  arrowRight: withBase('/icons/Arrow 2 (Right) Icon.svg'),
  burger: withBase('/icons/Burger  Menu Icon.svg'),
  textFalse: withBase('/icons/Text False Icon.svg'),
  textTrue: withBase('/icons/Text True Icon.svg'),
} as const;
