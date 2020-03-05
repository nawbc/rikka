import cheerio from 'cheerio';
import { get } from 'request-promise-native';

interface NewsArgProps {
  page: number;
}

interface NewsData {
  totalPages: number;
}

const jsonp_callback = 'jQuery18307517860913062016_1583212830888';

const headers = {
  'User-Agent':
    'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.97 Safari/537.36',
  Connection: 'keep-alive',
  'Accept-Language': 'zh-CN, zh; q = 0.9',
  Referer: 'https://acg.gamersky.com/news/',
  Host: 'db2.gamersky.com',
  'Sec-Fetch-Mode': 'no-cors',
  'Sec-Fetch-Dest': 'script',
  'Sec-Fetch-Site': 'same-site'
};

const news_url = ({ page }: NewsArgProps) =>
  `https://db2.gamersky.com/LabelJsonpAjax.aspx?callback=${jsonp_callback}&jsondata=%7B%22type%22%3A%22updatenodelabel%22%2C%22isCache%22%3Atrue%2C%22cacheTime%22%3A60%2C%22nodeId%22%3A%2220386%22%2C%22isNodeId%22%3A%22true%22%2C%22page%22%3A${page}%7D&_=1583212861636`;

const transform_data = async function(data: string) {
  const pre_data = data.replace(/jQuery(\d+_\d+)\(|\);|\\r|\\n|\\t|\\/g, '');

  const totalPages = pre_data.match(/(?<="totalPages":)(.+)(?=,)/g)?.join('');
  const body = pre_data.match(/(?<="body":")(.+)(?="})/g)?.join('') ?? '';
  const $ = cheerio.load(body);
  const li = $('li');
  const news = [];

  for (let i = 0; i < li.length; i++) {
    const node = $(li[i]);
    const time = node.find('.time').text();
    const imgUrl = node.find('img').attr('src');
    const intro = node.find('.txt').text();
    const titleNode = node.find('.tit').find('a');
    const href = titleNode.attr('href');
    const title = titleNode.text();
    news.push({ title, href, intro, imgUrl, time });
  }
  return { totalPages, news };
};

// const headers =

export const createNews = async function(args: NewsArgProps): Promise<any> {
  const url = news_url(args);
  return get(url, {
    transform: transform_data,
    headers
  }).catch(() => {
    console.log(111);
  });
};
