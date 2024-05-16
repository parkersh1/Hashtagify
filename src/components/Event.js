import React, { useState } from 'react';
import { ref, push } from 'firebase/database';
import { database } from '../firebaseConfig';
import Popup from 'reactjs-popup';

const Concerto = () => {

  const [formData, setFormData] = useState({
    "link": '',
    "tags": '',
  });

  const [errorMessage, setErrorMessage] = useState(null);

  // Function to validate Spotify URL including optional query parameters
  const isValidSpotifyUrl = (url) => {
    const pattern = /^(https?:\/\/)?(www\.)?(open\.spotify\.com)\/(track|playlist)\/([a-zA-Z0-9]+)(\?.*)?$/;
    return pattern.test(url);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (name === "link" && value && !isValidSpotifyUrl(value)) {
      setErrorMessage("Please enter a valid Spotify link.");
    } else {
      setErrorMessage(null);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate the Spotify link
    if (!isValidSpotifyUrl(formData.link)) {
      setErrorMessage("Please enter a valid Spotify link.");
      return;
    }

    const newEvent = {
      "link": formData.link,
      "tags": formData.tags,
    };
  
    const hasEmptyField = Object.values(formData).some(value => value.trim() === '');
  
    if (hasEmptyField) {
      setErrorMessage("Please fill out all the required fields.");
      return;
    }
  
    setErrorMessage(null);

    const eventsRef = ref(database, 'events');
    push(eventsRef, newEvent).then(() => {
      console.log("Playlist added successfully!");
      setErrorMessage("Playlist added successfully!"); 
      setFormData({
        "link": '',
        "tags": '',
      });
    }).catch(error => {
      console.error("Error adding playlist: ", error);
      setErrorMessage("Error adding the playlist. Please try again.");
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
                placeholder="Link to Spotify playlist here..."
                value={formData.link}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
            <h1 className='form-headers'>Tags (separate with commas):</h1>
              <label htmlFor="tags">Further Details</label>
              <textarea
                className="larger-input-box"
                id="tags"
                name="tags"
                placeholder="grunge, emo, vamp, opium..."
                value={formData.tags}
                onChange={handleInputChange}
              ></textarea>
            </div>

            <Popup trigger={<button type="submit" className="submit-btn" disabled={!!errorMessage}>Submit All</button>} modal nested>
              {close => (
                <div className='modal'>
                  <div className='modal-content'>
                    <p className="error-message">{errorMessage}</p>
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
