/**
 * 延遲
 * @param ms 毫秒
 * @returns 
 */
export function delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}



/**
 * (預設)最多嘗試五次 每次停頓500毫秒
 * @param promiseFunc 非同步的function
 * @param times 最多嘗試的次數
 * @param delayTime 每次嘗試之間等待的時間
 * @returns 最多嘗試5次 每次停頓500毫秒(預設)的非同步函數
 */
export function tryPromise<T>(promiseFunc: Promise<T>, times: number = 10, delayTime: number = 500) {
    return new Promise<T>(async (resolve, reject) => {
        for (let index = 0; index < times; index++) {
            promiseFunc.then(resolve).catch((error) => {
                console.log('tryPromise', index + 1, error);
            })
            await delay(delayTime);
        }
        reject('')
    })
}



/**
 * 從傳進來的陣列中隨機拿取一個值
 * @param array 
 * @returns 
 */
export function getRandItemFromArray<T>(array: Array<T>) {
    var rand = Math.random() * array.length | 0;
    var rValue = array[rand];
    return rValue;
}

/**
 * GET 讀取JSON格式
 * @param src JSON格式的位置
 * @param timeout timeout毫秒後若伺服器無反應，則會發出時間到的錯誤，0則不限制
 * @returns JSON格式
 */
export function getJson<T>(src: string, timeout = 0) {
    return new Promise<T>((resolve, reject) => {
        let x: NodeJS.Timeout | null = null;
        if (timeout > 0) {
            x= setTimeout(() => {
                reject('timeout!!!')
            }, timeout);
        }

        const requestOptions = {
            method: 'GET',
        };
        fetch(src, requestOptions)
            .then(response => response.text())
            .then(result => {
                if (timeout > 0 && x) clearTimeout(x);

                resolve(JSON.parse(result));
            })
            .catch(error => reject(error));

    })
}