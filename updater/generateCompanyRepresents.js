const targets = require('./targets.json');
const url = require('url');
const { get } = require('request-promise-native');
const delay = require('delay');
const cheerio = require('cheerio');
const fs = require('fs');

const mainURL = 'http://www.halihali.li';
const searchURL = 'http://v.mtyee.com/ssszz.php';
const writeTargets = './src/renderer/assets/company/company-works.json';
const headers = {
  'User-Agent':
    'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.97 Safari/537.36',
  Connection: 'keep-alive',
  'Accept-Language': 'zh-CN, zh; q = 0.9'
};

const createSearchApiUri = async function(q = '') {
  return url.format({
    host: searchURL,
    query: {
      q,
      top: 10,
      dect: ''
    }
  });
};

const transformIntroduce = function(data) {
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
      name: nameText.replace(stats + '加载中...', '').trim(),
      stats,
      area: baseInfo[0],
      year: baseInfo[1],
      cover,
      kinds,
      introduce
    };
  } catch {
    console.error('Error', 'html解析错误');
  }
};

const createSearch = async function(keyword) {
  const uri = await createSearchApiUri(keyword);
  const data = await get({
    uri,
    json: true,
    headers
  }).catch(err => {
    console.log('Error: ' + err);
  });
  return JSON.parse(data.trim());
};

const handleResult = async function(arr, result) {
  for await (const val of arr) {
    const url = mainURL + val.url;
    console.log(url);
    const data = await get(url).catch(err => {
      console.error('请求详情错误', err);
    });
    const intro = transformIntroduce(data);
    intro.url = val.url;
    !!intro && result.push(intro);
    await delay(2000);
  }
};

(async function() {
  const resultJson = {};
  for (const prop in targets) {
    const willSearch = targets[prop].search;
    resultJson[prop] = { name: targets[prop].name, result: {} };

    Object.assign(resultJson[prop], targets[prop]);

    for await (const an of willSearch) {
      const currentResult = await createSearch(an).catch(err => {
        console.log('搜索出错', err);
      });
      resultJson[prop].result[an] = [];
      await handleResult(currentResult, resultJson[prop].result[an]);
      await delay(7000);
    }
  }
  fs.writeFile(writeTargets, JSON.stringify(resultJson), err => {
    console.log(err);
  });
})();
