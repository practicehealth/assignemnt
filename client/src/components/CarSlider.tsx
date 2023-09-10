import { Timeline } from "../../types"
import Calender from "./Calender";
import { Icons } from "./Icons"

function CarSlider( { data, currIndex, moveIndex, showCarModal }: {data:Timeline[], currIndex: number, moveIndex: Function, showCarModal: Function } ) {
  
    
    
    
  
    const LeftIcon = Icons['leftMove'];
    const RightIcon = Icons['rightMove'];

    const currItem = data[currIndex];
    console.log(currItem);
    
    return (
        <div className="flex flex-1 justify-between items-center mb-4">
            <LeftIcon className={ "" + (currIndex>=1)?"cursor-pointer":"cursor-not-allowed" } onClick={ () => moveIndex(-1)  } />
            {/* <div>{currItem.serviceDate.toDateString}</div> */}
            <div className="flex flex-1 flex-col h-full justify-between py-4  px-4">
                <div className="sec1 flex justify-between items-center text-center pr-10 cursor-pointer" onClick={ () => showCarModal(currItem) }>
                    <Calender data={currItem.serviceDate} />
                    <p className="text-lg font-medium">{ currItem.eventHeader }</p>
                </div>
                <div className="sec2 flex flex-col ">
                    <p>{currItem.provider}</p>
                    <p className="font-medium text-neutral-600">{currItem.facility}</p>
                </div>
                <div className="sec3 flex justify-between items-center ">
                    <div className="flex flex-col items-center">
                        <p className=" text-sm text-neutral-600 mb-1">Status</p>
                        <p className=" text-lg">Finished</p>
                    </div>
                    <div className="flex flex-col items-center ">
                        <p className=" text-sm text-neutral-600 mb-1">Type</p>
                        <p className=" text-lg">Outpatient</p>
                    </div>
                </div>
            </div>
            <RightIcon className={ "" + (currIndex<data.length-1)?"cursor-pointer":"cursor-not-allowed" } onClick={ () => moveIndex(+1 )  } />
        </div>
    )
}

export default CarSlider