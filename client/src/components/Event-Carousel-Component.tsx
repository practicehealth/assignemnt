import { Carousel } from '@mantine/carousel';
import { rem } from '@mantine/core';
import { Select } from "@mantine/core";
import "../styles/Event-Carousel-styles.scss"
import { useMyContext } from '../context/mainContext';
import { useEffect, useState } from "react";
import {toast} from "react-toastify";
type strObj = { [key: string]: string }

const getMonth: strObj = {
    "01": "January",
    "02": "February",
    "03": "March",
    "04": "April",
    "05": "May",
    "06": "June",
    "07": "July",
    "08": "August",
    "09": "September",
    "10": "October",
    "11": "November",
    "12": "December"
}
interface CardProps {
    "cost": string,
    "eventHeader": string,
    "eventType": string,
    "facility": string,
    "provider": string,
    "reference": number,
    "references": Array<number>,
    "resourceType": string,
    "serviceDate": string,
    "year": number,
}

interface EventInterface {
    "cost": string,
    "eventHeader": string,
    "eventType": string,
    "facility": string,
    "provider": string,
    "reference": number,
    "references": Array<number>,
    "resourceType": string,
    "serviceDate": string,
    "year": number,
}

const EventCarousel = () => {
    const [eventData, setEventData] = useState<Array<EventInterface>>([]);
    const { getDataOfEvents, year, event } = useMyContext();

    useEffect(() => {
        (async function getData() {
            const data: any = await getDataOfEvents(event, year)
            setEventData(data);
        })()
    }, [year, event])


    const slides = eventData.map((item, index) => (
        <Carousel.Slide key={index}>
            <CustomCard {...item} />
        </Carousel.Slide>
    ));

    return (
        <div className="carousel-section">
            <Carousel
                className='carousel-card'
                slideSize="100%"
                breakpoints={[{ maxWidth: 'sm', slideSize: '50%', slideGap: rem(2) }]}
                slideGap="xl"
                align="start"
                slidesToScroll={1}
            >
                {slides}
            </Carousel>
        </div>
    );
}


export default EventCarousel;



const CustomCard = ({ eventType, eventHeader, serviceDate, provider, resourceType, facility , references}: CardProps) => {
   
    const getReferencesHandler = ( ) =>{
     if(references.length === 0) {
        console.log(references)
        toast.error("There are not reference avaiable for this event.",{
            position : 'top-center',
            autoClose : 1500 ,
        })
     }
    }
   
    const { setEvent, setYear, year, event } = useMyContext();
    return (
        <div onClick={getReferencesHandler} className="custom-card">
            <h2>{eventType.toUpperCase()}</h2>
            <div className="event-year-adjust">
                <Select
                    onChange={(e) => setYear(e)}
                    w={200}
                    defaultValue={year}
                    label="Year"
                    placeholder="Select Year of event"
                    data={["2023", "2022", "2021", "2020"]}
                />
                <Select
                    defaultValue={event}
                    onChange={(e) => setEvent(e)}
                    w={200}
                    label="Event Type"
                    placeholder="Select type of event."
                    data={["coverage", "office", "hospital", "medications"]}
                />
            </div>
            <div className="break-line"></div>
            <div className="base-card-info">
                <div className="date-info-section">
                    <div className="card-date">
                        <span>{serviceDate.slice(0, 4)}</span>
                        <p>{getMonth[serviceDate.slice(5, 7)]}</p>
                        <p>{serviceDate.slice(8, 10)}</p>
                    </div>
                    <h2>{eventHeader.toUpperCase()}</h2>
                </div>
                <div className="appointment-info">
                    <h2>{provider.toUpperCase()}</h2>
                </div>
                <div className="status-type-info">
                    <section className="status">
                        <span>Facility</span>
                        <h3>{facility.toUpperCase()}</h3>
                    </section>
                    <section className="type">
                        <span>Type</span>
                        <h3>{resourceType}</h3>
                    </section>
                </div>
            </div>
        </div>
    )
}