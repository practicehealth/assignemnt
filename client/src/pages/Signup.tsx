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
    // <div className="pageDiv">
    //     <Header />
    //     <main className="pageDiv " style={{background : "#d78eed"}}>
    //         <div className='flex flex-col justify-center items-center mt-60 '>
    //             <div className=' flex flex-col max-w-xl mr-20'>
    //                 <SignupForm /> 
    //                 <span className='w-xl border-t border-primary my-6' />
    //                 <div className='flex justify-center'><Link to="/login" className='text-accent underline'>If you have an account already...</Link></div>
    //             </div>
    //         </div>
    //     </main>
    // </div>
//     <div className="min-h-screen bg-gray-900 text-green-300">
//   <Header />
//   <main className="bg-gray-800 py-16">
//     <div className="flex flex-col justify-center items-center mt-16">
//       <div className="bg-black border border-green-500 shadow-lg rounded-lg p-8 max-w-md mx-auto">
//         <SignupForm />
//         <div className="border-t border-green-500 my-6"></div>
//         <div className="flex justify-center">
//           <Link to="/login" className="text-green-500 hover:underline">
//             If you have an account already...
//           </Link>
//         </div>
//       </div>
//     </div>
//   </main>
// </div>
<div className="min-h-screen bg-gray-900 text-Green">
  <Header />
  <main className="bg-gray-800 py-16">
    <div className="flex flex-col justify-center items-center mt-16">
      <div className="bg-black border border-green-500 shadow-lg rounded-lg p-8 max-w-md mx-auto">
        <SignupForm />
        <div className="border-t border-green-500 my-6"></div>
        <div className="flex justify-center">
          <Link to="/login" className="text-green-500 hover:underline">
            If you have an account already...
          </Link>
        </div>
      </div>
    </div>
  </main>
</div>




  )
}

export default Signup