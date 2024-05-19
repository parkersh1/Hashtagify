import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export function SearchBar() {
    const navigate = useNavigate();
    const [searchTag, setSearchTag] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        if (!searchTag.trim()) {
            setErrorMessage("Please enter a tag");  // Set error message if input is empty
            return;
        }
        setErrorMessage(''); // Clear error message on successful input
        navigate(`/result?tag=${encodeURIComponent(searchTag.trim())}`);
    };

    const handleChange = (event) => {
        setSearchTag(event.target.value);
        if (errorMessage) setErrorMessage('');  // Clear error message when user starts typing
    };

    const placeholderText = errorMessage || "Enter a tag..."; // Use error message as placeholder if it exists

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input
                    name="tag"
                    type="text"
                    placeholder={placeholderText}
                    onChange={handleChange}
                    value={searchTag}
                    className={errorMessage ? "input-error" : ""}
                    aria-label="Search by tag"
                />
                <button type="submit">Search</button>
            </form>
        </div>
    );
}
