import { yandexCovers } from './yandex-images';
import { collegeCovers } from './college-images';
import { withBase } from './paths';

export const cases = [
  {
    title: 'Редизайн экрана деталей авиа-билета',
    type: 'Концепт · Яндекс Авиа',
    href: '/yandex-avia',
    cover: {
      desktop: withBase('/yandex-avia/cover.svg'),
      tablet: withBase('/yandex-avia/cover.svg'),
      mobile: withBase('/yandex-avia/cover.svg'),
      alt: 'Редизайн карточки авиабилета',
    },
  },
  {
    title: 'Витрина бренда в Яндекс Лавке',
    type: 'Концепт · Яндекс Лавка',
    href: '/yandex-lavka',
    cover: {
      desktop: withBase('/yandex-lavka/cover.svg'),
      tablet: withBase('/yandex-lavka/cover.svg'),
      mobile: withBase('/yandex-lavka/cover.svg'),
      alt: 'Витрина бренда в Яндекс Лавке',
    },
  },
  {
    title: 'Сделал редизайн рекламного лендинга Онлайн-колледжа',
    type: 'ИнтернетУрок',
    href: '/made-redesign-landing-of-online-college',
    cover: collegeCovers,
  },
  {
    title: 'Яндекс Маркет | Вишлист Alice AI',
    type: 'Концепт',
    href: '/yandex-market-wishlist-alice-ai',
    cover: yandexCovers,
  },
  {
    title: 'Листок — личная канбан-доска',
    type: 'Мини-кейс · Личный проект',
    href: '/listok',
    coverStyle: 'listok',
  },
  {
    title: 'Workflow CRM - приложение для поиска вакансий',
    type: 'Концепт',
    href: '#',
    comingSoon: true,
    cover: {
      desktop: withBase('/img/placeholder.svg'),
      tablet: withBase('/img/placeholder.svg'),
      mobile: withBase('/img/placeholder.svg'),
      alt: 'Workflow CRM - приложение для поиска вакансий',
    },
  },
];
