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
  const [successMessage, setSuccessMessage] = useState(null);

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
      setSuccessMessage(null);
    } else {
      setErrorMessage(null);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate the Spotify link
    if (!isValidSpotifyUrl(formData.link)) {
      setErrorMessage("Please enter a valid Spotify link.");
      setSuccessMessage(null);
      return;
    }

    const newEvent = {
      "link": formData.link,
      "tags": formData.tags,
    };
  
    const hasEmptyField = Object.values(formData).some(value => value.trim() === '');
  
    if (hasEmptyField) {
      setErrorMessage("Please fill out all the required fields.");
      setSuccessMessage(null);
      return;
    }
  
    setErrorMessage(null);

    const eventsRef = ref(database, 'events');
    push(eventsRef, newEvent).then(() => {
      console.log("Playlist added successfully!");
      setSuccessMessage("Playlist added successfully!");
      setErrorMessage(null); 
      setFormData({
        "link": '',
        "tags": '',
      });
    }).catch(error => {
      console.error("Error adding playlist: ", error);
      setErrorMessage("Error adding the playlist. Please try again.");
      setSuccessMessage(null);
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
                aria-label="Link to your public Spotify playlist"
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
                aria-label="Tags separated with commas"
              ></textarea>
            </div>

            <Popup trigger={<button type="submit" className="submit-btn" disabled={!!errorMessage}>Submit All</button>} modal nested>
              {close => (
                <div className='modal'>
                  <div className='modal-content'>
                    {errorMessage && <p className="error-message" aria-live="polite">{errorMessage}</p>}
                    {successMessage && <p className="success-message" aria-live="polite">{successMessage}</p>}
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
