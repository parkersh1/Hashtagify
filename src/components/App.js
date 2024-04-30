import React, { useEffect, useState } from 'react';

import Home from './Home.js';
import Header from './Header.js'
import Playlist from './Playlist.js';
import Ratings from './Ratings.js';
import Compare from './Compare.js';
import About from './About.js';
import Select from './Select.js'
import PlaylistSelect from './PlaylistSelect.js';
import Error from './Error.js';

import { Route, Routes } from 'react-router-dom';
import { onValue, ref } from 'firebase/database';


function App({ database }) {
  const [topHits, setTopHits] = useState([]);

  useEffect(() => {
    const topHitsRef = ref(database, 'data');

    onValue(topHitsRef, (snapshot) => {
      const data = snapshot.val();

      if (data) {
        const hits = Object.values(data).map(song => ({
          rank: song.rank,
          imageUrl: song.image,
          artist: song.artist,
          title: song.name,
          peak_rank: song.peak_rank,
          weeks_on_chart: song.weeks_on_chart
        }));
        setTopHits(hits);
      }
    })
  }, [database]);


  // for compare
  const [selectedSongs, setSelectedSongs] = useState([]);

  function onSelectionChange(song, isChecked) {
    if (isChecked) {
      if (selectedSongs.length < 2) {
        setSelectedSongs(prev => [...prev, song]);
      }
    } else {
      setSelectedSongs(prev => prev.filter(s => s.rank !== song.rank));
    }
  };

  // For playlist
  const [selectedSongsPlaylist, setSelectedSongsPlaylist] = useState([]);
  const [uploadedSongs, setUploadedSongs] = useState([]);

  function onSelectionChangePlaylist(song, isChecked) {
    if (isChecked) {
      const songWithId = song.id ? song : { ...song, id: Date.now() };
      setSelectedSongsPlaylist(prev => [...prev, songWithId]);
    } else {
      setSelectedSongsPlaylist(prev => prev.filter(s => s.rank !== song.rank));
    }
  };

  return (
    <div>
      <Header />

      <div className="page-container">
        <div className="content-wrap">
          <main>
            <Routes>
              <Route index element={<Home hits={topHits} />} />
              <Route path="playlist" element={<Playlist uploadedSongs={uploadedSongs} setUploadedSongs={setUploadedSongs} selectedSongsPlaylist={selectedSongsPlaylist} setSelectedSongsPlaylist={setSelectedSongsPlaylist} />} />
              <Route path="playlistselect" element={<PlaylistSelect hits={topHits} selectedSongsPlaylist={selectedSongsPlaylist} onSelectionChangePlaylist={onSelectionChangePlaylist} />} />
              <Route path="ratings" element={<Ratings hits={topHits} database={database} />} />
              <Route path="compare" element={<Compare selectedSongs={selectedSongs} />} />
              <Route path="select" element={<Select hits={topHits} selectedSongs={selectedSongs} setSelectedSongs={setSelectedSongs} onSelectionChange={onSelectionChange} />} />
              <Route path="about" element={<About />} />
              <Route path="*" element={<Error />} />
            </Routes>
          </main>
        </div>
        <footer className="footer-pin">
          <p>&copy; 2024 Billboard Media, LLC. All Rights Reserved.</p>
        </footer>
      </div>
    </div>
  );
}

export default App;