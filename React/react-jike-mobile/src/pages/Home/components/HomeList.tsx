import { Image, InfiniteScroll, List } from "antd-mobile";
import useHomeList from "@/hooks/Home/useList";
import { useNavigate } from "react-router-dom";

type Props = {
  channelId: string;
};

const HomeList = (props: Props) => {
  // 获取点击的频道id
  const { channelId } = props;
  // 获取文章列表数据
  const { listRes,hasMore,loadMore } = useHomeList(channelId);

  // 跳转到详情页
  const navigate = useNavigate()
  const goToDetail = (id:string) => {
    navigate(`/detail?id=${id}`)
  }

  return (
    <>
      <List>
        {listRes.results.map((item) => (
          <List.Item
          onClick={()=>goToDetail(item.art_id)}
            key={item.art_id}
            prefix={
              <Image
                src={item.cover.images?.[0]}
                style={{ borderRadius: 20 }}
                fit="cover"
                width={40}
                height={40}
              />
            }
            description={item.pubdate}
          >
            {item.title}
          </List.Item>
        ))}
      </List>
      <InfiniteScroll loadMore={loadMore} hasMore={hasMore} threshold={10} />
    </>
  );
};

export default HomeList;
