import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { SearchBar } from './SearchBar';
import { Card } from './Card';

const Result = (props) => {
    const { concertData } = props;
    const location = useLocation();
    const [filteredData, setFilteredData] = useState([]);

    useEffect(() => {
        // Extract the tag from the URL query parameters
        const queryParams = new URLSearchParams(location.search);
        const tag = queryParams.get('tag');

        if (tag) {
            const searchTag = tag.toLowerCase();
            setFilteredData(concertData.filter(event => {
                const eventTags = event.tags.split(',').map(tag => tag.trim().toLowerCase());
                return eventTags.includes(searchTag); // Checks if the search tag is included in event tags
            }));
        } else {
            setFilteredData(concertData); // Default to showing all if no tag is provided
        }
    }, [concertData, location.search]); // Depend on location.search to re-run this effect when query params change

    return (
        <div>
            <header>
                <div className="motto">
                    <div className="searchbar">                                 <SearchBar />
                    </div>
                </div>
            </header>
            <main>
                <section className="column-1">
                    <h1>Results</h1>
                    <Card concertData={filteredData} />
                </section>
            </main>
        </div>
    );
};

export default Result;
