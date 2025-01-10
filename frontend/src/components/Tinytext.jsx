//components/tinytext.jsx

import React, { useRef, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { BACKEND_URL } from "../config";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export function Editortiny() {
    const editorRef = useRef(null);
    const [title, stitle] = useState("");

    let ctemp = "";
    const navigate = useNavigate();

    async function sendRequest() {
        try {
            const lk = `${BACKEND_URL}/api/v1/blog/post`;
            if (ctemp === "") {
                console.log("input empty");
                return;
            }

            const response = await axios.post(
                lk,
                {
                    title: title,
                    content: ctemp,
                },
                {
                    headers: {
                        Authorization: localStorage.getItem("token"),
                    },
                }
            );

            navigate(`/blog/${response.data.id}`);
        } catch (e) { }
    }
    const savedata = async () => {
        if (editorRef.current) {
            ctemp = await editorRef.current.getContent();
            sendRequest();
        } else {
            return null;
        }
    };

    return (
        <div>
            <div className="flex justify-center w-full pt-8">
                <div className="max-w-screen-lg w-full me-20">
                    <input
                        onChange={(e) => {
                            stitle(e.target.value);
                        }}
                        className="m-5  bg-gray-50 border border-gray-300
                         text-gray-900 text-sm rounded-lg 
                         focus:ring-blue-500 focus:border-blue-500
                          block w-full p-2.5"
                        placeholder="Title"
                    />
                </div>
            </div>
            <div className="p-6">
                <Editor
                    apiKey="YOUR_API_KEY"
                    onInit={(evt, editor) =>
                        (editorRef.current = editor)}
                    initialValue="<p>This is the initial content
                     of the editor.</p>"
                    init={{
                        height: 750,
                        menubar: false,
                        plugins: [
                            "advlist",
                            "autolink",
                            "lists",
                            "link",
                            "image",
                            "charmap",
                            "preview",
                            "anchor",
                            "searchreplace",
                            "visualblocks",
                            "code",
                            "fullscreen",
                            "insertdatetime",
                            "media",
                            "table",
                            "code",
                            "help",
                            "wordcount",
                        ],
                        toolbar:
                            "undo redo | blocks | " +
                            "bold italic forecolor | alignleft aligncenter " +
                            "alignright alignjustify | bullist numlist outdent indent | " +
                            "removeformat | help",
                        content_style:
                            "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
                    }}
                />
                <div className="flex justify-center flex-col pt-5">
                    <button
                        onClick={savedata}
                        type="button"
                        className="text-white bg-blue-700 hover:bg-blue-800
                         focus:outline-none focus:ring-4 focus:ring-blue-300
                          font-medium rounded-full text-sm px-5 py-2.5
                           text-center me-2 mb-2"
                    >
                        Submit
                    </button>
                </div>
            </div>
        </div>
    );
}
