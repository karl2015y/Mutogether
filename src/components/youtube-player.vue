<template>
    <div v-if="currentYoutubeInfo && currentYoutubeSources">
        <!-- {{currentYoutubeInfoIsLoading}} -->
        {{ currentYoutubeInfo?.title }}
        <br>
        {{ currentYoutubeInfo?.author }}
        <br>
        <player-panel
            ref="playerPanelElement"
            @ready="handleReady"
            @prev="handlePrev"
            @next="handleNext"
            :urls="currentYoutubeSources"
        ></player-panel>
        <!-- :url="`${get(currentYoutubeInfo, 'formatStreams[0].url')}`" -->


    </div>
</template>

<script setup lang="ts">
import playerPanel from './player-panel.vue';
import createRoomBtnVue from './create-room-btn.vue';
import { computedAsync } from '@vueuse/core';
import { find, first, get, toNumber, sample } from 'lodash';
import { computed, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import { getYoutubeVideo } from '../common/invidious';
import { usePromiseRTDB, useRTDB } from '../composables';
import { useMainStore } from '../stores/main.store';
import dayjs from 'dayjs';



const route = useRoute()

interface Props {
    preplayList: PlayListItem[];
    playedList: PlayListItem[];
    actionList?: ActionListItem[];
    push: ReturnType<typeof useRTDB>['push']
}
const props = withDefaults(defineProps<Props>(), {
    // playedList: () => ([
    //     { youtubeId: 'BAo16n2QHV0', operator: { name: '小白' } }
    // ])
});


const playerPanelElement = ref<InstanceType<typeof playerPanel>>()

const store = useMainStore();
const serverList = ref<string[]>()
async function init() {
    console.log('youtube-player init');

    serverList.value = await store.serverList;
}
init()


/**
 * 現在撥放的音樂資料
 */
const currentYoutubeInfo = computedAsync(
    async () => {
        const current = first(props.preplayList)
        if (!current || !serverList.value) return;

        return getYoutubeVideo(serverList.value, current.youtubeId)
    },
    null, // initial state
)


function handleReady() {
    if (!currentYoutubeInfo.value || !playerPanelElement.value) return;
    navigator.mediaSession.metadata = new MediaMetadata({
        title: currentYoutubeInfo.value.title,
        artist: currentYoutubeInfo.value.author,
        album: '一起聽音樂',
        artwork: currentYoutubeInfo.value.videoThumbnails.filter(item => ['start', 'middle', 'end'].indexOf(item.quality) === -1).map(item => ({
            src: item.url,
            sizes: `${item.width}x${item.height}`,
            type: 'image/jpg'
        })).sort((a, b) => toNumber(a.sizes.replace('x', '')) - toNumber(b.sizes.replace('x', '')))


    });

    navigator.mediaSession.setActionHandler('nexttrack', handleNext);
    navigator.mediaSession.setActionHandler('previoustrack', handlePrev);
    navigator.mediaSession.setActionHandler('play', playerPanelElement.value.handlePlay);
    navigator.mediaSession.setActionHandler('pause', playerPanelElement.value.handlePause);
}



const currentYoutubeInfoIsLoading = computed(() => currentYoutubeInfo.value === null)

const currentYoutubeSources = computed(() => {
    if (!currentYoutubeInfo.value || !serverList.value) return;
    const result: string[] | undefined = [];
    const iTags: string[] = ['139'];
    const videoId = currentYoutubeInfo.value.videoId
    currentYoutubeInfo.value.formatStreams.forEach(stream => {
        // result.push(stream.url)
        iTags.push(stream.itag)
    });

    iTags.forEach(tag => {
        if (!serverList.value) return;
        serverList.value.forEach(serverUrl => {
            result.push(`${serverUrl}/latest_version?id=${videoId}&itag=${tag}&local=true`)
        })
    })
    iTags.forEach(tag => {
        if (!serverList.value) return;
        serverList.value.forEach(serverUrl => {
            result.push(`${serverUrl}/latest_version?id=${videoId}&itag=${tag}`)
        })
    })
    return result
    // `${sample(serverList)}
})




async function handleNext() {
    console.log('下一首');


    if (props.preplayList.length <= 1) {
        // const nextItemId = get(currentYoutubeInfo.value, 'recommendedVideos[0].videoId')
        const nextItemId = first(currentYoutubeInfo.value?.recommendedVideos.sort((a) => a.lengthSeconds - toNumber(currentYoutubeInfo.value?.lengthSeconds)))?.videoId
        if (!nextItemId) return;
        props.push({
            'timestamp': dayjs().valueOf(),
            'youtubeId': nextItemId,
            played: false,
            'operator': {
                'name': '系統推薦'
            },
        })
    }

    if (!props.preplayList || props.preplayList.length <= 0) return;
    const playedItem = first(props.preplayList)
    if (!playedItem || !playedItem._id) return;
    console.log('playedItem', playedItem);
    const playListApi = await usePromiseRTDB<PlayListItem>(`${route.path}/playList/${playedItem._id}`);
    playListApi.data.value.played = true




}
async function handlePrev() {
    console.log('上一首');

    if (!props.playedList || props.playedList.length <= 0) return;
    const playedItem = first(props.playedList)
    if (!playedItem || !playedItem._id) return;
    console.log('playedItem', playedItem);
    const playListApi = await usePromiseRTDB<PlayListItem>(`${route.path}/playList/${playedItem._id}`);
    playListApi.data.value.played = false




}


</script>

<style scoped>

</style>