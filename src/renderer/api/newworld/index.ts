// action=acg&page=1&year=0&area=all&class=0&dect=&id=
import log from 'electron-log';
// import {} from './newworld.interface';
// import { createApiUri, createSearchApiUri } from './createApiUri';
import { setHeaders } from './utils';
import { get } from 'request-promise-native';
import { newWorldUrl } from './source';

/**=================================================================================================
 *			LASTMODIFY --- 2019-12-17T12:39:14.388Z
 *      const data = await v.then(d => d.index(5)).then(e => e.origin(1))
 * =================================================================================================*/

export const headers = setHeaders({});

// export const createNewWorldComic = async function (args: any) {

// };

// export const createComic = async function(args?: RequestHaliHali): Promise<VideoListData[]> {
//   const url = await createApiUri({ ...args, action: 'acg' });
//   const movieTarget = await get({
//     url,
//     transform: transformListData,
//     headers
//   }).catch(err => {
//     log.error(err);
//   });
//   return movieTarget;
// };

// export const createMovie = async function(args?: RequestHaliHali): Promise<VideoListData> {
//   const url = await createApiUri({ ...args, action: 'mov' });
//   const movieTarget = await get({
//     url,
//     transform: transformListData,
//     headers
//   }).catch(err => {
//     log.error(err);
//   });
//   return movieTarget;
// };

// export const createSeries = async function(args?: RequestHaliHali): Promise<VideoListData> {
//   const url = await createApiUri({ ...args, action: 'tv' });
//   const seriesTarget = await get({
//     url,
//     transform: transformListData,
//     headers
//   }).catch(err => {
//     log.error(err);
//   });
//   return seriesTarget;
// };

// export const createSearch = async function(keyword: string): Promise<SearchListData[]> {
//   const uri = await createSearchApiUri(keyword);
//   const data: string = await get({
//     uri,
//     json: true,
//     headers
//   }).catch(err => {
//     log.error(err);
//   });
//   return JSON.parse(data.trim());
// };

// export const createIntroduce = async function(url: string) {
//   const data = await get(url, { headers }).catch(err => {
//     log.error('[GET get introduce list error]:  ', err);
//   });
//   return transformIntroduce(data);
// };

// export const createNewWorldUpdateList = async function(): Promise<UpdateCollections> {
//   const data = await get(halihaliUrl, { headers }).catch(err => {
//     log.error('[GET update collections list  error]:  ', err);
//   });
//   return transformUpdateCollections(data);
// };

// export * from './enum';

export * from './source';

// export * from './videoApi';
