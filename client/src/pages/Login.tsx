import { Link,  useNavigate } from "react-router-dom"
import Header from "../components/Header"
import LoginForm from "../components/LoginForm"
import { getUser } from "../utils/utils"
import { useEffect } from "react";
import axios from "axios";

function Login() {
    

    const navigateTo = useNavigate();

    useEffect(()=>{
        document.title = "Login";
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
        // <div className="pageDiv">
        //     <Header />
        //     <main className="pageDiv " style={{background : "#d78eed"}}>
        //         <div className='flex flex-col justify-center items-center mt-60 '>
        //             <div className=' flex flex-col max-w-xl mr-20'>
        //                 <LoginForm /> 
        //                 <span className='w-xl border-t border-primary my-4' />
        //                 <div className='flex justify-center'><Link to="/signup" className='text-accent underline'>{"Create an account if you don't have one"}</Link></div>
        //             </div>
        //         </div>
        //     </main>
        // </div>
        <div className="min-h-screen bg-gray-900 text-Green">
  <Header />
  <main className="bg-gray-800 py-16">
    <div className="flex flex-col justify-center items-center">
      <div className="bg-black border border-green-500 shadow-lg rounded-lg p-8 max-w-md mx-auto">
        <LoginForm />
        <div className="border-t border-green-500 my-4"></div>
        <div className="flex justify-center">
          <Link to="/signup" className="text-green-500 hover:underline">
            Create an account if you don't have one
          </Link>
        </div>
      </div>
    </div>
  </main>
</div>


    )
}

export default Login