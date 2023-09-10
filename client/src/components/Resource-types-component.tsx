import { useEffect, useState } from "react"
import { useMyContext } from "../context/mainContext";
import "../styles/Event-Carousel-styles.scss";
interface Result {
    resourceType: String,
    RSlength: number
}

const ResourceTypes = () => {
    const [rsData, setData] = useState<Result>({ 'resourceType': '', 'RSlength': 0 })
    const { getResourceTypeData } = useMyContext();
    useEffect(() => {
        (async function getData() {
            const data: any = await getResourceTypeData(window.location.pathname.split('/')[2]);
            setData(data);
        })()
    }, [])
    return (
        <>
            <section style={{ "height": "70vh", "width": "100vw", "maxWidth": "100%", "display": "flex", "alignItems": "center", "justifyContent": "center" }}>
                <button className="rsTypeBtn" >You have {rsData && rsData.RSlength ? rsData.RSlength : 0}  records of type : {rsData && rsData.resourceType ? rsData.resourceType.toUpperCase() : "Nodata"} </button>
            </section>
        </>
    );
}

export default ResourceTypes