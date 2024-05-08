import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { SearchBarForResult } from './SearchBar';
import { Card } from './Card';
import { Link } from 'react-router-dom';

const Result = (props) => {
    const { concertData } = props;
    const location = useLocation();
    const [filteredData, setFilteredData] = useState([]);
    const [selectedGenre, setSelectedGenre] = useState('');
    const [cityName, setCityName] = useState('');

    useEffect(() => {
        const searchParams = location.state ? location.state.searchParams : { city: '', artistEventVenue: '' };
    
        let filtered = concertData || []; // Ensure concertData is an array even if it's undefined
        
        // Update the filter logic to match the available properties
        if (searchParams.artistEventVenue) {
            filtered = filtered.filter((event) => {
                const titleMatch = event.tags ? 
                                   event.tags.toLowerCase().includes(searchParams.artistEventVenue.toLowerCase()) : 
                                   true;
                return titleMatch;
            });
        }
    
        setFilteredData(filtered);
    
    }, [concertData, location.state]);
    

    const handleGenreClick = (genre) => {
        if (genre === selectedGenre) {
            setSelectedGenre('');
            setFilteredData(concertData);
        } else {
            setSelectedGenre(genre);
            const filteredByGenre = concertData.filter((concertEvent) => 
                genre ? concertEvent.genre.toLowerCase() === genre.toLowerCase(): true);
            setFilteredData(filteredByGenre);
        }
    };

    const categoriesElement = <div className="categories">
                                {['R&B', 'Pop', 'Alternative/Indie', 'Hip-Hop/Rap', 'Rock', 'Alternative/Pop', 'Metal'].map((genre, index) => (
                                <button
                                    key={index}
                                    onClick={() => handleGenreClick(genre)}
                                    className={`category-button ${selectedGenre === genre ? 'active' : ''}`}
                                >
                                    {genre}
                                </button>
                                ))}
                              </div>

    const resultList = filteredData.length > 0 ? (
                            <div className="event-list">
                                {filteredData.map((event, index) => (
                                    <div key={index} className="event-info">
                                        <p className="date">{event.date}</p>
                                        <p className="details">{event.event_title} - {event.location_name}</p>
                                        <Link to={`/Infopage/${encodeURIComponent(event.event_title)}`}>
                                            <button className="info-btn">More info</button>
                                        </Link>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="event-info">
                                <p className="no-result">No Events Found</p>
                            </div>
                        )

    return (
        <div>
            <header>
                <SearchBarForResult />
            </header>
            <main>
                <section className="feature-1">
                    <h1>Discover New Favorites</h1>
                    <Card concertData={concertData}/>
                </section>

                <section className="category-filter">
                    <h1>Genre Categories</h1>
                    {categoriesElement}
                </section>

                <section className="Event">
                    <h1>Events In <span>{cityName}</span></h1>
                </section>

                <section>
                    {resultList}
                </section>
            </main>
        </div>
    );
};

export default Result;