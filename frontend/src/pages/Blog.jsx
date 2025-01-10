//pages/Blog.jsx

import { useParams } from "react-router-dom";
import { useBlog } from "../hooks";
import { BlogPage } from "../components/BlogPage";

export const Blog = () => {
    const { id } = useParams();
    const { loading, blog } = useBlog({
        id: id || ""
    });
    if (loading) {
        return <div>
            loading...
        </div>
    }
    return <div>
        <BlogPage blog={blog} />
    </div>
}
