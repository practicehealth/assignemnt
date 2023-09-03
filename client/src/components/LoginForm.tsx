import axios, { AxiosResponse } from 'axios';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function LoginForm() {

    const [userName,setUserName] = useState<string>("");
    const [pass,setPass] = useState<string>("");

    const navigateTo = useNavigate();

    async function handleLogin() {
        
        const reqConf = {
            url: "/auth/login",
            data: {
                userName, password: pass
            }
        }
        try {

            const resp:AxiosResponse = await axios.post( reqConf.url, reqConf.data );
            if ( resp.data.ok ) {
                const userString = JSON.stringify(resp.data.data);
                localStorage.setItem("user", userString);
                navigateTo("/");
                return;
            } else { 
                return;
            }

        } catch ( err:any ) {

            const resp = err.response.data;
            alert( resp.msg );
            return;
        }
        
        
    }


    return (
        <div className='flex flex-col max-w-xl '>
            <p className='text-3xl mb-6 '>Login</p>
            <input placeholder='Username' onChange={(e)=>setUserName(e.target.value)} type='text' className='px-2 py-1 mb-4 rounded-md bg-neutral-200'></input>
            <input placeholder='Password' onChange={(e)=>setPass(e.target.value)} type='password' className='px-2 py-1 mb-4 rounded-md bg-neutral-200'></input>
            <div className='flex w-full justify-between items-center content-center'>
                <Link to='/forgotpwd' className='pl-1 text-neutral-500 text-sm'>Forgot Password?</Link>
                <button onClick={handleLogin} className='bg-primary  min-w-[100px] rounded py-2  w-20  place-items-end '>Sign In</button>
            </div>
        </div>
    )

}


export default LoginForm;
