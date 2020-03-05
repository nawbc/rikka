import cheerio from 'cheerio';
import { origin_1, origin_1_sub } from './source';
import * as urlLib from 'url';
import { get } from 'request-promise-native';
import { HaliHaliCode } from './constants';
import delay from 'delay';
import { setHeaders } from './utils';
import * as path from 'path';

interface InitScriptsContent {
  vid: string[][];
  yb_url1: string[][];
  yb_url2: string[][];
}

export interface OriginVideoApi {
  success: string;
  url: string;
  ext: string;
  play: string;
}

type VideoMakeUp = {
  vid: string;
  yb_url1: string;
  yb_url2: string;
};

export interface VideoSrcApi {
  collections: InitScriptsContent;
  initUrl: string;
  videoMakeUp: VideoMakeUp;
  type: string;
  currentVideo: OriginVideoApi;
  introduce: {};
}

const initCollectionContent = {
  vid: [],
  yb_url1: [],
  yb_url2: []
};

const initCurrentVideo = {
  vid: '',
  yb_url1: '',
  yb_url2: ''
};

export class VideoApi {
  // private origins_info: any;
  private collections: InitScriptsContent = initCollectionContent;
  private init_url = '';
  private videoMakeUp: VideoMakeUp = initCurrentVideo;
  private type: string;
  private currentVideo: OriginVideoApi = {
    success: '',
    url: '',
    ext: '',
    play: ''
  };
  private id = 0;
  private introduce = {};

  constructor(url: string, type: string) {
    this.init_url = url;
    this.type = type;
  }

  private exact_plays(data: string, key: string): string[][] {
    const reg = new RegExp(`(?<=${key}\\[\\d+\\]=")(.+)(?=")`, 'g');
    return data
      .split(';')
      .map(a => {
        const c = a.match(reg);
        if (!!c) {
          return c[0];
        }
      })
      .filter(Boolean)
      .map(b => {
        if (!!b) {
          return b.split(',');
        }
      }) as any;
  }

  private async get_init_scripts(data: string): Promise<string[]> {
    return new Promise((resolve, reject) => {
      try {
        const $ = cheerio.load(data);
        const scripts = $('script');
        const usefulArr: string[] = [];
        for (let i = 0; i < scripts.length; i++) {
          const src = scripts[i].attribs.src;
          src && src.includes('t.mtyee.com') && usefulArr.push(src);
        }
        resolve(usefulArr);
      } catch (e) {
        reject(e);
      }
    });
  }

  private async handle_init_scripts_content(scripts: string[]): Promise<InitScriptsContent> {
    const tokenTarget: InitScriptsContent = initCollectionContent;

    for (const url of scripts) {
      await delay(0);
      await get({
        url,
        headers: setHeaders({
          Referer: this.init_url
        })
      })
        .then(data => {
          if (/playarr_1/.test(data)) {
            tokenTarget.yb_url1 = this.exact_plays(data, 'playarr_1');
          }

          if (/playarr_2/.test(data)) {
            tokenTarget.yb_url2 = this.exact_plays(data, 'playarr_2');
          }

          if (/playarr/.test(data)) {
            tokenTarget.vid = this.exact_plays(data, 'playarr');
          }
        })
        .catch(err => {
          throw new Error(`Error[${HaliHaliCode.FETCH_ERROR}]` + err);
        });
    }

    // 处理集数一致;
    !Array.isArray(tokenTarget.vid) && (tokenTarget.vid = []);
    !Array.isArray(tokenTarget.yb_url1) && (tokenTarget.yb_url1 = []);
    !Array.isArray(tokenTarget.yb_url2) && (tokenTarget.yb_url2 = []);
    const max = Math.max.call(
      null,
      tokenTarget.vid.length,
      tokenTarget.yb_url1.length,
      tokenTarget.yb_url2.length
    );

    for (let i = 0; i < max; i++) {
      !!!tokenTarget.vid![i] && (tokenTarget.vid[i] = ['', '', '']);
      !!!tokenTarget.yb_url1![i] && (tokenTarget.yb_url1[i] = ['', '', '']);
      !!!tokenTarget.yb_url2![i] && (tokenTarget.yb_url2[i] = ['', '', '']);
    }
    return tokenTarget;
  }

