import axios from "axios";
import { ChangeEvent, useEffect, useState } from "react";
import { getUser } from "../utils/utils";
import { useNavigate } from "react-router-dom";
import { User } from "../../types";
import Header from "../components/Header";
import {Icons} from "../components/Icons";
import { PencilIcon } from "lucide-react";

function Profile() {

    const navigateTo = useNavigate();
    const cardClassName = "mx-6 my-3 w-[1000px] border border-primary px-10 py-8 rounded-lg bg-[#f8f9fa]";
    const genderOptions = [
        { label: "Male", value: "Male" },
        { label: "Female", value: "Female"},
        { label: "Others", value: "Others"},
    ]
    const DeleteIcon = Icons['delete'];
    
    const [ user, setUser ] = useState<User>();
    const [ normalMode, setNormalMode ] = useState<boolean>(true);
    const [ dateVal, setDateVal ] = useState<string>("");

    async function handleLogout(){
        await axios.delete("/auth/logout");
        localStorage.removeItem("user");
        navigateTo("/login")
    }

    async function handleSubmit() {
        try {
            const resp = await axios.put("/api/user/update", user );
            await axios.delete("/auth/logout")
            if ( resp.data.ok ) {
                alert(resp.data.msg);
                localStorage.removeItem("user");
                navigateTo("/");
            } else {
                navigateTo("/profile");
            }
            return;
        } catch( err: any ) {
            alert(err.response.data.msg);
        }

    }

    useEffect(()=>{

        document.title = "Profile";
        async function verify() {
            try {
                await axios.get("/auth/verify" );
                setUser(getUser());
            } catch ( err ) {
                navigateTo("/login");
            }
        }
        verify();
        if ( user?.dateOfBirth ) {
            setDateVal(user.dateOfBirth.toDateString());
        }
    }, []);

  return (
        <div className="pageDiv">
        {
            user &&

                <Header user={user.userName[0]} />
        }
            <main className=" pageDiv  items-center  mr-10 " >
                {
                    user && 
                <div className="mb-10">
                <div className={cardClassName}>
                    <div className="flex w-full justify-between items-center mb-4">
                        <p className="text-2xl font-medium">Account</p>
                        <div className="flex items-center cursor-pointer">
                            <p className="mx-2 text-sm text-red-500">Delete Account</p>
                            <DeleteIcon width='15' height='15' color="red" />
                        </div>
                    </div>
                    <div className="flex flex-col my-4">
                        <p className="text-sm mb-2">Username</p>
                        <input className="border border-primary rounded-lg py-2 px-2 bg-[#f8f9fa]" value={ user.userName } />
                    </div>
                    <div className="flex flex-col my-4">
                        <p className="text-sm mb-2">Email id</p>
                        <input className="border border-primary rounded-lg py-2 px-2 bg-[#f8f9fa]" value={ user.email } />
                    </div>
                    <div className="flex flex-col my-4">
                        <p className="text-sm mb-2">Password</p>
                        <input className="border border-primary rounded-lg py-2 px-2 bg-[#f8f9fa]" value="*******" />
                    </div>
                    <div className="flex w-full justify-between">
                        <button className="text-sm mx-2">Change Password</button>
                        <button className="px-3 py-2 bg-primary text-white rounded-lg cursor-pointer" onClick={handleLogout}>Logout</button>
                    </div>
                </div>
                <div className={cardClassName}>
                    <div className="flex w-full justify-between items-center mb-4">
                        <p className="text-2xl font-medium">Profile Summary</p>
                        <div className="flex items-center cursor-pointer" onClick={ () => setNormalMode(!normalMode) }>
                            <p className="mx-2 text-sm text-primary">Edit Account</p>
                            <PencilIcon width='15' height='15' color="#14a8b6" />
                        </div>
                    </div>
                    <div className="flex flex-col my-4">
                        <p className="text-sm mb-2">First Name</p>
                        <input
                            onChange={ ( e:ChangeEvent ) => setUser(  { ...user, firstName:(e.target as HTMLInputElement).value } ) }
                            disabled={ normalMode } className="border border-primary rounded-lg py-2 px-2" value={ user.firstName } placeholder="Yet to fill" />
                    </div>
                    <div className="flex flex-col my-4">
                        <p className="text-sm mb-2">Middle Name</p>
                        <input 
                            onChange={ ( e:ChangeEvent ) => setUser(  { ...user, middleName:(e.target as HTMLInputElement).value } ) }
                            disabled={ normalMode } className="border border-primary rounded-lg py-2 px-2" value={ user.middleName } placeholder="Yet to fill" />
                    </div>
                    <div className="flex flex-col my-4">
                        <p className="text-sm mb-2">Last Name</p>
                        <input 
                            onChange={ ( e:ChangeEvent ) => setUser(  { ...user, lastName:(e.target as HTMLInputElement).value } ) }
                            disabled={ normalMode } className="border border-primary rounded-lg py-2 px-2" value={ user.lastName } placeholder="Yet to fill" />
                    </div>
                    <div className="flex w-full justify-between">
                        <div className="flex flex-col my-2 w-full mr-4">
                            <p className="text-sm mb-2">Date of Birth(DOB)</p>
                            <input 
                                onChange={ ( e:ChangeEvent<HTMLInputElement> ) => setDateVal( e.target.value ) }
                                disabled={ normalMode } type="date" className="border border-primary rounded-lg py-2 px-2" value={ dateVal } />
                        </div>
                        <div className="flex flex-col my-2 w-full">
                            <p className="text-sm mb-2">Gender</p>
                            <select 
                                onChange={ ( e:ChangeEvent ) => setUser(  { ...user, gender:(e.target as HTMLInputElement).value } ) }
                                disabled={ normalMode } className="border border-primary rounded-lg py-3 px-2 bg-white" >
                                {
                                    genderOptions.map((opt) => {
                                        return <option value={opt.value}>{opt.label}</option>
                                    })
                                }
                            </select>
                        </div>
                    </div>
                    <div className="flex flex-col my-4">
                        <p className="text-sm mb-2">Mobile Phone</p>
                        <input
                            onChange={ ( e:ChangeEvent ) => setUser(  { ...user, phoneNumber:(e.target as HTMLInputElement).value } ) }
                            disabled={ normalMode } className="border border-primary rounded-lg py-2 px-2" value={ user.phoneNumber } placeholder="Yet to fill" />
                    </div>
                    <div className="flex w-full justify-end">
                        <button onClick={ handleSubmit } disabled={ normalMode } className={ !normalMode? "px-2 py-2 bg-primary rounded-lg text-white cursor-pointer" : "px-2 py-2 bg-neutral-300 rounded-lg cursor-default"} >Edit Account</button>
                    </div>
                </div>
                </div>
                }
            </main>

        </div>
    
  )
}

export default Profile;
