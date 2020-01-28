import Home from "@/screen/Home";
// import Series from "@/screen/Home/Fragment/Series";
// import Movie from "@/screen/Home/Fragment/Movie";
import Download from "@/screen/Download";
import Play from "@/screen/Play";

export const routes: any[] = [
  {
    path: "/",
    component: Home,
    exact: true
  },
  {
    path: "/download",
    component: Download,
    exact: true
  },
  {
    path: "/play/:type/:id",
    component: Play
  },
  {
    path: "/ads"
  }
];
