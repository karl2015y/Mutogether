<template>
    <div>
        <video ref="video"></video>
        <!-- <audio ref="video"></audio> -->

        <span>{{ playProcess }}</span>
        <br>
        {{ canAutoPlay }}

        <!-- <q-btn @click="mediaControls.currentTime = mediaControls.duration - 20">快轉</q-btn> -->
        <q-btn @click="emit('prev')">上一首</q-btn>
        <template v-if="mediaControls && isNumber(playProcess) && playProcess >= 0"> <q-btn
                v-if="mediaControls.playing"
                @click="handlePause"
            >暫停</q-btn>
            <q-btn
                v-else
                @click="handlePlay"
            >撥放</q-btn>


        </template>

        <q-btn @click="emit('next')">下一首</q-btn>

    </div>
</template>

<script setup lang="ts">
import { useMediaControls, UseMediaSource, watchOnce } from '@vueuse/core';
import { isNumber, toNumber } from 'lodash';

import { computed, onMounted, ref, watch } from 'vue';

interface Props {
    urls: string[];
    isPlaying?: boolean;
}
const props = withDefaults(defineProps<Props>(), {
});

const emit = defineEmits<{
    (e: 'prev'): void;
    (e: 'next'): void;
    (e: 'ready'): void;

}>();



const video = ref()
const mediaControls = ref<ReturnType<typeof useMediaControls>>()

watch(() => props.urls, () => {
    console.log('props.urls',);
    if (!props.urls) return;
    mediaControls.value = useMediaControls(video, {
        src: props.urls.map(url => ({ src: url })),
    })
}, {
    'immediate': true
})

const canAutoPlay = ref(false)
watchOnce(() => mediaControls.value?.playing, () => {
    canAutoPlay.value = true
})


function handlePlay() {
    if (!mediaControls.value) return;
    (mediaControls.value.playing as unknown as boolean) = true;
}

function handlePause() {
    if (!mediaControls.value) return;
    (mediaControls.value.playing as unknown as boolean) = false;
}

const playProcess = computed(() => toNumber(mediaControls.value?.currentTime) / toNumber(mediaControls.value?.duration) * 100)
watch(playProcess, () => {
    if (isNumber(playProcess.value)) {
        if (playProcess.value >= 100) emit('next');
        if (playProcess.value == 0 && canAutoPlay.value) handlePlay();
    }
})
// Change initial media properties
// onMounted(() => {
//     volume.value = 0.5
//     currentTime.value = 60
// })


watch([mediaControls, playProcess], () => {
    if (mediaControls.value && isNumber(playProcess.value) && playProcess.value >= 0) {
        emit('ready')
    }
})


defineExpose({
    handlePause,
    handlePlay
})



</script>

<style scoped>

</style>