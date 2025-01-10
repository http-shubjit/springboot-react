// frontend/src/components/Appbar.jsx

import { Link } from "react-router-dom"
import { Avatar } from "./BlogCard"
export const AppBar = () => {
    return <div className="py-2 border-b flex
     justify-between px-10">
        <Link to={'/blogs'}>
            <div className="pt-2">
                Medium
            </div>
        </Link>
        <div >
            <Link to={'/publish'}>
                <button type="button" className="text-white
             bg-green-700 hover:bg-green-800 focus:outline-none
              focus:ring-4 focus:ring-green-300 font-medium 
              rounded-full text-sm px-5 py-2.5 text-center
               me-5" >Publish</button>
            </Link>
            <Avatar name={localStorage.getItem("Username")}>

            </Avatar>
        </div>
    </div>
}
