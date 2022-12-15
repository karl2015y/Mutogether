import { defineStore } from 'pinia';

import { Quasar } from 'quasar';
import { getServer } from '../common/invidious';
import i18n, { LangCode } from '../locales/i18n';

const langList = import.meta.glob('../../node_modules/quasar/lang/*.mjs');

interface State {
  data: string;
  lang: `${LangCode}`;
}

export const useMainStore = defineStore('main', {
  state: () => {
    const lang = i18n.global.locale as `${LangCode}`;
    const serverList = [] as string[];
    return {
      data: 'codfish',
      lang: lang ?? 'zh-TW',

    }
  },
  getters: {
    serverList: async () => await getServer()
  },
  actions: {
    async setLang(lang: `${LangCode}`) {
      this.lang = lang;

      try {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const data: any = await langList[`../../node_modules/quasar/lang/${lang}.mjs`]()
        Quasar.lang.set(data.default);
      } catch (error) {
        console.error(`${lang} Quasar 語系載入失敗 : `, error);
        return Promise.reject(error);
      }
    },
  }
})