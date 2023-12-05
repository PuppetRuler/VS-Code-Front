import {
    Card,
    Breadcrumb,
    Form,
    Button,
    Radio,
    Input,
    Upload,
    Space,
    Select,
    message
} from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { Link, useSearchParams } from 'react-router-dom';
import './index.scss';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useEffect, useState } from 'react';
import { createArticleApi, getArticleByIdApi, upDateArticleApi } from '@/apis/article';
import { useChannel } from '@/hooks/useChannel';

const { Option } = Select;

const Publish = () => {
    // 获取频道列表
    const { channelList } = useChannel();
    // 图片成功上传
    const [imageList, setImageList] = useState([]);
    const onChange = (value) => {
        setImageList(value.fileList);
    };

    // 切换封面类型
    const [imageType, setImageType] = useState(0);
    const onTypeChange = (event) => {
        setImageType(event.target.value);
        // 切换类型时清空原图片列表
        setImageList([]);
    };

    // 提交表单
    const [form] = Form.useForm();
    const onFinish = ({ title, content, channel_id }) => {
        // 校验封面类型imageTypea是否和实际的图片列表imageList.数量是相等的
        if (imageList.length !== imageType) return message.warning('图片数量与要求不匹配');
        const articleForm = {
            title,
            content,
            cover: {
                type: imageType, //封面模式
                //这里的url处理逻辑只是在新增时候的逻辑
                //编辑的时候需要做处理
                images: imageList.map(item => {
                    if(item.response) {
                        return item.response.data.url
                    } else {
                        return item.url
                    }
                }),  //图片列表
            },
            channel_id
        };
        // 处理调用不同的接口新增 - 新增接口编辑状态 - 更新接口 id
        if(articleId) {
            // 更新接口
            upDateArticleApi({...articleForm,id:articleId})
        } else {
            // 新增接口
            createArticleApi(articleForm);
        }
        // 轻提示
        message.success('表单提交成功');
        // 清空表单
        setImageType(0);
        setImageList([]);
        form.resetFields();
    };

    // 回填数据
    const [searchParams] = useSearchParams();
    const articleId = searchParams.get('id');
    useEffect(() => {
        // 1. 通过id获取数据
        async function getArticleDetail() {
            const res = await getArticleByIdApi(articleId);
            const data = res.data;
            const cover = data.cover;
            form.setFieldsValue({
                ...data,
                type: cover.type
            });
            // 为什么现在的写法无法回填封面？
            // 数据结构的问题 set方法 -> {type:3} {cover:{type:3}}

            // 回填图片列表
            setImageType(cover.type);
            // 显示图片({url:url})
            setImageList(cover.images.map(url => {
                return { url };
            }));
        }
        // 只有有id的时候才调用函数
        if(articleId) {
            getArticleDetail();
        }
        // 2. 调用实例方法，完成回填
    }, [articleId, form]);

    return (
        <div className="publish">
            <Card
                title={
                    <Breadcrumb items={[
                        { title: <Link to={'/'}>首页</Link> },
                        { title: articleId ? '编辑文章' : '发布文章' },
                    ]}
                    />
                }
            >
                <Form
                    form={form}
                    labelCol={{ span: 4 }}
                    wrapperCol={{ span: 16 }}
                    initialValues={{ type: 0 }}
                    onFinish={onFinish}
                >
                    <Form.Item
                        label="标题"
                        name="title"
                        rules={[{ required: true, message: '请输入文章标题' }]}
                    >
                        <Input placeholder="请输入文章标题" style={{ width: 400 }} />
                    </Form.Item>
                    <Form.Item
                        label="频道"
                        name="channel_id"
                        rules={[{ required: true, message: '请选择文章频道' }]}
                    >
                        <Select placeholder="请选择文章频道" style={{ width: 400 }}>
                            {channelList.map(item => <Option key={item.id} value={item.id}>{item.name}</Option>)}
                        </Select>
                    </Form.Item>
                    <Form.Item label="封面">
                        <Form.Item name="type">
                            <Radio.Group onChange={onTypeChange}>
                                <Radio value={1}>单图</Radio>
                                <Radio value={3}>三图</Radio>
                                <Radio value={0}>无图</Radio>
                            </Radio.Group>
                        </Form.Item>
                        {/* 
                            listType: 决定选择文件框的外观样式
                            showUploadList: 控制显示上传列表
                        */}
                        {imageType > 0 && <Upload
                            name='image'
                            listType="picture-card"
                            fileList={imageList}
                            showUploadList
                            action='http://geek.itheima.net/v1_0/upload'
                            onChange={onChange}
                            maxCount={imageType}
                        >
                            {imageList.length >= imageType ? null :
                                <div style={{ marginTop: 8 }}>
                                    <div>
                                        <PlusOutlined />
                                        <div style={{ marginTop: 8 }}>Upload</div>
                                    </div>
                                </div>}
                        </Upload>}
                    </Form.Item>
                    <Form.Item
                        label="内容"
                        name="content"
                        rules={[{ required: true, message: '请输入文章内容' }]}
                    >
                        {/* 富文本编辑器 */}
                        <ReactQuill
                            className="publish-quill"
                            theme="snow"
                            placeholder="请输入文章内容"
                        />
                    </Form.Item>

                    <Form.Item wrapperCol={{ offset: 4 }}>
                        <Space>
                            <Button size="large" type="primary" htmlType="submit">
                                发布文章
                            </Button>
                        </Space>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    );
};

export default Publish;