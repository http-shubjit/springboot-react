//components/header.jsx

import { Link } from "react-router-dom";

export const Headers = ({ type }) => {
    return (
        <div className=" flex-col justify-center">
            <div className="text-3xl font-extrabold">
                {type === "signup" ? "Create an Account" : "Log in To your Account"}
            </div>
            <div className="text-slate-400 mb-4 ">
                {type === "signup"
                    ? "Already have a Account?"
                    : "Dont Have a Account yet?"}
                <Link
                    className="pl-2 underline"
                    to={type === "signup" ? "/signin" : "/signup"}
                >
                    {type === "signup" ? "Sign in" : "Signup"}
                </Link>
            </div>
        </div>
    );
};
