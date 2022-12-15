<template>
  <div class="p-3">
    <create-room-btn></create-room-btn>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import createRoomBtn from '../components/create-room-btn.vue'

interface Props {
  label?: string;
}
const props = withDefaults(defineProps<Props>(), {
  label: '',
});

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void;
}>();
</script>

<style scoped lang="sass">
</style>
