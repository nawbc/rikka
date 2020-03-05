import Home from '@/screen/Home';
import Download from '@/screen/Download';
import Setting from '@/screen/Setting';
import Play from '@/screen/Play';
import About from '@/screen/About';
import CompanyResult from '@/screen/CompanyResult';
import Ads from '@/screen/Ads';

export const routes: any[] = [
  {
    path: '/',
    component: Home,
    exact: true,
    isCache: true
  },
  {
    path: '/download',
    component: Download,
    exact: true
  },
  {
    path: '/play/:type/:id/:name',
    component: Play,
    exact: true
  },
  {
    path: '/companyresult/:name',
    component: CompanyResult,
    exact: true
  },
  {
    path: '/about',
    component: About
  },
  {
    path: '/setting',
    component: Setting,
    exact: true
  },
  {
    path: '/ads',
    component: Ads
  }
];
