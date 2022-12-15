<template>
    <div>
        {{ room }}
        <youtube-player
            v-model:play-list="playList"
            v-model:played-list="playedList"
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
import { ref } from 'vue';
const route = useRoute()
const { data: room } = useRTDB(route.path);

const playList = ref([
    { youtubeId: 'ksubB4JHu4Q', operator: { name: '小白' } }
])
const playedList = ref([
{ youtubeId: 'BAo16n2QHV0', operator: { name: '小白2' } }
])
</script>

<style scoped>

</style>