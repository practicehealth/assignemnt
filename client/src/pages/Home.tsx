import axios from "axios"
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUser } from "../utils/utils";
import { Timeline, User } from '../../types'
import Header from "../components/Header";
import Category from "../components/Category";
import { categoriesConfig } from "../configs/CategoryConfigs";
import CategoryModal from "../components/CategoryModal";
import Carousal from "../components/Carousal";

function Home() {
  

    const navigateTo = useNavigate();
    const [ user, setUser ] = useState<User>();
    const [ timeLineItems, setTimeLineItems ] = useState<Timeline[]>([]);
    
    const [ catVal, setCatVal ] = useState<string>("");
    const [ catModal, setCatModal ] = useState<boolean>(false);

    const [ slidModal, setSlidModal ] = useState<boolean>(false);


    // async function handleLogout(){
    //     await axios.delete("/auth/logout");
    //     localStorage.removeItem("user");
    //     navigateTo("/login")
    // }

    function showCatModal( currCat: string ){
        
        setCatVal(currCat);
        setCatModal(true);
        setSlidModal(true);
    }

    function filterCatData(){
        console.log(catVal);
        
        return timeLineItems.filter( (it) => {
            return it.resourceType == catVal;
        })
    }

    useEffect(()=>{
        async function verifyAndFetch() {
            try {
                await axios.get("/auth/verify" );
                const resp = await axios.get("/api/user/profile");
                setUser(getUser());
                setTimeLineItems( resp.data.data );
            } catch ( err ) {
                navigateTo("/login");
            }
        }
        verifyAndFetch();
    }, []);


    return (
        <>
        <div className="pageDiv">
            {
                user && 
                <Header user={user.userName[0]} />
            }
            <main className='pageDiv items-center'>
                <div className="categories w-[500px] grid grid-cols-3 place-items-center  mr-10 mt-20 mb-10">
                    {
                        categoriesConfig.map((props) => {
                            return <Category key={props.title} props = { props } showCatModal = { showCatModal } />
                        })
                    }
                </div>
                {
                    slidModal && <Carousal data = { timeLineItems }  />
                }

            </main>
        </div>
        <CategoryModal catVal={catVal} data = { filterCatData() } isVisible = { catModal } closeModal = { () => { setCatModal(false) }  }  />
        </>
    )
}

export default Home;
// <button onClick={handleLogout}>Logout</button>