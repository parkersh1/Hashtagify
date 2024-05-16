import React, { useEffect, useState } from 'react';
import { ref, onValue } from 'firebase/database';
import { database } from '../firebaseConfig';
import { Spotify } from 'react-spotify-embed';

function AllPlaylists() {
    const [playlists, setPlaylists] = useState([]);

    useEffect(() => {
        const playlistsRef = ref(database, 'events');
        onValue(playlistsRef, (snapshot) => {
            const data = snapshot.val() || {};
            setPlaylists(Object.values(data));
        });
    }, []);

    return (
        <div className="all-playlists-container">
            {playlists.map((playlist, index) => (
                <div key={index} className="playlist-card" style={{ width: '25%' }}>
                    <Spotify link={playlist.link} />
                    <p>{playlist.tags.split(',').map(tag => `#${tag.trim()}`).join(' ')}</p>
                </div>
            ))}
        </div>
    );
}

export default AllPlaylists;
