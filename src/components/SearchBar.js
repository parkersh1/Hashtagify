import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export function SearchBar() {
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useState({ city: '', artistEventVenue: '' });
    const [errorMessage, setErrorMessage] = useState('');

    const defaultPlaceholder = "Type artist, event, or venue here...";
    const errorPlaceholder = errorMessage || defaultPlaceholder;

    const handleSubmit = (event) => {
        event.preventDefault();
        if (!searchParams.city.trim() && !searchParams.artistEventVenue.trim()) {
            setErrorMessage("Please enter a city or search by artist, event, or venue.");
            return;
        }
        setErrorMessage('');
        navigate('/Result', { state: { searchParams } });
    };

    const handleChange = (event) => {
        setSearchParams({
            ...searchParams,
            [event.target.name]: event.target.value,
        });
    };

    const inputClass = errorMessage ? "search-2 error-placeholder" : "search-2";

    return (
        <div>
            <form id="search-bar-form" onSubmit={handleSubmit}>
                <label htmlFor="city-zip-code">Type city here...</label>
                <input type="text" name="city" placeholder="Type city here..." onChange={handleChange} value={searchParams.city} />

                <label htmlFor="search-artist-event-venue">Type artist, event, or venue here...</label>
                <input
                    name="artistEventVenue" 
                    className={inputClass}
                    type="text" 
                    placeholder={errorPlaceholder} 
                    onChange={handleChange} value={searchParams.artistEventVenue} />               
                <button type="submit">Search</button>
            </form>
        </div>
    );
}

export function SearchBarForResult() {
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useState({ city: '', artistEventVenue: '' });
    const [errorMessage, setErrorMessage] = useState('');

    const defaultPlaceholder = "Type artist, event, or venue here...";
    const errorPlaceholder = errorMessage || defaultPlaceholder;

    const handleSubmit = (event) => {
        event.preventDefault();
        if (!searchParams.city.trim() && !searchParams.artistEventVenue.trim()) {
            setErrorMessage("Please enter a city or search by artist, event, or venue.");
            return;
        }
        setErrorMessage('');
        navigate('/Result', { state: { searchParams } });
    };

    const handleChange = (event) => {
        setSearchParams({
            ...searchParams,
            [event.target.name]: event.target.value,
        });
    };

    const inputClass = errorMessage ? "search-result error-placeholder" : "search-result";

    return (
        <div className="searchbar-result">
            <form id="search-bar-form" onSubmit={handleSubmit}>
                <label htmlFor="location">Type city here...</label>
                <input type="text" name="city" className="text-result" placeholder="Type city here..." onChange={handleChange} value={searchParams.city} />
                <label htmlFor="search-result">Type artist, event, or venue here...</label>
                <input 
                    className={inputClass}
                    type="text" 
                    name="artistEventVenue" 
                    placeholder={errorPlaceholder}
                    onChange={handleChange} value={searchParams.artistEventVenue}/>

                <button type="submit">Search</button>
            </form>
        </div>
    );
}