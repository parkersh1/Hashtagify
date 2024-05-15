import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getAuth, signOut, onAuthStateChanged } from 'firebase/auth';

function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsLoggedIn(!!user);
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

  return (
    <nav className="top-nav">
      <div className="logo" onClick={handleHomeClick} style={{ cursor: 'pointer' }}>
        Hashtagify
      </div>
      <div className="navbar-links">
        <button onClick={handleHomeClick} className="navbar-button">Home</button>
        {isLoggedIn && (
          <>
            <Link to="/event" className="navbar-button">Upload Playlist</Link>
            <button onClick={handleLogout} className="navbar-button">Logout</button>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
