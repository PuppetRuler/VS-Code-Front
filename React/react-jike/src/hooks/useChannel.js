import { getChannelApi } from "@/apis/article";
import { useEffect, useState } from "react";


function useChannel() {
    // 初始化频道列表
    const [channelList, setChannelList] = useState([]);
    // 调用获取频道接口
    useEffect(() => {
        async function getChannelList() {
            const res = await getChannelApi();
            setChannelList(res.data.channels);
        }
        getChannelList();
    }, []);
    return {
        channelList
    };
}

export { useChannel };