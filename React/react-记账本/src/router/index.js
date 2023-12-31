import Layout from "@/pages/Layout";
import Month from "@/pages/Month";
import New from "@/pages/New";
import Year from "@/pages/Year";

const { createBrowserRouter } = require("react-router-dom");

export const router = createBrowserRouter([
    {
        path:'/',
        element: <Layout></Layout>,
        children:[
            {
                index:true,
                element: <Month></Month>
            },
            {
                path:'year',
                element: <Year></Year>
            },
        ]
    },
    {
        path:'/new',
        element: <New></New>
    }
])