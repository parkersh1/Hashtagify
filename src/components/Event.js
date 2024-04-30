import React, { useState } from 'react';
import { ref, push } from 'firebase/database'
import { database } from '../firebaseConfig';
import Popup from 'reactjs-popup';

const Concerto = () => {

  const [formData, setFormData] = useState({
    "event_title": '',
    "genre": '',
    "date": '',
    "date_day": '',
    "time": '',
    "location_name": '',
    "location_city_state": '',
    "location_address": '',
    "ticket_link": '',
    "further_details": '',
    "image": '',
  });

  const [errorMessage, setErrorMessage] = useState(null);


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newEvent = {
      "event_title": formData.event_title,
      "genre": formData.genre,
      "date": formData.date,
      "date_day": formData.date_day,
      "time": formData.time,
      "location_name": formData.location_name,
      "location_city_state": formData.location_city_state,
      "location_address": formData.location_address,
      "ticket_link": formData.ticket_link,
      "further_details": formData.further_details,
      "image": formData.image,
    };
  
    const hasEmptyField = Object.values(formData).some(value => value.trim() === '');
  
    if (hasEmptyField) {
      setErrorMessage("Please fill out all the required fields.");
      return;
    }
  
    setErrorMessage(null);

    const eventsRef = ref(database, 'events');
    push(eventsRef, newEvent).then(() => {
      console.log("Event added successfully!");
      setErrorMessage(null); 
    }).catch(error => {
      console.error("Error adding event: ", error);
      setErrorMessage("Error adding the event. Please try again.");
    });

    setFormData({
      "event_title": '',
      "genre": '',
      "date": '',
      "date_day": '',
      "time": '',
      "location_name": '',
      "location_city_state": '',
      "location_address": '',
      "ticket_link": '',
      "further_details": '',
      "image": '',
    });
  };

  return (
    <div className="information">
      <header className="event-header">
        <h1>Create Your Dream Concert</h1>
      </header>
      <main className="event-main">
        <div>
          <form onSubmit={handleSubmit} className="form-container">

            <div className="form-group">
                <h1 className='form-headers'>Artist Name:</h1>
                <label htmlFor="event_title">Artist Name</label>
                <input
                  className="input-box"
                  type="text"
                  id="event_title"
                  name="event_title"
                  placeholder="Artist name here..."
                  value={formData.event_title}
                  onChange={handleInputChange}
                />
            </div>

            <div className="form-group">
            <h1 className='form-headers'>Genre:</h1>
              <label htmlFor="genre">Genre</label>
              <input
                className="input-box"
                type="text"
                id="genre"
                name="genre"
                placeholder="Type of genre here..."
                value={formData.genre}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
            <h1 className='form-headers'>Date:</h1>
              <label htmlFor="date">Date</label>
              <input
                className="input-box"
                type="text"
                id="date"
                name="date"
                placeholder="Month Day eg. January 24"
                value={formData.date}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
            <h1 className='form-headers'>Day of Week:</h1>
              <label htmlFor="date_day">Date Day</label>
              <input
                className="input-box"
                type="text"
                id="date_day"
                name="date_day"
                placeholder="E.g. Saturday"
                value={formData.date_day}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
            <h1 className='form-headers'>Time:</h1>
              <label htmlFor="time">Time</label>
              <input
                className="input-box"
                type="text"
                id="time"
                name="time"
                placeholder="E.g 8:00pm"
                value={formData.time}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
            <h1 className='form-headers'>Venue:</h1>
              <label htmlFor="location_name">Venue</label>
              <input
                className="input-box"
                type="text"
                id="location_name"
                name="location_name"
                placeholder="Climate Pledge Arena"
                value={formData.location_name}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
            <h1 className='form-headers'>Location City/State:</h1>
              <label htmlFor="location_city_state">Location</label>
              <input
                className="input-box"
                type="text"
                id="location_city_state"
                name="location_city_state"
                placeholder="City and State e.g Seattle, WA"
                value={formData.location_city_state}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
            <h1 className='form-headers'>Location Address:</h1>
              <label htmlFor="location_address">Address</label>
              <input
                className="input-box"
                type="text"
                id="location_address"
                name="location_address"
                placeholder="334 1st Ave N, Seattle, WA 98109"
                value={formData.location_address}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
            <h1 className='form-headers'>Link to Ticket Sales:</h1>
              <label htmlFor="ticket_link">Link</label>
              <input
                className="input-box"
                type="text"
                id="ticket_link"
                name="ticket_link"
                placeholder="Link to ticket sales here..."
                value={formData.ticket_link}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
            <h1 className='form-headers'>Details:</h1>
              <label htmlFor="further_details">Further Details</label>
              <textarea
                className="larger-input-box"
                id="further_details"
                name="further_details"
                placeholder="Enter event details here..."
                value={formData.further_details}
                onChange={handleInputChange}
              ></textarea>
            </div>

            <div className="form-group">
            <h1 className='form-headers'>Image URL:</h1>
              <label htmlFor="image">Cover Image</label>
              <input
                className="input-box"
                type="text"
                id="image"
                name="image"
                placeholder="Link to Image URL here..."
                value={formData.image}
                onChange={handleInputChange}
              />
            </div>

            <Popup trigger={<button type="submit" className="submit-btn">Submit All</button>} modal nested>
              {(close) => (
              <div className='modal'>
                <div className='modal-content'>
                  {errorMessage ? (
                    <p className="error-message">{errorMessage}</p>
                  ) : (
                    <p>You Have Successfully Created Your Dream Concert!</p>
                  )}
                </div>
                <div className="modal-content">
                  <button onClick={() => close()} className="larger-modal-btn">Close</button>
                </div>
              </div>
              )}
            </Popup>
          </form>
        </div>
      </main>
    </div>
  );
};

export default Concerto;