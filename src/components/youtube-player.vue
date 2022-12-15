<template>
    <div>
        <!-- {{currentYoutubeInfoIsLoading}} -->
        {{ currentYoutubeInfo?.title }}
        <br>
        {{ currentYoutubeInfo?.author }}
        <br>
        <player-panel
            @next="handleNext"
            :url="get(currentYoutubeInfo, 'adaptiveFormats[0].url', '')"
        ></player-panel>

    </div>
</template>

<script setup lang="ts">import { computedAsync } from '@vueuse/core';
import { first, get } from 'lodash';
import { computed } from 'vue';
import { getYoutubeVideo } from '../common/invidious';
import { useMainStore } from '../stores/main.store';
import playerPanel from './player-panel.vue'


interface Operator {
    name: string;
}
interface PlayListItem {
    youtubeId: string;
    operator: Operator;
}
interface ActionListItem {
    method: "暫停" | "撥放" | "切歌" | "大聲" | "小聲" | '發言';
    note?: string;
    operator: Operator;
    timestamp: number
}

interface Props {
    playList: PlayListItem[];
    playedList: PlayListItem[];
    actionList?: ActionListItem[];
}
const props = withDefaults(defineProps<Props>(), {
    // playedList: () => ([
    //     { youtubeId: 'BAo16n2QHV0', operator: { name: '小白' } }
    // ])
});

const emit = defineEmits<{
    (e: 'update:playList', value: Props['playList']): void;
    (e: 'update:playedList', value: Props['playedList']): void;
}>();

const playList = computed({
    get: () => props.playList,
    set: (val) => emit('update:playList', val)
})
const playedList = computed({
    get: () => props.playedList,
    set: (val) => emit('update:playedList', val)
})




const store = useMainStore();



/**
 * 現在撥放的音樂資料
 */
const currentYoutubeInfo = computedAsync(
    async () => {
        const current = first(playList.value)
        if (!current) return;
        const serverList = await store.serverList;
        return getYoutubeVideo(serverList, current.youtubeId)
    },
    null, // initial state
)
const currentYoutubeInfoIsLoading = computed(() => currentYoutubeInfo.value === null)

function handleNext() {
    console.log('下一首');

    if (!playList.value || playList.value.length <= 0) return;
    const playedItem = playList.value.shift()
    if (!playedItem) return;
    playedList.value.push(playedItem)


    if (playList.value.length <= 0) {
        const nextItemId = get(currentYoutubeInfo.value, 'recommendedVideos[0].videoId')
        if (!nextItemId) return;
        playList.value.push({
            'youtubeId': nextItemId,
            'operator': {
                'name': '系統推薦'
            }
        })
    }

}


</script>

<style scoped>

</style>