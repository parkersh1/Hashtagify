import React, { useEffect, useState } from 'react';
import { ref, onValue } from 'firebase/database';
import { database } from '../firebaseConfig';
import { Spotify } from 'react-spotify-embed';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation

function AllPlaylists() {
    const [playlists, setPlaylists] = useState([]);
    const navigate = useNavigate(); // Initialize navigate function

    useEffect(() => {
        const playlistsRef = ref(database, 'events');
        onValue(playlistsRef, (snapshot) => {
            const data = snapshot.val() || {};
            setPlaylists(Object.values(data));
        });
    }, []);

    const handleTagClick = (tag) => {
        navigate(`/result?tag=${encodeURIComponent(tag)}`);
    };

    return (
        <div className="all-playlists-container">
            {playlists.map((playlist, index) => (
                <div key={index} className="playlist-card">
                    <Spotify link={playlist.link} />
                    <div className="tags-container">
                        {playlist.tags.split(',').map((tag, idx) => (
                            <a href="#/" className="tag-link" onClick={(e) => { e.preventDefault(); handleTagClick(tag.trim()); }} key={idx}>
                                #{tag.trim().replace(/\s+/g, '_')}
                            </a>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
}

export default AllPlaylists;
