import { createApp } from 'vue';
import router from './router/router';
import { createPinia } from 'pinia';
import i18n from './locales/i18n';

import { Quasar } from 'quasar';
import quasarLang from 'quasar/lang/zh-TW';

// Import icon libraries
import '@quasar/extras/roboto-font/roboto-font.css';
import '@quasar/extras/material-icons/material-icons.css';

// Import Quasar css
import 'quasar/src/css/index.sass';
import App from './App.vue';

import './index.css';

// 自訂樣式
import './style/animate.sass';
import './style/global.sass';


// dayjs
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn' // import locale
dayjs.locale('zh-cn') // use locale

createApp(App)
  .use(Quasar, {
    plugins: {},
    lang: quasarLang,
  })
  .use(createPinia())
  .use(router)
  .use(i18n)
  .mount('#app')

