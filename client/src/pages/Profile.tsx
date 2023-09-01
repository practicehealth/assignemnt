import axios from "axios";
import { useEffect, useState } from "react";
import { getUser } from "../utils/utils";
import { useNavigate } from "react-router-dom";
import { User } from "../../types";
import Header from "../components/Header";

function Profile() {
    const navigateTo = useNavigate();
    const [ user, setUser ] = useState<User>();

    async function handleLogout(){
        await axios.delete("/auth/logout");
        localStorage.removeItem("user");
        navigateTo("/login")
    }

    useEffect(()=>{
        async function verify() {
            try {
                await axios.get("/auth/verify" );
                setUser(getUser());
            } catch ( err ) {
                navigateTo("/login");
            }
        }
        verify();
    }, []);

  return (
    <>
        {
            user &&

            <div className="pageDiv">
                <Header user={user.userName[0]} />
            </div>

        }
    </>
    
  )
}

export default Profile