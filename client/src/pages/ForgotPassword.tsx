import Header from "../components/Header";
import axios from "axios";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";

interface FormDetails{
    userName: string, 
    email:string, 
    password: string, 
    cnfPassword: string
}

function ForgotPassword() {

    
    const navigateTo = useNavigate();
    const [ form, setForm ] = useState<FormDetails>({ userName: "", email: "", password: "", cnfPassword: "" });

    
    async function submitDoc() {
        if ( form.userName == "" || form.email == "" || form.userName.length<5 || form.email.length<5 || form.password.length<6 || form.password !== form.cnfPassword  ) {
            alert("Enter valid Credentials");
            return;
        }

        try {
            const resp = await axios.post("/auth/forgotpwd", form );
            if ( resp.data.ok ) {
                alert ( resp.data.msg );
                navigateTo("/login")
                return;
            } else {
                console.log(resp);
                alert( resp.data.msg );
                return;
            }
        } catch ( err: any ) {
            alert(err.message);
            return;
        }
        
    }

    useEffect(() => {
        document.title = "Forgot Password";
    })

    return(
        <div className="flex flex-col pageDiv">
            <Header />
            <main className="flex flex-col pageDiv px-52 py-10">
                <div className="pageHead">
                    <p className="text-3xl font-bold text-primary">Confirm Credentials</p>
                    <p className="my-2 text-lg text-gray-400">Enter your credentials to change your password by confirming its you.</p>
                </div>
                <div className="pageBody w-full flex flex-col justify-center my-4">
                    <p className="justify-self-start w-1/2  ">Enter your username:</p>
                    <input onChange={(e) => { setForm( prev => ( { ...prev, userName: e.target.value} ) ) }} className="border border-primary w-1/3 rounded-lg  mb-4 px-2 py-2"></input>
                    <p className="justify-self-start w-1/2  ">Enter your email:</p>
                    <input onChange={(e) => { setForm( prev => ( { ...prev, email: e.target.value} ) ) }} className="border border-primary w-1/3 rounded-lg  mb-4 px-2 py-2"></input>
                    <p className="justify-self-start w-1/2  ">Enter your new password:</p>
                    <input type="password" onChange={(e) => { setForm( prev => ( { ...prev, password: e.target.value} ) ) }} className="border border-primary w-1/3 rounded-lg  mb-4 px-2 py-2"></input>
                    <p className="justify-self-start w-1/2  ">Confirm your new password:</p>
                    <input type="password" onChange={(e) => { setForm( prev => ( { ...prev, cnfPassword: e.target.value} ) ) }} className="border border-primary w-1/3 rounded-lg  px-2 py-2"></input>
                </div>
                <div className="flex w-1/3 justify-end">
                    <button onClick={submitDoc} className="px-4 py-2 bg-primary text-white rounded-lg">Submit</button>
                </div>
            </main>
        </div>
    ) 
}

export default ForgotPassword;
