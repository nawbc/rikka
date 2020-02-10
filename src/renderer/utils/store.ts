/* eslint-disable @typescript-eslint/no-namespace */
import Store from 'electron-store';
import { resolve } from 'path';
import { homedir } from 'os';

const schema: any = {
  setting: {
    type: 'object',
    properties: {
      themeMode: {
        type: 'string',
        default: 'light'
      },
      dayNightMode: {
        type: 'boolean',
        default: true
      },
      splash: {
        type: 'boolean',
        default: true
      },
      // 同时下载数量
      parallelCount: {
        type: 'number',
        default: 2
      },
      threadCount: {
        type: 'number',
        default: 4
      },
      downloadPosition: {
        type: 'string',
        default: resolve(homedir(), 'Videos/download')
      },
      screenshotPosition: {
        type: 'string',
        default: resolve(homedir(), 'Pictures/screenshot')
      },
      collectionsReverse: {
        type: 'boolean',
        default: true
      },
      collectionsIsReverse: {
        type: 'boolean',
        default: true
      },
      collectionsStyle: {
        type: 'string',
        default: 'bar'
      }
    }
  },
  user: {
    type: 'object',
    properties: {
      history: {
        type: 'array',
        default: []
      },
      like: {
        type: 'array',
        default: []
      },
      normalKind: {
        type: 'object',
        default: { year: 0, area: 'all', kind: 0 }
      }
    }
  }
};

export const localStore = new Store({ schema });

export const initStore = () => {
  for (const prop in schema) {
    !!!localStore.get(prop) && localStore.set(prop, {});
  }
};
