import { useState, useEffect } from "react";
import { DetailData, getDetailApi } from "../../apis/detail";
import { useNavigate, useSearchParams } from "react-router-dom";
import { NavBar } from "antd-mobile";

const Detail = () => {
  const [detail, setDetail] = useState<DetailData | null>(null);

  // 获取路由参数
  const [params] = useSearchParams();
  const id = params.get("id");

  // 初始渲染
  useEffect(() => {
    const getDetail = async () => {
      try {
        const res = await getDetailApi(id!);
        setDetail(res.data.data);
      } catch (error) {
        throw new Error("Detail请求获取失败");
      }
    };
    getDetail();
  }, [id]);

  // 路由返回
  const navigate = useNavigate()
  const onBack = () => {
    navigate(-1)
  }

  // 数据返回之前loading渲染占位
  if (!detail) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <NavBar onBack={onBack}>{detail?.title}</NavBar>
      <div dangerouslySetInnerHTML={{ __html: detail?.content }}></div>
    </div>
  );
};

export default Detail;
