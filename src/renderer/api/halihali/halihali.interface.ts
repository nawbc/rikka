/**
 * @example  http://gda.mtyee.com/getsortdata_all_z.php?action=acg&page=1&year=2019&area=all&class=0&dect=&id=y2019
 */

export interface RequestHaliHali {
  action?: string; // acg 动漫　tv电视剧
  page?: number; // 页数
  year?: number; // 年代
  area?: string; // 地区
  kind?: number | string; // 类型 对应class
  dect?: any; // 貌似没多大用
  id?: any; // 年分
}

export interface VideoListData {
  title?: string;
  url?: string;
  thumbUrl?: string;
  episode?: string;
}

export type UpdateCollections = { url: URL; title: string; update: string }[][];
