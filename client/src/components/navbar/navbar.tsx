import './navbar.css'
import bellicon from '../../icons/bellicon.png'
import darkmode from '../../icons/darkmode.png'

export const Navbar=()=>{
    return (
<div id="navbar">
<div className="navbar-logo"> 
SK
</div>
<div className="companyname">SpotLight</div>
<div className="localicon">
    <img src={bellicon} alt="bellicon" />
    <img src={darkmode} alt="darkmode" />
</div>

</div>



    )
}