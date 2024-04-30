import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import DetailedConcertCard from './DetailedConcertCard';
import mockReviews from '../data/mock_reviews.json';

const Infopage = (props) => {
    const { concertTitle } = useParams();
    const concert = props.concertData.find(event => decodeURIComponent(event.event_title) === decodeURIComponent(concertTitle));
    const [initialReviews, setInitialReviews] = useState([]);
    const [displayReviews, setDisplayReviews] = useState([]);
    const [sortOption, setSortOption] = useState('date');

    useEffect(() => {
        const selectRandomReviews = () => {
            let shuffled = [...mockReviews].sort(() => 0.5 - Math.random());
            return shuffled.slice(0, 5);
        };

        if (!initialReviews.length || concertTitle !== concert?.event_title) {
            const randomReviews = selectRandomReviews();
            setInitialReviews(randomReviews);
            setDisplayReviews(randomReviews);
        }
    }, [concertTitle, concert?.event_title]);

    useEffect(() => {
        const sortedReviews = [...initialReviews].sort((a, b) => {
            if (sortOption === 'rating') {
                return b.rating - a.rating || new Date(a.date) - new Date(b.date);
            } else {
                return new Date(a.date) - new Date(b.date);
            }
        });

        setDisplayReviews(sortedReviews);
    }, [sortOption, initialReviews]);

    const renderStars = (rating) => "★".repeat(rating) + "☆".repeat(5 - rating);

    const reviewElements = displayReviews.map((review) => (
        <div className="review-card" key={review.id}>
            <div className="review-content">
                <div className="review-author">
                    {review.username} on {review.author} {review.date} {renderStars(review.rating)}
                </div>
                <div className="review-text">{review.text}</div>
            </div>
        </div>
    ));

    return (
        <div>
            <header>
                <DetailedConcertCard concert={concert} />
            </header>
            <main>
                <div className="sort-opt">
                    <label htmlFor="sort">Sort reviews by:</label>
                    <select id="sort" value={sortOption} onChange={(e) => setSortOption(e.target.value)}>
                        <option value="date">Date</option>
                        <option value="rating">Rating</option>
                    </select>
                </div>
                <div className="reviews-layout">
                    {reviewElements}
                </div>
            </main>
        </div>
    );
};

export default Infopage;
