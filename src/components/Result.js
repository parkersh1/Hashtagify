import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { SearchBar } from './SearchBar'; // Ensure this imports correctly
import { Card } from './Card';
import { Link } from 'react-router-dom';

const Result = (props) => {
    const { concertData } = props; // Ensure this data includes the tags in the expected format
    const location = useLocation();
    const [filteredData, setFilteredData] = useState([]);

    useEffect(() => {
        const searchParams = location.state ? location.state.searchParams : { artistEventVenue: '' };

        if (searchParams.artistEventVenue) {
            const searchTags = searchParams.artistEventVenue.split(',').map(tag => tag.trim().toLowerCase());
            setFilteredData(concertData.filter(event => {
                const eventTags = event.tags.split(',').map(tag => tag.trim().toLowerCase());
                return searchTags.some(tag => eventTags.includes(tag)); // Checks if any search tag is included in event tags
            }));
        } else {
            setFilteredData(concertData);
        }
    }, [concertData, location.state]);

    // const resultList = filteredData.length > 0 ? (
    //     <div className="event-list">
    //         {filteredData.map((event, index) => (
    //             <div key={index} className="event-info">
    //                 <p className="date">{event.date}</p>
    //                 <p className="details">{event.event_title} - {event.location_name}</p>
    //                 {/* <Link to={`/Infopage/${encodeURIComponent(event.event_title)}`}>
    //                     {/* <button className="info-btn">More info</button> */}
    //                 </Link> */}
    //             </div>
    //         ))}
    //     </div>
    // ) : (
    //     <div className="event-info">
    //         <p className="no-result">No Events Found</p>
    //     </div>
    // );

    return (
        <div>
            <header>
                <div className="motto">
                    <SearchBar />
                </div>
            </header>
            <main>
                <section className="column-1">
                    <h1>Results</h1>
                    <Card concertData={filteredData}/>
                </section>
                {/* <section>
                    {resultList}
                </section> */}
            </main>
        </div>
    );
};

export default Result;
