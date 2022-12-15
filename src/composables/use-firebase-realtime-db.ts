import { ref } from "vue"
import { onValue, ref as firebaseDBRef, set, push as firebaseDBPush, update } from "firebase/database"
import { db } from "../common/firebase";
import { watchDebounced, WatchDebouncedOptions } from '@vueuse/core';
import { isArray, isObject } from 'lodash'
import { customAlphabet } from 'nanoid'

/**
 * 與 Firebase Realtime Database 雙向綁定
 * @param path DB 位置
 * @param debounceOptions 寫入資料時debounce的設定參數
 * @returns vue ref 的變數 | null 找不到資料庫 | undfined loading 中
 */
export function useRTDB<T = any>(path: string, debounceOptions?: WatchDebouncedOptions<boolean>) {

  const nanoid = customAlphabet('123456789ABCFGHJKMNPQRSUVWXYZ', 5)

  const data = ref<T | null>();

  if (!debounceOptions) debounceOptions = { debounce: 3000, maxWait: 1000, deep: true }
  const dbRef = firebaseDBRef(db, path);

  /**讀取資料庫 */
  onValue(dbRef, (snapshot) => {
    data.value = snapshot.val();
  });
  /**寫入資料庫 */
  watchDebounced(data, () => {
    set(dbRef, data.value)
  }, debounceOptions);



  function push<TItem = T>(item: TItem, isEasykey: boolean = true) {
    return new Promise<{ path: string, key: string }>(async (resolve, reject) => {
      try {
        if (!(isArray(data.value) || isObject(data.value) || data.value === null) || !item) return;

        const newKey = isEasykey ? nanoid() : firebaseDBPush(dbRef).key;
        if(!newKey)return;
        const updates: { [key: string]: TItem } = {};
        updates[`/${path}/${newKey}`] = item;
        await update(firebaseDBRef(db), updates);
        resolve({
          path: `${path}/${newKey}`,
          key: newKey
        })
      } catch (error) {
        reject(error)
      }


    })

  }


  return { data, push }

}