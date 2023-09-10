import axios from "axios"
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUser } from "../utils/utils";
import { CarousalData, ReactSelect, Timeline, User } from '../../types'
import Header from "../components/Header";
import Category from "../components/Category";
import { categoriesConfig } from "../configs/CategoryConfigs";
import CategoryModal from "../components/CategoryModal";
import Carousal from "../components/Carousal";
import CarousalModal from "../components/CarModal";

function Home() {
  

    const navigateTo = useNavigate();
    const [ user, setUser ] = useState<User>();
    const [ timeLineItems, setTimeLineItems ] = useState<Timeline[]>([]);
    
    const [ catVal, setCatVal ] = useState<string>("");
    const [ catModal, setCatModal ] = useState<boolean>(false);

    const [ carVal, setCarVal ] = useState<Timeline>();
    const [ carModal, setCarModal ] = useState<boolean>(false);


    // async function handleLogout(){
    //     await axios.delete("/auth/logout");
    //     localStorage.removeItem("user");
    //     navigateTo("/login")
    // }

    function showCatModal( currCat: string ){
        
        setCatVal(currCat);
        setCatModal(true);
    }

    function showCarModal( currCar: Timeline ) {
        setCarVal(currCar);
        setCarModal(true);
    }

    function filterCatData(){
        
        return timeLineItems.filter( (it) => {
            return it.resourceType == catVal;
        })
    }


    function makeCarousalData():CarousalData{
        
        var yrsArr:number[] = [];
        var evtTypesArr:string[] = [];

        var yearsArr:ReactSelect<number>[] = [];
        var eventTypesArr:ReactSelect<string>[] = [];
        var data = timeLineItems.filter( (it) => it.eventType != "nonEvent" );
        data = data.sort(function(a,b) {  if( new Date(b.serviceDate) > new Date(a.serviceDate)) return 1; else return -1  } );

        for ( let i = 0; i < data.length; i++ ) {
            const it = data[i];
            // console.log(it.eventType);
            
            if ( evtTypesArr.includes(it.eventType) == false){
                evtTypesArr.push(it.eventType);
                eventTypesArr.push({ value: it.eventType, label: it.eventType} );
            }
            if ( yrsArr.includes(it.year) == false ){
                yrsArr.push(it.year);
                yearsArr.push( { value: it.year, label: it.year.toString() })
            }
        }

        yearsArr.sort( (a,b) => {
            if ( a.value>b.value ) return 0;
            return 1;
        });
        
        

        return  { data: data, years: yearsArr, eventTypes: eventTypesArr };
    }

    useEffect(()=>{
        document.title = "Home"
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
                    timeLineItems && 
                    timeLineItems.length>0 &&
                    <Carousal data = { makeCarousalData() } showCarModal = { showCarModal }  />
                }

            </main>
        </div>
        <CategoryModal catVal={catVal} data = { filterCatData() } isVisible = { catModal } closeModal = { () => { setCatModal(false) }  }  />
        {
            carVal && 
            <CarousalModal carVal={carVal} data = { timeLineItems  } isVisible = { carModal }  closeModal = { () => { setCarModal(false) }  }  />
        }
        {/* <CarModal /> */}
        </>
    )
}

export default Home;
// <button onClick={handleLogout}>Logout</button>
