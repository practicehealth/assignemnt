import React, { useState } from 'react';
import './event.css'
const TimelineEvent = () => {
  // Dummy data for testing
  const years = [2022, 2021, 2020]; // Replace with your actual data
  const eventTypes = ['Clinic Visit', 'Appointment', 'Test', 'Procedure']; // Replace with your actual data
  const currentDate = new Date().toLocaleDateString(); // Get current date in a readable format

  // State for selected year and event type
  const [selectedYear, setSelectedYear] = useState(years[0]);
  const [selectedEventType, setSelectedEventType] = useState(eventTypes[0]);

  // Handle year dropdown change
  const handleYearChange = (e) => {
    setSelectedYear(e.target.value);
  };

  // Handle event type dropdown change
  const handleEventTypeChange = (e) => {
    setSelectedEventType(e.target.value);
  };

  return (
    <div className="timeline-event">
      <div className="dropdowns">
        <select value={selectedYear} onChange={handleYearChange}>
          {years.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
        <select value={selectedEventType} onChange={handleEventTypeChange}>
          {eventTypes.map((eventType) => (
            <option key={eventType} value={eventType}>
              {eventType}
            </option>
          ))}
        </select>
      </div>
      <div className="event-info">
        <p>Current Date: {currentDate}</p>
        <p>Event: {selectedEventType}</p>
        <p>Status: Finished</p>
        <p>Location: Outpatient</p>
      </div>
    </div>
  );
};

export default TimelineEvent;
