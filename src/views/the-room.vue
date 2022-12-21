<template>
    <div>
        {{ room }}
        <youtube-player
            v-if="!!preplayList && !!playedList"
            :preplay-list="preplayList"
            :played-list="playedList"
            :push="playListApi.push"
        ></youtube-player>
        <!-- 撥放器 -->
        <!-- 搜尋器 -->
        <!-- DB 控制撥放器 (暫停 撥放 切歌 大聲 小聲 插隊撥放歌曲 排隊撥放歌曲 )-->
    </div>
</template>

<script setup lang="ts">
import youtubePlayer from '../components/youtube-player.vue'
import { useRoute } from 'vue-router';
import { useRTDB } from '../composables';
import { computed, onMounted, ref } from 'vue';
import dayjs from 'dayjs';
import { last, take } from 'lodash';


const route = useRoute()
const { data: room } = useRTDB(route.path);
const playListApi = useRTDB(`${route.path}/playList`);
const playList = computed(() => {
    if (!playListApi.data.value) return;
    return Object.entries<PlayListItem>(playListApi.data.value).map(item => ({ ...item[1], ...{ '_id': item[0] } })).sort((a, b) => a.timestamp - b.timestamp)
});
const preplayList = computed(() => {
    if (playList.value) return playList.value.filter(item => !item.played)
})
const playedList = computed(() => {
    if (!playList.value) return;
    const lastItem = last(playList.value.filter(item => item.played));
    if (lastItem) return [lastItem]
    return []

})
</script>

<style scoped>

</style>