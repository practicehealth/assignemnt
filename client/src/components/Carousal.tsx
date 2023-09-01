import { useEffect, useState } from "react";
import { Timeline } from "../../types";

function Carousal( { data }: {  data: Timeline[] }) {
  

    const [ years, setYears ] = useState<number[]>([]);
    const [ eventTypes, setEventTypes ] = useState<string[]>([]);

    const [ currentYear, setCurrentYear ] = useState<number>();
    const [ currentEventType, setCurrentEventType ] = useState<string>();
    
    useEffect(()=>{

        var yrsArr:number[] = [];
        var evtTypesArr:string[] = [];

        var yearsArr = [];
        var eventTypesArr = [];
        
        for ( let i = 0; i < data.length; i++ ) {
            const it = data[i];
            if ( evtTypesArr.includes(it.eventType) == false){
                evtTypesArr.push(it.eventType);
                eventTypesArr.push({ value: it.eventType, label: it.eventType} );
            }
            if ( yrsArr.includes(it.year) == false ){
                yrsArr.push(it.year);
                yearsArr.push( { value: it.year, label: it.year })
            }
        }

        setYears( yearsArr );
        setEventTypes(eventTypesArr);



        data.sort( (a, b) => { 
            if ( a.serviceDate > b.serviceDate )  return 0;  
            return 1;
        });
        years.sort( (a,b) => {
            if ( a>b ) return 0;
            return 1;
        });
        setCurrentYear(years[0]);
        setCurrentEventType(eventTypes[0]);

    })
    return (
        <div className=" flex h-[300px] bg-white rounded-lg w-[500px] border border-primary mr-10 text-center">
            <div className="flex flex-col carHead mx-6 my-3 font-semibold">
                <p className=" text-xl">Timeline Event</p>
                <div className="flex space-between">
                </div>
            </div>
            {/* potukonga bro single smilula onnukonna otuvom { " " } { catVal } */}
        </div>
  )
}

export default Carousal;