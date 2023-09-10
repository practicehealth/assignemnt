import axios from "axios";
import {ChangeEvent, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {User} from "../../types";
import Header from "../components/Header";
import {getUser, removeUser} from "../utils/utils";

function DeleteAccount() {
   
    const [ user, setUser ] = useState<User>();
    const navigateTo = useNavigate();
    const [ pwd, setPwd ] = useState<string>("");
    const [ isDisabled, setDisabled ] = useState<boolean>(true);

    async function handleChange( e: ChangeEvent<HTMLInputElement> ) {
        setPwd(e.target.value);
        if ( e.target.value.length>7 ) {
            setDisabled(false);
        }
    }

    async function handleSubmit() {
        if ( pwd.length<9 ) {
            alert("Password length is less than ideal");
            return;
        }

        try {

            await axios.post("/auth/login", { userName: user?.userName, password: pwd });
            await axios.delete(`/auth/delact?userName=${user?.userName}`)
            removeUser();
            alert("Account deleted Successfully");
            navigateTo("/");
            return;

        } catch ( err:any ) {
            const resp = await err.response.data;
            alert(resp.msg);
            return;
        }

    }

    useEffect(()=>{

        document.title = "Delete Account";
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

    return(
        <div className="pageDiv">
            {
                user &&
                <Header user={user.userName[0]} />
            }

            <main className=" pageDiv  items-center  mr-10 px-52 flex flex-col  " >
            {
                user &&
                <div className="flex flex-col w-full items-center">
                    <p className=" text-2xl mt-32 mb-2 text-center">Do you confirm to delete this account?</p>
                    <p className="justify-self-start text-center text-neutral-500 mb-1">Enter your password</p>
                    <input type="password" onChange={ handleChange } className="border border-red-500  rounded-lg  mb-4 px-2 py-2 w-1/4 text-center"></input>
                    <button disabled={isDisabled} className= { isDisabled ? "px-4 py-2 bg-neutral-300 text-white rounded-lg" : "px-4 py-2 bg-red-500 text-white rounded-lg" } onClick={handleSubmit} >Confirm Delete</button>
                </div>
            }
            </main>
        </div>
    )

}

export default DeleteAccount;
