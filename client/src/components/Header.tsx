import { Link } from "react-router-dom";
import { Icons } from "./Icons";

function Header({user} : { user?:string }) {
  

    const BellIcon = Icons["notiBell"];
    const MoonIcon = Icons["moon-star"];


    return (
        <div className="flex px-10 h-16 border border-b-2 border-b-secondary justify-between items-center"> 
            <div className="left">
                {
                    user && 
                    <Link to="/profile" className="w-10 h-10 rounded-full border-2 border-primary flex justify-center items-center bg-secondary">
                        <p>{user}</p>
                    </Link>
                }
            </div>
            <div className="middle">
                <Link to="/" className="text-2xl font-medium">Spotlight</Link>
            </div>

            <div className="right flex">
                <BellIcon className="ml-6" color="#14a8b6"/>
                <MoonIcon className="ml-6" color="#14a8b6" />
            </div>
        </div>
  )
}

export default Header