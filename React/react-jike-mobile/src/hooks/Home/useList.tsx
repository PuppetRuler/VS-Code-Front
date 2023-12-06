import { getArticleListApi, articleList } from "@/apis/list";
import { useEffect, useState } from "react";
// 获取列表数据
const useHomeList = (channelId: string) => {
  const [listRes, setListRes] = useState<articleList>({
    results: [],
    pre_timestamp: "" + new Date().getTime(),
  });

  useEffect(() => {
    const getHomeList = async () => {
      try {
        const res = await getArticleListApi({
          channel_id: channelId,
          timestamp: "" + new Date().getTime(),
        });
        setListRes(res.data.data);
      } catch (error) {
        throw new Error("List请求出错");
      }
    };
    getHomeList();
  }, [channelId]);
  // 加载更多
  const [hasMore, setHadMore] = useState(true);
  const loadMore = async () => {
    try {
      const res = await getArticleListApi({
        channel_id: channelId,
        timestamp: listRes.pre_timestamp,
      });
      // 没有数据立刻停止
      if (res.data.data.results.length === 0) {
        setHadMore(false);
      }
      setListRes({
        // 拼接新老列表数据
        results: [...listRes.results, ...res.data.data.results],
        // 重置时间参数 为下一次请求做准备
        pre_timestamp: res.data.data.pre_timestamp,
      });
    } catch (error) {
      throw new Error("load list error");
    }
  };

  return {
    listRes,
    hasMore,
    loadMore,
  };
};

export default useHomeList;
