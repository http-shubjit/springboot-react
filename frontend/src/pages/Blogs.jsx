//pages/Blogs.jsx

import { AppBar } from "../components/Appbar"
import { Blogcard } from "../components/BlogCard"
import { useBlogs } from "../hooks";

export const Blogs = () => {
    const { loading, blogs } = useBlogs();
    if (loading) {
        return <div>
            Loading...
        </div>
    }

    return (<div>
        <AppBar />
        <div className="flex justify-center">
            <div className="max-w-xl ">
                {blogs.map(blog => <Blogcard
                    authorName={blog.author.Username || "Anon"}
                    title={blog.title}
                    publishedDate={blog.createdAt.substring(0, 10)}
                    content={blog.content}
                    id={blog._id}>
                </Blogcard>)}
            </div>
        </div>
    </div>
    )
}
