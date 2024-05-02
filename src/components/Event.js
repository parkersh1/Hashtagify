import React, { useState } from 'react';
import { ref, push } from 'firebase/database'
import { database } from '../firebaseConfig';
import Popup from 'reactjs-popup';

const Concerto = () => {

  const [formData, setFormData] = useState({
    "link": '',
    "further_details": '',
  });

  const [errorMessage, setErrorMessage] = useState(null);


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newEvent = {
      "link": formData.link,
      "further_details": formData.further_details,
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
      "link": '',
      "further_details": '',
    });
  };

  return (
    <div className="information">
      <header className="event-header">
        <h1>Upload your public Spotify playlist</h1>
      </header>
      <main className="event-main">
        <div>
          <form onSubmit={handleSubmit} className="form-container">

            <div className="form-group">
            <h1 className='form-headers'>Link to your public Spotify playlist:</h1>
              <label htmlFor="link">Link</label>
              <input
                className="input-box"
                type="text"
                id="link"
                name="link"
                placeholder="Link to ticket sales here..."
                value={formData.link}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
            <h1 className='form-headers'>Tags (separate with commas):</h1>
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

            <Popup trigger={<button type="submit" className="submit-btn">Submit All</button>} modal nested>
              {(close) => (
              <div className='modal'>
                <div className='modal-content'>
                  {errorMessage ? (
                    <p className="error-message">{errorMessage}</p>
                  ) : (
                    <p>You Have Successfully Uploaded your Playlist!</p>
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