interface Video {
    "title": string;
    "videoId": string;
    "videoThumbnails": 
        {
            "quality": string;
            "url": string;
            "width": number;
            "height": number
        }[];

    "description": string;
    "descriptionHtml": string;
    "published": number;
    "publishedText": string;

    "keywords": Array<string>;
    "viewCount": number;
    "likeCount": number;
    "dislikeCount": number;

    "paid": Boolean;
    "premium": Boolean;
    "isFamilyFriendly": Boolean;
    "allowedRegions": Array<string>;
    "genre": string;
    "genreUrl": string;

    "author": string;
    "authorId": string;
    "authorUrl": string;
    "authorThumbnails": [
        {
            "url": string;
            "width": number;
            "height": number
        }
    ];

    "subCountText": string;
    "lengthSeconds": number;
    "allowRatings": Boolean;
    "rating": number;
    "isListed": Boolean;
    "liveNow": Boolean;
    "isUpcoming": Boolean;
    "premiereTimestamp"?: number;

    "hlsUrl"?: string;
    "adaptiveFormats": [
        {
            "index": string;
            "bitrate": string;
            "init": string;
            "url": string;
            "itag": string;
            "type": string;
            "clen": string;
            "lmt": string;
            "projectionType": number;
            "container": string;
            "encoding": string;
            "qualityLabel"?: string;
            "resolution"?: string
        }
    ];
    "formatStreams": [
        {
            "url": string;
            "itag": string;
            "type": string;
            "quality": string;
            "container": string;
            "encoding": string;
            "qualityLabel": string;
            "resolution": string;
            "size": string
        }
    ];
    "captions": [
        {
            "label": string;
            "languageCode": string;
            "url": string
        }
    ];
    "recommendedVideos": [
        {
            "videoId": string;
            "title": string;
            "videoThumbnails": [
                {
                    "quality": string;
                    "url": string;
                    "width": number;
                    "height": number
                }
            ];
            "author": string;
            "lengthSeconds": number;
            "viewCountText": string
        }
    ]
}

interface SearchResultItem {
    type: "video";
    title: string;
    videoId: string;
    author: string;
    authorId: string;
    authorUrl: string;
    videoThumbnails: 
        {
            quality: string;
            url: string;
            width: number;
            height: number
        }[];
    description: string;
    descriptionHtml: string;
    viewCount: number;
    published: number;
    publishedText: string;
    lengthSeconds: number;
    liveNow: Boolean;
    paid: Boolean;
    premium: Boolean
}


interface InvidiousNodeRatios {
    "ratio": string;
    "label": string;
}
/** InvidiousNode 節點*/
interface InvidiousNode {
    "flag": string;
    "region": string;
    "stats": {
        "version": string;
        "software": {
            "name": string;
            "version": string;
            "branch": string;
        };
        "openRegistrations": boolean;
        "usage": {
            "users": {
                "total": number;
                "activeHalfyear": number;
                "activeMonth": number;
            }
        };
        "metadata": {
            "updatedAt": number;
            "lastChannelRefreshedAt": number;
        };
    };
    "cors": boolean;
    "api": boolean;
    "type": string;
    "uri": string;
    "monitor": {
        "monitorId": number;
        "createdAt": number;
        "statusClass": string;
        "name": string;
        "url": null | string;
        "type": string;
        "dailyRatios": InvidiousNodeRatios[]
        "90dRatio": InvidiousNodeRatios;
        "30dRatio": InvidiousNodeRatios;
    }
}
