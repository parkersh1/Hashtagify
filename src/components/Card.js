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
            const randomlySelectRecommendations = () => {
                const shuffledConcerts = [...concertData].sort(() => 0.5 - Math.random());
                return shuffledConcerts.slice(0, 6);
            };

            setRecommendations(randomlySelectRecommendations());
            setCurrent(0);
        }
    }, [concertData]);

    const handleTagClick = (tag) => {
        navigate(`/result?tag=${encodeURIComponent(tag)}`);
    };

    const next = () => setCurrent(current >= recommendations.length - 4 ? 0 : current + 4);
    const prev = () => setCurrent(current === 0 ? recommendations.length - 4 : current - 4);

    const cardElements = recommendations.slice(current, current + 4).map((card, index) => (
        <div key={index} className="card">
            <p className="link"><Spotify link={card.link} /></p>
            {convertTagsToHashtags(card.tags, handleTagClick)}
        </div>
    ));

    return (
        <section className="column-2">
            <div className="section-2-container">
                <img className="arrow" src="/img/left-arrow.png" alt="Left arrow" onClick={prev} />
                {cardElements}
                <img className="arrow" src="/img/right-arrow.png" alt="Right arrow" onClick={next} />
            </div>
        </section>
    );
}