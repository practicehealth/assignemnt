import {FC} from 'react'
import HealthCard from './Card-component'
import "../styles/Home-styles.scss";
import EventCarousel from './Event-Carousel-Component';
const Home:FC = () => {
  return (
    <div className='home-component'>
      <HealthCard/>
      <EventCarousel/>
    </div>
  )
}

export default Home