import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { SearchBar} from './SearchBar';
import { Card } from './Card';
import { Link } from 'react-router-dom';

const Result = (props) => {
    const { concertData } = props;
    const location = useLocation();
    const [filteredData, setFilteredData] = useState([]);

    useEffect(() => {
        const searchParams = location.state ? location.state.searchParams : { artistEventVenue: '' };
    
        let filtered = concertData || []; // Ensure concertData is an array even if it's undefined
        
        if (searchParams.artistEventVenue) {
            filtered = filtered.filter(event => {
                const tagsArray = event.tags.split(',').map(tag => tag.trim().toLowerCase()); // Split and trim tags
                return tagsArray.some(tag => tag.includes(searchParams.artistEventVenue.toLowerCase()));
            });
        }
    
        setFilteredData(filtered);
    
    }, [concertData, location.state]);

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
                <div className="motto">
                    <div className="searchbar">
                        <SearchBar />
                    </div>
                </div>
            </header>
            <main>
                <section className="column-1">
                    <h1>Results</h1>
                    <Card concertData={concertData}/>
                </section>

                <section>
                    {resultList}
                </section>
            </main>
        </div>
    );
};

export default Result;