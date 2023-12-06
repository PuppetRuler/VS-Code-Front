import { ChannelItem, getChannelApi } from "@/apis/list";
import { useEffect, useState } from "react";
const useTabs = () => {
  const [channels, setChannels] = useState<ChannelItem[]>([]);

  useEffect(() => {
    const getChannelList = async () => {
      try {
        const res = await getChannelApi();
        setChannels(res.data.data.channels);
      } catch (error) {
        console.log(error);
      }
    };
    getChannelList();
  }, []);

  return {
    channels,
  }
};

export default useTabs;
