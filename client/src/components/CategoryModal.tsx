import { MouseEventHandler, useState } from "react";
import { Icons } from "./Icons";
import { Timeline } from "../../types";
import ModalData from "./ModalData";

function CategoryModal( { isVisible, closeModal, data, catVal } : { isVisible : boolean, closeModal:MouseEventHandler, data: Timeline[], catVal:string } ) {

    const CloseButton = Icons['closeButton'];
    const SummaryIcon = Icons['summary'];
    const DataIcon = Icons['database'];
    const [ isOpt1, setIsOpt1 ] = useState(true);

    return (
        <>
        {
            isVisible &&
            <div className="fixed inset-0 bg-black bg-opacity-20 backdrop-blur-sm flex justify-center items-center">
                <div className="  w-[1200px] bg-white rounded overflow-auto">

                    {/* modalHead */}
                    <div className="modalHead flex justify-between px-4 pt-2 items-center">
                        <div className="left flex ml-2">
                            <div onClick={ () => setIsOpt1(true) } className="mr-6 w-32  text-center cursor-pointer flex items-center">
                                <p className="mr-3 rounded-lg text-sm font-semibold" >Summary</p>
                                <SummaryIcon width="18" height="18" color="#14a8b6" />
                            </div>
                            <div onClick={ () => setIsOpt1(false) } className="mr-6 w-32  text-center cursor-pointer flex items-center">
                                <p className="mr-3 rounded-lg text-sm font-semibold">Data</p>
                                <DataIcon  width="18" height="18" color="#14a8b6"/>
                            </div>
                        </div>
                        <div className="right"> 
                            <CloseButton className="cursor-pointer" width="30" height="30" fill="#14a8b6" color="white" onClick={(e) => { setIsOpt1(true); closeModal(e); }}/>
                        </div>
                    </div>
                    <div className="h-2 rounded-lg bg-neutral-200 mx-3 mb-3">
                        {
                            isOpt1 ?
                                <div className="h-2 bg-primary w-28 rounded-lg"></div> :
                                <div className="ml-36 h-2 bg-primary w-28 rounded-lg"></div> 
                        }
                    </div>
                    {/* modalHead */}

                    {/* modalBody */}
                    <div className="modalBody h-[800px] overflow-auto">
                        {
                            isOpt1?
                            <div className="px-4 py-2">
                                <p className="text-sm font-medium">
                                    You have {data.length} records of resource type {catVal }
                                </p>
                            </div>:
                            <div className="overflow-auto">
                                {
                                    data.map((it) => {
                                        return <ModalData key={it.id} data={it} />
                                    })
                                }
                            </div>
                        }
                    </div>


                </div>
            </div>
        }
        </>
    )
}

export default CategoryModal;