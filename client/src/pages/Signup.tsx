import { Link } from "react-router-dom"
import Header from "../components/Header"
import SignupForm from "../components/SignupForm"

function Signup() {


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