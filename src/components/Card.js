import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Spotify } from 'react-spotify-embed';

function convertTagsToHashtags(tagsString, handleClick) {
    return (
        <div className="tags-container">
            {tagsString.split(',').map((tag, index) => (
                <a href="#/" className="tag-link" onClick={(e) => { e.preventDefault(); handleClick(tag.trim()); }} key={index}>
                    #{tag.trim().replace(/\s+/g, '_')}
                </a>
            ))}
        </div>
    );
}

export function Card(props) {
    const { concertData } = props;
    const [recommendations, setRecommendations] = useState([]);
    const [current, setCurrent] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        if (concertData && concertData.length > 0) {
            const shuffledConcerts = [...concertData].sort(() => 0.5 - Math.random());
            setRecommendations(shuffledConcerts);
        }
    }, [concertData]);

    const handleTagClick = (tag) => {
        navigate(`/result?tag=${encodeURIComponent(tag)}`);
    };

    const next = () => {
        let newCurrent = current + 4;
        if (newCurrent >= recommendations.length) {
            newCurrent = 0; // Wraps to the start if we run out of items
        }
        setCurrent(newCurrent);
    };

    const prev = () => {
        let newCurrent = current - 4;
        if (newCurrent < 0) {
            newCurrent = Math.max(0, recommendations.length - 4); // Wraps to the end or stays at 0
        }
        setCurrent(newCurrent);
    };

    const displayCards = () => {
        return recommendations.slice(current, current + 4).map((card, index) => (
            <div key={index} className="card">
                <p className="link"><Spotify link={card.link} /></p>
                {convertTagsToHashtags(card.tags, handleTagClick)}
            </div>
        ));
    };

    return (
        <section className="column-2">
            <div className="section-2-container">
                <img className="arrow" src="/img/left-arrow.png" alt="Left arrow" onClick={prev} />
                {displayCards()}
                <img className="arrow" src="/img/right-arrow.png" alt="Right arrow" onClick={next} />
            </div>
        </section>
    );
}
