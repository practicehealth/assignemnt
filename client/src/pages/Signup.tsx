import { Link, useNavigate } from "react-router-dom"
import Header from "../components/Header"
import SignupForm from "../components/SignupForm"
import { useEffect } from "react";
import axios from "axios";
import { getUser } from "../utils/utils";

function Signup() {


    const navigateTo = useNavigate();

    useEffect(()=>{
        document.title = "SignUp";
        async function verifyAndFetch() {
            try {
                await axios.get("/auth/verify" );
                if ( getUser() != undefined ) {
                    navigateTo("/");
                    return;
                }
            } catch ( err:any ) {
                // console.log(err.message);
                
                localStorage.removeItem("user");
                return;
                // alert(err.message);
            }
        }
        verifyAndFetch();
    })

  return (
    <div className="pageDiv">
        <Header />
        <main className="pageDiv ">
            <div className='flex flex-col justify-center items-center mt-60 '>
                <div className=' flex flex-col max-w-xl mr-20'>
                    <SignupForm /> 
                    <span className='w-xl border-t border-primary my-4' />
                    <div className='flex justify-center'><Link to="/login" className='text-accent underline'>If you have an account already...</Link></div>
                </div>
            </div>
        </main>
    </div>
  )
}

export default Signup