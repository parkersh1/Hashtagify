import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getAuth, signOut, onAuthStateChanged } from 'firebase/auth';

function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const navigate = useNavigate();
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsLoggedIn(!!user);
    }, (error) => {
      console.error('Auth State Change Error:', error);
      setIsLoggedIn(false);
    });
    return unsubscribe;
  }, [auth]);

  const handleLogout = () => {
    signOut(auth).then(() => {
      navigate('/login');
    }).catch((error) => {
      console.error('Logout Error:', error);
    });
  };

  const handleHomeClick = () => {
    if (isLoggedIn) {
      navigate('/home');
    } else {
      navigate('/login');
    }
  };

  if (isLoggedIn === null) {
    return <div>Loading...</div>;
  }

  return (
    <nav className="top-nav">
      <div className="logo" onClick={handleHomeClick} style={{ cursor: 'pointer' }} aria-label="Home">
        Hashtagify
      </div>
      <div className="navbar-links">
        <button onClick={handleHomeClick} className="navbar-button" aria-label="Home">Home</button>
        {isLoggedIn && (
          <>
            <Link to="/event" className="navbar-button" aria-label="Upload Playlist">Upload Playlist</Link>
            <button onClick={handleLogout} className="navbar-button" aria-label="Logout">Logout</button>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
