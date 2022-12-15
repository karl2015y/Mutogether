<template>
    <div>
        <video ref="video"></video>
        <template v-if="mediaControls && isNumber(playProcess) && playProcess >= 0">
            <span>{{ playProcess }}</span>
            <br>
            {{ canAutoPlay }}

            <!-- <q-btn @click="mediaControls.currentTime = mediaControls.duration - 20">快轉</q-btn> -->
            <q-btn>上一首</q-btn>
            <q-btn
                v-if="mediaControls.playing"
                @click="handlePause"
            >暫停</q-btn>
            <q-btn
                v-else
                @click="handlePlay"
            >撥放</q-btn>
            <q-btn @click="emit('next')">下一首</q-btn>
        </template>

    </div>
</template>

<script setup lang="ts">
import { useMediaControls, watchOnce } from '@vueuse/core';
import { isNumber, toNumber } from 'lodash';

import { computed, onMounted, ref, watch } from 'vue';

interface Props {
    url: string;
    isPlaying?: boolean;
}
const props = withDefaults(defineProps<Props>(), {
});

const emit = defineEmits<{
    (e: 'prev'): void;
    (e: 'next'): void;
    (e: 'update:isPlaying', value: Props['isPlaying']): void;

}>();

const _isPlaying = computed({
    get: () => props.isPlaying,
    set: (val) => emit('update:isPlaying', val)
})


const video = ref()
const mediaControls = ref<ReturnType<typeof useMediaControls>>()

watch(() => props.url, () => {
    mediaControls.value = useMediaControls(video, {
        src: props.url,
    })
    console.log(mediaControls);
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
    console.log(playProcess.value, isNumber(playProcess.value) && playProcess.value >= 100);
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



</script>

<style scoped>

</style>