//components/Blogcard.jsx

import { Link } from "react-router-dom";

export const Blogcard = ({ id, authorName, title, 
    content, publishedDate }) => {
    return (
        <Link to={`/blog/${id}`}>
            <div className="border-b border-slate-200 p-4
             w-screen max-w-screen-md cursor-pointer">
                <div className="flex w-full">
                    <div className="flex justify-center flex-col">
                        <Avatar name={authorName} />
                    </div>
                    <div className="font-extralight pl-2
                     flex justify-center flex-col">
                        {authorName}
                    </div>
                    <div className="flex justify-center flex-col pl-2">
                        <Circle></Circle>
                    </div>
                    <div className="pl-2 font-thin text-slate-500
                     flex justify-center flex-col">
                        {publishedDate}
                    </div>
                </div>
                <div className="pt-3 text-xl font-semibold">{title}</div>
                <div className="pt-1 text-md font-thin">
                    {convHtml(content).slice(0, 100) + "..."}
                </div>
                <div className="text-slate-400 test-sm font-thin pt-4">
                    {`${Math.ceil(content.length / 500)} 
                     minute(s) read`}
                </div>
            </div>
        </Link>
    );
};

export function Circle() {
    return <div className="bg-slate-400 w-1 h-1 rounded-full"></div>;
}
export function Avatar({ name }) {
    return (
        <div className="relative inline-flex items-center justify-center
         w-7 h-7 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
            <span className="font-medium text-gray-600 dark:text-gray-300">
                {name[0]}
            </span>
        </div>
    );
}

function convHtml(html) {
    const plainText = html.replace(/<\/?[^>]+(>|$)/g, "");
    return plainText;
}
