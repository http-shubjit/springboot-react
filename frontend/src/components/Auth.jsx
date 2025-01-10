//components/Auth.jsx

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { Headers } from "./Headers";

export const Auth = ({ type }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();
    async function sendRequest() {
        try {
            console.log(`${BACKEND_URL}/api/v1/user/${type}`);
            const response = await axios
                .post(`${BACKEND_URL}/api/v1/user/${type}`, {
                    username: username,
                    password: password,
                });
            console.log(response);
            const jwt = response.data.token;
            console.log(jwt);
            localStorage.setItem("token", "Bearer " + jwt);

            navigate("/blogs");
        } catch (e) {
            alert("Error, Try again| use a diffrent username |  make sure username is atleast 3 characterslong and password 8 characters");
        }
    }
    return (
        <div className="h-screen flex justify-center flex-col">
            <div className="flex justify-center">
                <div>
                    <Headers type={type}></Headers>

                    <LabelledInput
                        label="Username"
                        placeholder="Alucard"
                        onChange={(e) => {
                            setUsername(e.target.value);
                        }}
                    />
                    <LabelledInput
                        label="Password"
                        type={"password"}
                        placeholder="Apassword"
                        onChange={(e) => {
                            setPassword(e.target.value);
                        }}
                    />
                    <button
                        onClick={sendRequest}
                        type="button"
                        className="mt-8 w-full text-center text-white 
            bg-gray-800 hover:bg-gray-900 focus:outline-none
             focus:ring-4 focus:ring-gray-300 font-medium 
             rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
                    >
                        {type === "signup" ? "SignUp" : "Sign in"}
                    </button>
                </div>
            </div>
        </div>
    );
};

function LabelledInput({ label, placeholder,
    onChange, type = "text" }) {
    return (
        <div className="mt-3 ">
            <label className="block mb-2 text-sm 
      font-medium text-gray-900">
                {label}
            </label>
            <input
                onChange={onChange}
                type={type}
                className="bg-gray-50 border border-gray-300 
        text-gray-900 text-sm rounded-lg focus:ring-blue-500 
        focus:border-blue-500 block w-full p-2.5"
                placeholder={placeholder}
            />
        </div>
    );
}
