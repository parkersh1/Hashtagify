import React from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
    return (
        <nav className="top-nav">
            <li><Link to="/" className="logo">Hashtagify</Link></li>
            <div className="navbar">
                <li><Link to="./event">Upload Playlist</Link></li>
            </div>
        </nav>
    );
}

