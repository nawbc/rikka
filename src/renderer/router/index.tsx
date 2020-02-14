import Home from '@/screen/Home';
// import Series from "@/screen/Home/Fragment/Series";
// import Movie from "@/screen/Home/Fragment/Movie";
import Download from '@/screen/Download';
import Setting from '@/screen/Setting';
// import SearchResult from '@/screen/SearchResult';
import Play from '@/screen/Play';
import { About } from '@/screen/About';
import Test from '@/screen/Test';

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
    component: Play
  },
  // {
  //   path: '/result',
  //   component: SearchResult
  // },
  {
    path: '/about',
    component: About
  },
  {
    path: '/setting',
    component: Setting,
    exact: true,
    cache: true
  },
  {
    path: '/test',
    component: Test
  }
];
