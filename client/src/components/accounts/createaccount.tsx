
// import { Typography, Box, styled, Button, TextField, DatePicker } from "@mui/material"

import deleteicon from '../../icons/deleteicon.png'
import { useState,ChangeEvent } from "react";
import './account.css'
import { useNavigate } from 'react-router-dom';
//////////////////////////////api import/////////////////////////////////////
import {API} from "../../service/api"





//////////////////////////////css code//////////////////////////////////////


interface AccountProps {
    setislogin: (isLogin: boolean) => void;
  }


export const  Account: React.FC<AccountProps>  = ({setislogin}) => {
    const signupInitialValues = {
        fullname:"",
        emailid:"",
        password:"",
        dob:"",
        gender:"",
        mobileno:"",
     
    };

    const LoginInitialvalue={
        username: '',
        email:'',
        password: '',
    };
    const [loginvalue, setloginvalue] = useState<object>(LoginInitialvalue);
    const [signupvalue,setsignupvalue]=useState<object>(signupInitialValues);
    const navigate=useNavigate();


    const [account, toggleaccount] = useState('login')
    const togglebutton = () => {
        account === 'login' ? toggleaccount('signup') : toggleaccount('login');
    }

    const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setloginvalue({...loginvalue,[e.target.name]:e.target.value});
        console.log(loginvalue);
    }

    const handleSelectChange = (event:ChangeEvent<HTMLSelectElement>) => {
        const value = event.target.value;
        setsignupvalue({...signupvalue,"gender":value})
        console.log(signupvalue)
        
      };
    const onvalueChange=(e: ChangeEvent<HTMLInputElement>) => {
        setsignupvalue({...signupvalue,[e.target.name]:e.target.value});
        console.log(signupvalue);
    };

    const signupuser=async()=>{
        let response= await API.userSignup(signupvalue);
        if(response){
            setsignupvalue(signupInitialValues);
         toggleaccount('login');
        }
        else{
         console.log("error happen")
        }
 
     }
// //login function
const login=async()=>{
    const response=await API.userLogin(loginvalue);
    if(response){
        // setsignupvalue(signupInitialValues);
        setislogin(true);
        navigate('/')
    }
    else{
     console.log("error happen")
    }

    
}



    return (

        <div className="main">

            <div className="account">
                <div className="logo">Account</div>
                {
                    account === "login" ?
                        <div id="login-page">
                            <div className="delete">
                                <label htmlFor="">Delete Account</label><br />
                                <img src={deleteicon} alt="" />

                            </div>
                            <div className="login">
                                <label>Username</label><br />
                                <input type="text" placeholder="Enter your name" onChange={(e) =>  onInputChange(e) } name="username"/>
                            </div>

                            <div className="login">
                                <label>Email Id</label><br />
                                <input type="email" placeholder='Enter your email id' onChange={(e) =>  onInputChange(e) } name="email"/>
                            </div>
                            <div className="login">
                                <label>Password</label><br />
                                <input type="text" placeholder='Enter your password' onChange={(e) =>  onInputChange(e) } name="password" />
                            </div>

                            <div className="changepassword">
                                <button className='link-btn'>Change password</button>
                                <button className='link-btn' onClick={() => togglebutton()}>Create an account</button>
                            </div>
                            <div className="btn">
                                <button className='login-signup' onClick={()=>login()}>login</button>
                            </div>
                        </div>

                        :

                        <div id="signup-page">

                            <div className="login">
                                <label>Full Name</label><br />
                                <input type="text" placeholder="Enter full name" onChange={(e) =>  onvalueChange(e) } name="fullname"/>
                            </div>
                            <div className="login">
                                <label>Email Id</label><br />
                                <input type="email" placeholder="Enter your email id" onChange={(e) =>  onvalueChange(e) } name="emailid"/>
                            </div>
                            <div className="login">
                                <label>Password</label><br />
                                <input type="text" placeholder="Enter your password" onChange={(e) =>  onvalueChange(e) } name="password"/>
                            </div>

                            <div className="dob-gen">
                                <div className="login">
                                    <label>Date of birth(DOB)</label><br />
                                    <input id="date-field" type="date" required pattern="\d{4}-\d{2}-\d{2}" onChange={(e) =>  onvalueChange(e) } name="dob"/>
                                </div>

                                <div className="login" >
                                    <label>Gender</label><br />
                                    <select id="mySelect" name="gender" onChange={handleSelectChange} >
                                        <option value="none">Choose your gender</option>
                                        <option value="male">Male</option>
                                        <option value="female">Female</option>

                                    </select>
                                </div>
                            </div>

                            <div className="login">
                                <label>Mobile number</label><br />
                                <input type="number" placeholder="xxxxxxxxxx" onChange={(e) =>  onvalueChange(e) } name="mobileno"/>
                            </div>
                            <div className="changepassword">
                                <button className='link-btn' onClick={() => togglebutton()}>Already have an account</button>
                            </div>

                            <div className="btn">
                                <button className='login-signup' onClick={()=>signupuser() }>Signup</button>
                            </div>
                        </div>
                }
            </div>

        </div>
    )
}