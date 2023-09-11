// src/components/Homepage.tsx
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCardData } from './CardDataContext';
import { useEventData } from './EventDataContext';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../styles.css";
import axios from 'axios';

interface User {
  name?: string;
  // Add other user properties as needed
}

interface Event {
  id: string;
  year: string;
  month: string;
  date: string;
  day: string;
  eventType: string;
  provider: string;
  eventHeader: string;
  status?: string;
  facility: string,
  references: Array<number>,
  reference: number,
  serviceDate: string,
  resourceType: string,
  cost: string,
}

function Homepage() {
  const navigate = useNavigate();
  const cardContext = useCardData();
  const eventContext = useEventData();
  const [user, setUser] = useState<User>({});
  const [distinctYears, setDistinctYears] = useState<string[]>([]);
  const [distinctEventType, setDistinctEventType] = useState<string[]>([]);
  const [selectedYear, setSelectedYear] = useState<string>("");
  const [selectedEventType, setSelectedEventType] = useState<string>("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const sliderSettings = {
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    prevArrow: <div className="slick-prev" />,
    nextArrow: <div className="slick-next" />,
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const getToken = () => localStorage.getItem('token');
        const userData = await axios.get<User>('http://localhost:5000/user/profile', {
          headers: {
            "Authorization": `Bearer ${getToken()}`,
          }
        });
        setUser(userData.data);
        const cardsResponse = await axios.get<Record<string, string>>('http://localhost:5000/cards/cards', {
          headers: {
            "Authorization": `Bearer ${getToken()}`,
          }
        });
        cardContext.updateCardData(cardsResponse.data);
        const eventsResponse = await axios.get<{
          formattedEvents: Event[];
          distinctEventType: string[];
          distinctYears: string[];
        }>('http://localhost:5000/events/events', {
          headers: {
            "Authorization": `Bearer ${getToken()}`,
          }
        });
        eventContext.updateEventData(eventsResponse.data.formattedEvents);
        setDistinctEventType(eventsResponse.data.distinctEventType);
        setDistinctYears(eventsResponse.data.distinctYears);

      } catch (error) {
        localStorage.removeItem('token');
        console.error(error);
        navigate('/login');
      }
    }

    fetchData();
  }, []);

  const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = event.target;
    if (name === "year") {
      setSelectedYear(value);
    } else if (name === "eventType") {
      setSelectedEventType(value);
    }
  };

  // Filter the timeline data based on selected filters
  const filteredData = eventContext.eventData.filter((event) => {
    const yearMatch = selectedYear === "" || event.year === selectedYear;
    const eventTypeMatch = selectedEventType === "" || event.eventType === selectedEventType;
    return yearMatch && eventTypeMatch;
  });

  const handleUserIconClick = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    // Perform logout actions here, e.g., remove token and navigate to the login page
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className="homepage main-content" >
      <header className="bg-white p-4 text-black flex justify-between items-center">
        {/* Top-left user icon */}
        <div className='relative'>
          <div
            onClick={handleUserIconClick} // Toggle menu when user icon is clicked
            className="bg-teal-500 w-12 h-12 flex items-center justify-center rounded-full cursor-pointer"
          >
            <span className="user-icon">
              {(user?.name?.split(' ')[0]?.[0] ?? '') ||
                ''}{(user?.name?.split(' ')[1]?.[0] ?? '') || ''}
            </span>
            {isMenuOpen && (
              // Menu content
              <div className="absolute top-6 left-12 right-4 bg-white p-2 space-y-2">
                <button onClick={handleLogout} className="w-full text-center">
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
        {/* "SpotLight" text */}
        <h1 className="text-xl font-semibold">Spot Light</h1>
        {/* Top-right icons */}
        <div className="flex items-center space-x-4">
          <i className="fas fa-bell text-2xl"></i>
          <i className="fas fa-moon text-2xl"></i>
        </div>
      </header>
      <div className="teal-border"></div>
      <main className="bg-white p-4">
        {/* Cards Section */}
        <div className="flex flex-wrap justify-between">
        {
          Object.entries(cardContext.cardData).map(([cardType, cardData]) => {
            const iconUrl = cardData.iconUrl; // Retrieve the icon URL for the card type
            return iconUrl ? (
              <Link
                key={cardType}
                to={`/card-details?resourceType=${cardType}`}
                className="bg-white w-1/3 sm:w-1/3 md:w-1/4 lg:w-1/6 h-40 sm:h-30 md:h-30 lg:h-30 p-2 m-2 rounded-lg text-center transition transform hover:scale-105 border border-teal-500"
              >
                {/* Render the icon based on cardType */}
                <div className="pt-10 icon-container flex flex-col items-center">
                  <img
                    src={iconUrl} // Use the URL provided by the backend
                    alt={cardType} // Provide a meaningful alt text
                    className="icon-image w-12 h-12" // Apply any necessary styling
                  />
                  <p className="pt-9 font-semibold text-center">{cardType}</p>
                </div>
              </Link>
            ) : null;
          })
        }
        </div>
        {/* Timeline Section */}
        <div className="mt-2 p-2 rounded-lg shadow shadow-md">
          <h2 className="text-xl font-bold mb-2">Timeline Event</h2>
          {/* Year and Event Type Filters */}
          <div className="flex justify-between">
            <select name="year" value={selectedYear} onChange={handleFilterChange} className="bg-white px-2 py-1 rounded-lg shadow shadow-md">
              <option value="">Select Year</option>
              {distinctYears.map((year) => (
                <option key={year} value={year + ""}>
                  {year}
                </option>
              ))}
            </select>
            <select name="eventType" value={selectedEventType} onChange={handleFilterChange} className="bg-white-100 px-2 py-1 rounded-lg shadow shadow-md">
              <option value="">Event Type</option>
              {distinctEventType.map((eventType) => (
                <option key={eventType} value={eventType}>
                  {eventType}
                </option>
              ))}
            </select>
          </div>
          {/* Timeline Cards (Carousel Display) */}
          <div className="mt-2 space-y-4 border-t border-gray-300"></div>
          <Slider {...sliderSettings}>
            {filteredData.map((event, index) => (
              <Link to={`/event-details?id=${event.id}`} key={index}>
                <div key={index} className="mt-2">
                  <div className='flex justify-between ml-1 mr-1'>
                    <div className="w-auto max-w-xs flex flex-col items-center space-y-1 shadow shadow-md justify-content">
                      <span className="px-9 text-base font-semibold bg-teal-300 rounded-lg whitespace-normal">{event.year}</span>
                      <span className="px-4 text-lg font-bold whitespace-normal">{event.month}</span>
                      <span className="px-4 text-base font-bold whitespace-normal">{event.date}th {event.day}</span>
                    </div>
                    <div>
                      <span className='text-xl font-bold'>{event.eventType}</span>
                    </div>
                  </div>
                  <div className='flex flex-col items-center mt-2'>
                    <p className='mt-2'>{event.provider}</p>
                    <p className="font-semibold mt-2">{event.eventHeader}</p>
                  </div>
                  <div className="flex justify-between mt-2 ml-5 mr-5">
                    <p className='text-gray-500'>Status</p>
                    <p className='text-gray-500'>Type</p>
                  </div>
                  <div className="flex justify-between mt-2">
                    <div className='w-1/2'>
                      <span className='text-lg font-bold break-all'>{(event?.status !== undefined ? event.status : "Completed")}</span>
                    </div>
                    <div>
                      <span className='text-lg font-bold break-all'>{`Explanation of benefit`}</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </Slider>
        </div>
      </main>
    </div>
  );
}

export default Homepage;
