<template>
  <div>
<q-btn @click="handleCreateRoom" :label="t('建立房間')"/>
  {{rooms.data.value}}
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useLang, useRTDB} from '../composables';
import to from 'await-to-js';
import { useRouter } from 'vue-router';
const router = useRouter()
const { t } = useLang();

const rooms = useRTDB('rooms');

// interface Props {
// }
// const props = withDefaults(defineProps<Props>(), {
// });

// const emit = defineEmits<{
//   (e: 'update:modelValue', value: string): void;
// }>();

async function handleCreateRoom(){
 const [newRoomError, newRoom] = await to(rooms.push({"id":234123}));
 if(newRoomError) throw new Error('建立房間錯誤');
 console.log(newRoom);
 router.push(newRoom.path)
 
}
</script>

<style scoped lang="sass">
</style>
