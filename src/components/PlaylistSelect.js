import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Search from './Search';

function SelectTableHead() {
  return (
    <thead>
      <tr>
        <th>Rank</th>
        <th>Artist</th>
        <th>Title</th>
        <th>Album</th>
        <th>Select</th>
      </tr>
    </thead>
  );
}

function SelectTable({ data, onSelectionChangePlaylist, selectedSongsPlaylist }) {
  function handleCheckboxChange(song, isChecked) {
    onSelectionChangePlaylist(song, isChecked);
  }

  const bodyContent = data.map((song, index) => (
    <tr key={index}>
      <td>{song.rank}</td>
      <td>{song.artist}</td>
      <td>{song.title}</td>
      <td>
        <a href={song.spotifyLink} target="_blank" rel="noopener noreferrer">
          <img src={song.imageUrl} alt={`${song.title} by ${song.artist} Album cover`} width="100" height="100" />
        </a>
      </td>
      <td>
        <input className="form-check-input" aria-label="Select to compare" type="checkbox" value={index} id={`flexCheckDefault-${index}`} onChange={(e) => handleCheckboxChange(song, e.target.checked)} checked={selectedSongsPlaylist.some(s => s.rank === song.rank)} />
      </td>
    </tr>
  ));

  return (
    <table className="select-table">
      <SelectTableHead />
      <tbody>
        {bodyContent}
      </tbody>
    </table>
  );
}

// For search
function getFilteredSongs(query, items) {
  if (!query) {
    return items;
  }
  return items.filter(song => song.title.toLowerCase().includes(query.toLowerCase()));
}

function PlaylistSelect({ hits, onSelectionChangePlaylist, selectedSongsPlaylist }) {
  // for search
  const [query, setQuery] = useState("");
  const filteredSongs = getFilteredSongs(query, hits);


  let navigate = useNavigate();

  function handleClick(event) {
    event.preventDefault();
    navigate("/playlist");
  }

  return (
    <div>
      <Search query={query} setQuery={setQuery} hits={hits} />
      <SelectTable data={filteredSongs} onSelectionChangePlaylist={onSelectionChangePlaylist} selectedSongsPlaylist={selectedSongsPlaylist} />
      <button type="button" className="btn btn-primary mb-3" onClick={handleClick}>Select</button>
    </div>
  )
}

export default PlaylistSelect;