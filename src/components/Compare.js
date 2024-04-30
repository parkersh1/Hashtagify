import React from 'react';
import { useNavigate } from 'react-router-dom';

function TableContent({ props }) {
    return (
        <table className="compare-table">
            <thead>
                <tr>
                    <th></th>
                    {props.selectedSongs.map((song, index) => (
                        <th key={index}><img src={song.imageUrl} alt={song.artist} /></th>
                    ))}
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>Artist</td>
                    {props.selectedSongs.map((song, index) => <td key={index}>{song.artist}</td>)}
                </tr>
                <tr>
                    <td>Title</td>
                    {props.selectedSongs.map((song, index) => <td key={index}>{song.title}</td>)}
                </tr>
                <tr>
                    <td>Peak Rank</td>
                    {props.selectedSongs.map((song, index) => <td key={index}>{song.peak_rank}</td>)}
                </tr>
                <tr>
                    <td>Weeks on Chart</td>
                    {props.selectedSongs.map((song, index) => <td key={index}>{song.weeks_on_chart}</td>)}
                </tr>
                <tr>
                    <td>Rank</td>
                    {props.selectedSongs.map((song, index) => <td key={index}>{song.rank}</td>)}
                </tr>
            </tbody>
        </table>
    )
}

function DisplayStatus({ props }) {
    if (props.selectedSongs.length === 2) {
        return <TableContent props={props} />;
    }
}

function Compare(props) {
    let navigate = useNavigate();

    function handleClick(event) {
        event.preventDefault();
        navigate("/select");
    }

    return (
        <div>
            <h2>Compare two of your favorite songs!</h2>
            <div className="compare-content">
                <DisplayStatus props={props} />
                <button type="button" onClick={handleClick}>Choose Songs</button>
            </div>
        </div>
    );
}

export default Compare;