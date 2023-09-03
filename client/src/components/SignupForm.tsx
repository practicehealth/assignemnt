import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

function SignupForm() {
    const [userName,setUserName] = useState<string>("");
    const [email,setEmail] = useState<string>("");
    const [pass,setPass] = useState<string>("");
    const [rePass,setRePass] = useState<string>("");

    const navigateTo = useNavigate();

    async function handleSignup(){
        if ( userName == "" || email == "" )  {
            alert("Enter username and email")
            return;
        }
        if ( pass !== rePass || pass.length<9 ) {
            alert("pass dont match or way less chars");
            return;
        }
        const data = {
            "userName" : userName,
            "email" : email,
            "password" : pass,
            "image" : ""
        }
        try {
            const resp = await axios.post(`/auth/signup`, data );
            console.log(resp)
            if ( resp.data.ok ) {
                navigateTo("/login")
            } else {
                alert("signup unsuccessful");
            }
            
        } catch (error:any) {
            console.log(error);
            alert(error.response.data.msg);
        }



    }

    return (
        <div className='flex flex-col max-w-xl '>
        
            <p className='text-3xl mb-6 '>Signup</p>
            <input placeholder='Enter an Username' onChange={(e)=>setUserName(e.target.value)} type='text' className='px-2 py-1 mb-4 rounded-md bg-neutral-200 '></input>
            <input placeholder='Enter your Email' onChange={(e)=>setEmail(e.target.value)} type='text' className='px-2 py-1 mb-4 rounded-md bg-neutral-200 '></input>
            <input placeholder='New Password' onChange={(e)=>setPass(e.target.value)} type='password' className='px-2 py-1 mb-4 rounded-md bg-neutral-200 '></input>
            <input placeholder='Confirm Password' onChange={(e)=>setRePass(e.target.value)} type='password' className='px-2 py-1 mb-4 rounded-md bg-neutral-200 '></input>
            <div className='flex w-full justify-end items-end content-center'>
                <button onClick={handleSignup} className='bg-primary  text-white  min-w-[100px] rounded py-2  w-20  place-items-end '>Sign Up</button>
            </div>
            
        </div>
    )

}


export default SignupForm;