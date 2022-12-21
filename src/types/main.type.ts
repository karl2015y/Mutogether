interface Operator {
    name: string;
}
interface PlayListItem {
    _id?: string;
    youtubeId: string;
    operator: Operator;
    played: boolean;
    timestamp: number;
}
interface ActionListItem {
    method: "暫停" | "撥放" | "切歌" | "大聲" | "小聲" | '發言';
    note?: string;
    operator: Operator;
    timestamp: number
}