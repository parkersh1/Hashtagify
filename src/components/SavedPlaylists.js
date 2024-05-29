import React, { useEffect, useState } from 'react';
import { ref, onValue } from 'firebase/database';
import { database, auth } from '../firebaseConfig';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Spotify } from 'react-spotify-embed';

function SavedPlaylists() {
    const [savedPlaylists, setSavedPlaylists] = useState([]);
    const [user] = useAuthState(auth);

    useEffect(() => {
        if (user) {
            const savedRef = ref(database, `users/${user.uid}/savedPlaylists`);
            onValue(savedRef, (snapshot) => {
                const data = snapshot.val() || {};
                setSavedPlaylists(Object.keys(data)); // Assume keys are playlist IDs
            });
        }
    }, [user]);

    return (
        <div className="all-playlists-container">
            {savedPlaylists.map((id) => (
                <div key={id} className="playlist-card">
                    <Spotify link={`https://open.spotify.com/playlist/${id}`} />
                </div>
            ))}
        </div>
    );
}

export default SavedPlaylists;
