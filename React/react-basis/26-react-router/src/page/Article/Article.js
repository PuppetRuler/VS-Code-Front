import { useParams, useSearchParams } from "react-router-dom";

export default function Article(){
    // searchParams传参
    // const [params] = useSearchParams()
    // const id = params.get('id')
    // const name = params.get('name')
    // params传参
    const params = useParams()
    const id = params.id
    const name = params.name
    return <div>文章页{id}-{name}</div>
}