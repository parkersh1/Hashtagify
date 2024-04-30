import React from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
    return (
        <nav className="top-nav">
            <li><Link to="/" className="logo">Concerto.</Link></li>
            <div className="navbar">
                <li><Link to="./event">Upload</Link></li>
            </div>
        </nav>
    );
}

