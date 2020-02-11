/* eslint-disable prefer-const */
import { RequestHaliHali } from './halihali.interface';
import { sortDataURL, searchURL } from './source';
import * as url from 'url';

export const createSearchApiUri = async function(q = ''): Promise<string> {
  return url.format({
    host: searchURL,
    query: {
      q,
      top: 10,
      dect: ''
    }
  });
};

export const createApiUri = async function(args: RequestHaliHali): Promise<string> {
  let { action, year, dect, kind, id, area, page } = args!;
  year = year || 0;
  area = area || 'all';
  kind = kind || 0;
  dect = dect || '';
  id = id || '';
  page = page || 1;

  return url.format({
    host: sortDataURL,
    query: {
      action,
      year,
      dect,
      class: kind,
      id,
      area,
      page
    }
  });
};
