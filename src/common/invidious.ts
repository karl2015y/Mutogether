import { getJson, getRandItemFromArray } from "./utils";

/**
 * 取得所有可以使用的invidious server 位置
 */
export function getServer() {
    return new Promise<string[]>(async (resolve, reject) => {
        try {
            console.log('get server');
            const apiServerArray = await getJson("https://api.invidious.io/instances.json?pretty=1") as Array<[string, InvidiousNode]>;
            let _apiServerArray: string[] = [];
            _apiServerArray = apiServerArray.filter((item) => (
                item[1]['cors']
                && item[1]['cors']
                && item[1]['type'] === 'https'
                && (item[1]['monitor'] && item[1]['monitor']['statusClass'] === 'success')
            )).map((item) => item[1]['uri']);
            resolve(_apiServerArray)
        } catch (error) {
            reject(error)
        }
    })



}

/**
 * 從傳進來的serverArray中隨機挑選server位置 再去做查詢
 * @param serverArray 
 * @param query 
 * @returns 回傳查詢後的資料
 */
 export function handleYoutubeQuery(serverArray:string[],query: string) {
    return new Promise<SearchResultItem[]>(async (resolve, reject) => {
        try {
            const apiUrl = `${getRandItemFromArray(serverArray)}/api/v1/search/?q=${encodeURI(query)}&page=1&date=none&type=music&duration=none&sort=relevance`
            const searchedArray = await getJson<SearchResultItem[]>(apiUrl)
            resolve(searchedArray)
        } catch (error) {
            reject(error)
        }
    })
}


/**
 * get youtube video data by video id
 */
export function getYoutubeVideo(serverArray:string[],videoId:string){
    return new Promise<Video>(async (resolve, reject) => {
        try {
            // const apiUrl = `${getRandItemFromArray(serverArray)}/api/v1/videos/${encodeURI(videoId)}/?fields=videoId,title,videoId,videoThumbnails,description,published,publishedText,keywords,likeCount,viewCount,author,authorThumbnails,formatStreams,recommendedVideos`
            const apiUrl = `${getRandItemFromArray(serverArray)}/api/v1/videos/${encodeURI(videoId)}/?fields=videoId,title,videoId,videoThumbnails,description,published,publishedText,keywords,likeCount,viewCount,author,authorThumbnails,adaptiveFormats,recommendedVideos,lengthSeconds,formatStreams`
            const searchedArray = await getJson<Video>(apiUrl)
            resolve(searchedArray)
        } catch (error) {
            reject(error)
        }
    })
}



// tryPromise<string>(getYoutubeId("query")) 最多嘗試五次 每次停頓500毫秒



// function getU2PlaylistUrl() {
//     return `https://www.youtube.com/watch_videos?video_ids=${this.videoIds.toString()}`
// }


function allWithProgress<T>(requests: Promise<T>[], callback: Function) {
    let index = 0;
    requests.forEach(item => {
        item.then(() => {
            index++;
            const progress = index * 100 / requests.length;
            callback(progress);
        })
    });
    return Promise.allSettled<T>(requests);
}