  private async get_origin_1(): Promise<this> {
    const headers = setHeaders({
      Referer: origin_1_sub + '/1717yun/mytest.php?url=' + this.videoMakeUp.vid,
      Origin: origin_1_sub,
      Host: 'test4.diyiwl.wang'
    });
    await delay(0);
    this.currentVideo = await get({
      url: urlLib.format({
        host: origin_1,
        query: {
          time: Date.now(),
          url: this.videoMakeUp.vid
        }
      }),
      headers
    }).then(d => JSON.parse(d.trim()));
    return this;
  }

  // private compose_dpcomp(target: any): string {
  //   const { vid, yb_url1, yb_url2, id, m } = target;
  //   const yb_url = yb_url1 === "" ? "" : yb_url1 + "$$$" + yb_url2;
  //   const i = id;
  //   let dy, line, sl, pt, yb;

  //   if (this.type === "acg" || this.type === "tv") {
  //     dy = 4;
  //     pt = 0;
  //     line = 0;
  //     sl = 1;
  //     yb = 12;
  //   } else if (this.type === "mov") {
  //     dy = 1;
  //     pt = 1;
  //     line = 0;
  //     sl = 0;
  //     yb = 12;
  //   }

  //   return urlLib.format({
  //     host: dpcomp,
  //     query: {
  //       vid,
  //       m,
  //       cp: 1,
  //       dy,
  //       i,
  //       pt,
  //       line,
  //       sl,
  //       yb,
  //       yb_url,
  //       i4: 300,
  //       ipad: 0
  //     }
  //   });
  // }

  // private get_origins_links(data: string) {
  //   var cc: any = {};
  //   data
  //     .match(/(?<=';)(parseurl.+)(?=;var)/g)![0]
  //     .replace(/'|"/g, "")
  //     .split(";")
  //     .forEach((v, i) => {
  //       const c = v.split("=");
  //       const prop = c[0]!;
  //       if (!prop.includes("var ")) {
  //         if (prop === "yb_url_arr[1]") {
  //           cc.yb_url_arr_1 = c[1];
  //         } else if (prop === "yb_url_arr[2]") {
  //           cc.yb_url_arr_2 = c[1];
  //         } else {
  //           cc[prop] = c[1];
  //         }
  //       }
  //     });
  //   cc.origins = data
  //     .match(/(?<=var\s*iurl\s*=\s*new\s*Array\(")(.+)(?="\);)/g)![0]
  //     .replace(/'|"/g, "")
  //     .split(",");
  //   return cc;
  // }

  // private async get_origins(url: string): Promise<any> {
  //   const datas = await get({
  //     url,
  //     headers: {
  //       Referer: "http://halihali.in/acg",
  //       Host: urlLib.parse(url).host
  //     }
  //   }).then(data => this.get_origins_links(data));
  //   return datas;
  // }

  public async init(): Promise<this> {
    const data = await get(this.init_url, {
      headers: setHeaders({
        Host: 'halihali.li',
        Referer: path.parse(this.init_url).dir
      })
    }).catch(err => {
      throw new Error(`Error[${HaliHaliCode.FETCH_ERROR}]` + err);
    });
    const scripts = await this.get_init_scripts(data).catch(err => {
      throw new Error(`Error[${HaliHaliCode.PARSE_ERROR}]` + err);
    });
    this.collections = await this.handle_init_scripts_content(scripts);
    return this;
  }

  public async index(i: number): Promise<this> {
    const { vid, yb_url1, yb_url2 } = this.collections;

    try {
      const select = {
        vid: vid![i]![0],
        yb_url1: yb_url2![i]![0],
        yb_url2: yb_url1![i]![0],
        m: vid![i]![1]
      };

      this.videoMakeUp = select;
      this.id = i;
    } catch (err) {
      throw new Error('视频出错:' + err);
    }
    // this.videoMakeUp.url = await this.compose_dpcomp(select);
    // this.origins_info = await this.get_origins(this.videoMakeUp.url);
    return this;
  }

  // public async intro(url: string): Promise<this> {
  //   const data = await get(url, { headers });
  //   this.introduce = transformIntroduce(data);
  //   return this;
  // }

  public async origin(o = 1): Promise<any> {
    switch (o) {
      case 1:
        return this.get_origin_1();
      default:
        return { code: HaliHaliCode.ERROR, msg: '出错' };
    }
  }
}
