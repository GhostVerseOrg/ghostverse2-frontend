import { RouteNamesEnum } from '@/app/_constants/routes';
import { RouteType } from '@/app/_types';

interface RouteWithTitleType extends RouteType {
  title: string;
}

export const routes: RouteWithTitleType[] = [
  {
    path: RouteNamesEnum.home,
    title: 'Home',
    component: null,
  },
  {
    path: RouteNamesEnum.examples,
    title: 'Examples',
    component: null,
  },
  {
    path: RouteNamesEnum.dashboard,
    title: 'Dashboard',
    component: null,
  },
  {
    path: RouteNamesEnum.disclaimer,
    title: 'Disclaimer',
    component: null,
  },
];
