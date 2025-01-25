// components/Auth/Auth.jsx

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { Headers } from "./Headers";
import { ToastContainer, toast } from "react-toastify";

export const Auth = ({ type }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    // Configure toast position to top-center
    const toastConfig = {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
    };

    async function signIn() {
        if (!username || !password) {
            toast.error("Error: Please fill in all fields", toastConfig);
            return;
        }
        if (!validateEmail(username)) {
            toast.error("Error: Invalid email format", toastConfig);
            return;
        }
        if (!validatePassword(password)) {
            toast.error(
                "Invalid password. Please enter a password with at least 6 characters.",
                toastConfig
            );
            return;
        }
        try {
            console.log(`${BACKEND_URL}/public/signup`);
            const response = await axios.post(`${BACKEND_URL}/api/v1/user/signin`, {
                username,
                password,
            });
            console.log(response);
            // Handle successful sign-in (e.g., redirect to dashboard)
            navigate("/dashboard");
        } catch (e) {
            toast.error("Error: Try again | Invalid credentials", toastConfig);
        }
    }

    function validateEmail(username) {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(username).toLowerCase());
    }

    function validatePassword(password) {
        if (password.length < 6) {
            return false;
        }
        return true;
    }

    
    async function signUp() {
        try {
            const userName = username;
            console.log(`/api/public/signup`);
            const response = await axios.post(`${BACKEND_URL}/public/signup`, {
                userName,
                password,
            });
            console.log(response);

            // Show success toast for sign-up
            toast.success("Sign-up successful! Redirecting to login...", toastConfig);

            // Handle successful sign-up (e.g., redirect to login)
            setTimeout(() => navigate("/login"), 2000); // Redirect after 2 seconds
        } catch (e) {
            toast.error("Error: Try again | Username or email already exists", toastConfig);
        }
    }

    function handleGoogleLogin() {
        // Show info toast for Google login
        toast.info("Google login is not implemented yet.", toastConfig);
    }

    return (
        <div className="h-screen flex justify-center flex-col">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <Headers type={type}></Headers>
                    <>
                        <LabelledInput
                            label="Username"
                            type={"text"}
                            placeholder="jhondoe@gmail.com"
                            onChange={(e) => {
                                setUsername(e.target.value);
                            }}
                        />

                        <LabelledInput
                            label="Password"
                            type={"password"}
                            placeholder="jhon@123"
                            onChange={(e) => {
                                setPassword(e.target.value);
                            }}
                        />
                        <button
                            onClick={type === "signup" ? signUp : signIn}
                            type="button"
                            className="mt-8 w-full text-center text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
                        >
                            {type === "signup" ? "Sign Up" : "Sign In"}
                        </button>
                </>
{type === "signin" && (
                            <div className="flex justify-center">
                                <button
                                    onClick={handleGoogleLogin}
                                    type="button"
                                    className="w-70 text-center text-gray-700 bg-white hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 flex items-center justify-center border border-gray-300"
                                >
                                    <img
                                        src="https://www.google.com/favicon.ico"
                                        alt="Google Logo"
                                        className="w-5 h-5 mr-2"
                                    />
                                    Continue with Google
                                </button>
                            </div>
                        )}            </div>
            <ToastContainer />
        </div>
    );
};

// LabelledInput Component
function LabelledInput({ label, placeholder, onChange, type = "text" }) {
    return (
        <div className="mt-3">
            <label className="block mb-2 text-sm font-medium text-gray-900">
                {label}
            </label>
            <input
                onChange={onChange}
                type={type}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder={placeholder}
                required
            />
        </div>
    );
}