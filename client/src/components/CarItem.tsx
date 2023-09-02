import { Timeline } from "../../types"

function CarItem( {tlItem} : { tlItem : Timeline} ) {
  


    return (
        <>
        {
            tlItem ?
                <div>{tlItem.eventType}</div>:
                <></>

        }
        </>
    )
}

export default CarItem