import * as urlLib from 'url';
import cheerio from 'cheerio';
import { halihaliUrl } from './source';
import { VideoListData, UpdateCollections } from './halihali.interface';
import { HaliHaliCode } from './constants';

export const transformListData = function(data: string): VideoListData[] {
  const usefulData: VideoListData[] = [];
  const $ = cheerio.load(data);
  const li = $('li');

  for (let i = 0; i < li.length; i++) {
    usefulData.push({
      title: $(li[i])
        .find('.name')
        .text(),
      url: $(li[i])
        .find('a')
        .attr('href')!,
      thumbUrl: $(li[i])
        .find('img')
        .attr('src')!,
      episode: $(li[i])
        .find('.bz')
        .text()
    });
  }
  return usefulData;
};

export const setHeaders = function(headers: object) {
  const baseHeaders = {
    'User-Agent':
      'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.97 Safari/537.36',
    Connection: 'keep-alive',
    'Accept-Language': 'zh-CN, zh; q = 0.9'
  };
  return Object.assign({}, baseHeaders, headers);
};

export const transformIntroduce = function(data: string) {
  const kinds = [];
  try {
    const $ = cheerio.load(data);
    const root = $('.info');
    const base = root.find('dd');
    const kindInfo = base.eq(2).find('a');
    const baseInfo = base
      .eq(1)
      .text()
      .split(/\s+/)
      .map(val => val.split('：')[1]);
    const nameNode = root.find('.name');
    const nameText = nameNode.text();
    const stats = nameNode
      .find('span')
      .eq(0)
      .text();
    const introduce = root
      .find('.des2')
      .text()
      .replace('剧情：', '')
      .trim();
    const cover = $('.pic')
      .find('img')
      .attr('src');

    for (let i = 0; i < kindInfo.length; i++) {
      kinds.push($(kindInfo[i]).text());
    }

    return {
      name: nameText.replace(stats, '').trim(),
      stats,
      area: baseInfo[0],
      year: baseInfo[1],
      cover,
      kinds,
      introduce
    };
  } catch {
    return {
      code: HaliHaliCode.PARSE_ERROR,
      msg: 'html解析错误'
    };
  }
};

export const transformUpdateCollections = function(data: string): UpdateCollections {
  const $ = cheerio.load(data);
  const updateTable = [];
  const panels = $('.am-tab-panel');

  for (let i = 0; i < panels.length; i++) {
    const panel = $(panels[i]);
    const a = panel.find('a');
    const sub = panel.find('.am-list-date');
    const eachDay = [];
    for (let j = 0; j < a.length; j++) {
      const url = new URL($(a[j]).attr('href')!, halihaliUrl);
      const title = $(a[j]).attr('title')!;
      const update = $(sub[j]).text();
      eachDay.push({ url, title, update });
    }
    updateTable.push(eachDay);
  }
  return updateTable;
};
