<template>
  <!-- <div class="flex flex-col gap-4 p-4">


    <q-btn
      icon="home"
      class="w-40"
      no-caps
    >
      {{ t('hello') }} {{ store.data }}
    </q-btn>

    <div class="text-xl">
      x : {{ x }}、y : {{ y }}
    </div>

    <q-date v-model="date" />
  </div> -->
  <!-- <div class="flex">
      <q-select
        v-model="lang"
        :options="langOptions"
        label="目前語系"
        filled
        emit-value
        map-options
        style="min-width: 150px"
      />
    </div> -->
  <router-view />
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import quasarLangs from 'quasar/lang/index.json';
import { LangCode } from './locales/i18n';

import { useMeta } from 'quasar';
import { useMainStore } from './stores/main.store';


// const todo = useRTDB<number>('todo')
const store = useMainStore();

const lang = ref(store.lang);
watch(lang, (value) => store.setLang(value));

const langs = quasarLangs.filter((lang) =>
  (Object.values(LangCode) as string[]).includes(lang.isoName)
);
const langOptions = langs.map((lang) => ({
  label: lang.nativeName, value: lang.isoName
}));


useMeta(() => ({
  title: `Vue Quasar TypeScript Template Web`,
  titleTemplate: (title) => `${title} v${import.meta.env.PACKAGE_VERSION}`,
  htmlAttr: {
    lang: lang.value
  }
}));
</script>

<style lang="sass">
html, body, #app
  width: 100%
  height: 100%
  padding: 0
  margin: 0

#app
  display: flex
  flex-direction: column
</style>
