import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export function Card(props) {
    const { concertData } = props;
    const [recommendations, setRecommendations] = useState([]);
    const [current, setCurrent] = useState(0);

    useEffect(() => {
        if (concertData && concertData.length > 0) {
            const randomlySelectRecommendations = () => {
                const shuffledConcerts = [...concertData].sort(() => Math.random() - 0.5);
                const selectedRecommendations = shuffledConcerts.slice(0, 6);
                return selectedRecommendations;
            };

            const selectedRecommendations = randomlySelectRecommendations();
            setRecommendations(selectedRecommendations);
            setCurrent(0);
        }
    }, [concertData]);

    const next = () => {
        setCurrent(current >= recommendations.length - 1 ? 0 : current + 1);
    };

    const prev = () => {
        setCurrent(current === 0 ? recommendations.length - 1 : current - 1);
    };

    const cardElements = [...recommendations, ...recommendations, ...recommendations].slice(current, current + 3).map((card, index) => (
        <div key={index} className="card">
            <img src={card.image} alt="Artist"/>
            <p className="artist">{card.event_title}</p>
            <p className="place">{card.location_name}</p>
            <p className="location">{card.location_city_state}</p>
            <p className="date">{card.date + ', ' + card.date_day}</p>
            <p className="time">{card.time}</p>
            <Link to={`/Infopage/${encodeURIComponent(card.event_title)}`}>
                <button type="button" className="card-button">More info</button>
            </Link>
        </div>
    ));

    return (
        <section className="column-2">
            <div className="section-2-container">
                <img className="arrow" src="/img/left-arrow.png" alt="left next" onClick={prev}/>
                {cardElements}
                <img className="arrow" src="/img/right-arrow.png" alt="right next" onClick={next} />
            </div>
        </section>
    );
}

