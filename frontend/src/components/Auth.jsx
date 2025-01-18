//components/Auth.jsx

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { Headers } from "./Headers";
import GoogleButton from 'react-google-button'
export const Auth = ({ type }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();
    async function signIn() {
    try {
      console.log(`${BACKEND_URL}/public/signup`);
      const response = await axios.post(`${BACKEND_URL}/api/v1/user/signin`, {
        email, // Use email for signin
        password,
      });
    
    } catch (e) {
      alert("Error, Try again| Invalid credentials");
    }
  }

  async function signUp() {
      try {
         const userName = username;
      console.log(`/api/public/signup`);
      const response = await axios.post(`${BACKEND_URL}/public/signup`, {
        userName,
        email,
        password,
      });
      console.log(response);
     
    } catch (e) {
      alert("Error, Try again| Username or email already exists");
    }
  }

    function handleGoogleLogin() {
   
    alert("Google login is not implemented yet.");
  }
    return (
        <div className="h-screen flex justify-center flex-col">
            <div className="flex justify-center">
                <div>
                    <Headers type={type}></Headers>
                    <>
                        {type === "signup" ?
                        <>
                        <LabelledInput
                        label="Username"
                        type={"text"}
                        placeholder="jhondoe@gmail.com"
                        onChange={(e) => {setUsername(e.target.value)}}
                       />
                   
                       
                        <LabelledInput
                        label=" Password"
                        type={"password"}
                        placeholder="jhon@123 "
                        onChange={(e) => {setPassword(e.target.value);}}
                                />
                        <button
                        onClick={signUp}
                        type="button"
                        className="mt-8 w-full text-center text-white  bg-gray-800 hover:bg-gray-900 focus:outline-nonefocus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2">
                       SignUp
                        </button>
                        <label className="flex justify-center mb-2 text-sm font-medium text-gray-900">  Or</label><span className="flex justify-center py-2">  <GoogleButton onClick={handleGoogleLogin} /></span> </>
                            : 
                <> 
                   <LabelledInput
                        label="Username"
                        type={"text"}
                        placeholder="jhondoe@gmail.com"
                        onChange={(e) => {setUsername(e.target.value)}}
                       />
                   
                       
                        <LabelledInput
                        label=" Password"
                        type={"password"}
                        placeholder="jhon@123 "
                        onChange={(e) => {setPassword(e.target.value);}}
                                />
                    <button
                        onClick={signIn}
                        type="button"
                        className="mt-8 w-full text-center text-white  bg-gray-800 hover:bg-gray-900 focus:outline-nonefocus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2">
                        Sign in
                    </button>
                        </>
                        }
                         
                          </>

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
