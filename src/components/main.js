import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { SearchBar } from './SearchBar';
import { Card } from './Card';

function Main(props) {
    const { concertData } = props;
    const [user, setUser] = useState(null);
    const navigate = useNavigate();
    const auth = getAuth();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user);
            } else {
                navigate('/login');
            }
        });
        return () => unsubscribe();
    }, [navigate, auth]);

    const handleViewAll = () => {
        navigate('/all-playlists');
    };

    return (
        <div>
            <header>
                <div className="motto">
                    <div className="searchbar">
                        <h1>Tune into your true soundtrack!</h1>
                        <SearchBar />
                    </div>
                </div>
            </header>
            <main>
                <div className="container">
                    <section className="column-1">
                        <h1>Recommended Playlists</h1>
                    </section> 
                    <Card concertData={concertData} />
                    <button onClick={handleViewAll} className="view-all-btn" style={{ backgroundColor: 'blue', color: 'white', padding: '10px 20px', borderRadius: '5px', margin: '20px auto', display: 'block' }}>View All Playlists</button>
                </div>
            </main>
        </div>
    );
}

export default Main;