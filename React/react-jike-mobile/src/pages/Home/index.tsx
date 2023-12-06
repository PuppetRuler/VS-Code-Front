import "./index.scss";
import { Tabs } from "antd-mobile";
import useTabs from "@/hooks/Home/useTabs";
import HomeList from "./components/HomeList";
import { createHomeStore } from "@/store"; 

const Home = () => {
  const { channels } = useTabs();

  // 将tab频道列表的index值抽离出来，返回时更改defaultActiveKey默认值
  const index = createHomeStore((store:any)=>store.index)
  const changeIndex = createHomeStore((store:any)=>store.changeIndex)
  const onChange = (e:string)=>{
    changeIndex(e)
  }

  return (
    <div>
      <div className="tabContainer">
        <Tabs defaultActiveKey={index} onChange={(e:string)=>onChange(e)}>
          {channels.map((item) => (
            <Tabs.Tab title={item.name} key={item.id}>
              <div className="listContainer">
                <HomeList channelId={item.id + ""} />
              </div>
            </Tabs.Tab>
          ))}
        </Tabs>
      </div>
    </div>
  );
};

export default Home;
