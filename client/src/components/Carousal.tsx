import { useEffect, useState } from "react";
import Select from 'react-select'
import { CarousalData, ReactSelect, Timeline } from "../../types";
import CarSlider from "./CarSlider";

function Carousal( { data, showCarModal } : {  data: CarousalData, showCarModal: Function }) {

    const dataSet = data.data;
    const wr = dataSet.filter((it) => {
        return it.id === 20
    })
    console.log(wr);
    
    const [ tlItems, setTlItems ] = useState<Timeline[]>(data.data);
    const [ currYear, setCurrYear ] = useState<ReactSelect<number>>({ label: "No filter", value: -1});
    const [ currEvent, setCurrEvent ] = useState<ReactSelect<string>>( { label: "No filter", value:"" });

    const [ currIndex, setCurrIndex ] = useState<number>(0);


    function handleYearFilter( opt:ReactSelect<number> | null ) {
        if ( opt ) {
            setCurrYear( opt );
        }
        return;
    }

    function handleEventFilter( opt:ReactSelect<string> | null ) {
        if ( opt ) {
            setCurrEvent( opt );
        }
        return;
    }

    function clearFilters(){
        setCurrEvent({ label: "No filter", value:"" }); 
        setCurrYear({ label: "No filter", value: -1}); 
    }


    function moveIndex(num:number) {
        if ( currIndex + num >=0 && currIndex+num < tlItems.length ) {
            setCurrIndex(currIndex + num);
        }
    }
    
    useEffect( () =>{
        // setTlItems(data.data);
        var filteredArr = dataSet;
        if ( currYear.value != -1 ) {
            
            filteredArr = filteredArr.filter( (it) => {
                return it.year == currYear.value;
            })
            
        }
        if ( currEvent.value != "" ) {
            filteredArr = filteredArr.filter( (it) => {
                return it.eventType == currEvent.value;
            })
        }
        
        setCurrIndex(0);
        setTlItems(filteredArr);
    }, [ currEvent, currYear ])



    return(
        <div className=" flex flex-col w-[500px] h-[400px] border border-primary mr-10 rounded-lg">
            <div className="carHead flex flex-col mx-5 ">
                <div className="flex my-2 justify-between">
                    <p className=" text-xl font-semibold">Timeline Event</p>
                    <button onClick={ clearFilters } className="text-sm">Clear Filters</button>
                </div>
                <div className="carFilters flex justify-between mx-4">
                    <Select value={currYear} onChange={ (opt) => handleYearFilter(opt) } className="basis-1/3 mr-10" options={data.years} placeholder="Year" />
                    <Select value={currEvent} onChange={ (opt) => handleEventFilter(opt) } className="basis-2/3" options={data.eventTypes} placeholder="Event Type" />
                </div>
            </div>
            <hr className="mt-3" />
            <div className="carBody flex flex-1">
                <CarSlider showCarModal={showCarModal} data={tlItems} currIndex={currIndex} moveIndex = {moveIndex} />
            </div>
        </div>
    )
}

export default Carousal;
