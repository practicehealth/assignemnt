import './home.css'
import {  useNavigate } from 'react-router-dom'
import condition from '../../icons/conditionpng.png'
import connection from '../../icons/connection.png'
import allergy from '../../icons/allergy.png'
import mask from '../../icons/mask.png'
import building from '../../icons/office-building.png'
import medicine from '../../icons/pill.png'


export const Home = () => {
    const navigate=useNavigate();
    const data=()=>{
        navigate('/data')
    }
    return (
        <div className="main">
            <div className="home">
                <div className="boxes">
                    <div className="box" onClick={()=>{data()}}>
                        <img src={condition} alt="" style={{
                            filter: "invert(14%) sepia(73%) saturate(3585%) hue-rotate(353deg) brightness(96%) contrast(80%)",
                        }} />
                        <h5>Condition</h5>
                    </div>
                    <div className="box">
                        <img src={building} alt="" style={{
                            filter: "invert(67%) sepia(57%) saturate(614%) hue-rotate(9deg) brightness(90%) contrast(88%)",
                        }} />
                        <h5>Objervation</h5>
                    </div>
                    <div className="box">
                        <img src={connection} alt="" style={{
                            filter: "invert(63%) sepia(72%) saturate(468%) hue-rotate(112deg) brightness(87%) contrast(89%)",
                        }} />
                        <h5>Procedure</h5>
                    </div>
                </div>
                <div className="boxes">
                    <div className="box">
                        <img src={allergy} alt="" style={{
                            filter: "invert(52%) sepia(84%) saturate(1486%) hue-rotate(82deg) brightness(95%) contrast(90%)",
                        }} />
                        <h5>Allergies</h5>
                    </div>
                    <div className="box">
                        <img src={mask} alt="" style={{
                            filter: "invert(61%) sepia(90%) saturate(412%) hue-rotate(88deg) brightness(96%) contrast(86%)",
                        }} />
                        <h5>Immunization</h5>
                    </div>
                    <div className="box">
                        <img src={medicine} alt="" style={{
                            filter: "invert(63%) sepia(72%) saturate(468%) hue-rotate(112deg) brightness(87%) contrast(89%)",
                        }} />
                        <h5>Medication</h5>
                    </div>
                </div>
                <div className="part2-caledr">
                    <div className="timeline">
                        <h1>Timeline Event</h1>
                        <div className="cal">
                            <button>2023 <span>⬇</span></button>
                            <button>Event type<span>⬇</span></button>

                        </div>
                        <div className="cal-part">
                            <div className="calender">
                                <div className="year">
                                    <h2 >2023</h2>
                                </div>
                                <div className="month">
                                    <h3 >July</h3>
                                </div>
                                <div className="date">
                                    <h5 >12th  Wed</h5>
                                </div>

                            </div>
                            <div className="status">
                                <h2>Clinic Visit</h2>
                            </div>

                        </div>

                        <div className="clinicname">
                            <h1>Alexandra Claire Hobson</h1>
                            <h1>UCSF Cancer Radiology MRI</h1>
                        </div>

                        <div className="status-type">
                            <div className="clinic-status">
                                <span>Status</span>
                                <h1>Finished</h1>

                            </div>
                            <div className="type">
                                <span>Type</span>
                                <h1>Outpatient</h1>
                            </div>

                        </div>


                    </div>

                </div>
            </div>
        </div>
    )





}