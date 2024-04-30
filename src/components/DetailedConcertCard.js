import React from 'react';

const DetailedConcertCard = (props) => {
  const { concert } = props;

  if (!concert) {
    return <div>Loading...</div>; 
  }

  return (
    <div className="detailed-card">
      <div className="card-content">
        <img src={concert.image} alt="Concert" className="concert-image" />
        <div className="concert-info">
          <h2>{concert.event_title}</h2>
          <h3>Date: {concert.date}, {concert.date_day}</h3>
          <h3>Location: {concert.location_name}, {concert.location_address}, {concert.location_city_state}</h3>
          <h3>Time: {concert.time}</h3>
          <h3>Details: {concert.further_details}</h3>
        </div>
      </div>
      <a href={concert.ticket_link} target="_blank" rel="noopener noreferrer">
        <button type="button" className="find-tickets-button">Find Tickets</button>
      </a>
    </div>
  );
};

export default DetailedConcertCard;
