import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
    return (
        <nav>
            <ul className="nav">
                <li className="nav-item"><Link className="text-decoration-none" to="/" >Home</Link></li>
                <li className="nav-item"><Link className="text-decoration-none" to="/playlist" >Playlist</Link></li>
                <li className="nav-item"><Link className="text-decoration-none" to="/ratings" >Ratings</Link></li>
                <li className="nav-item"><Link className="text-decoration-none" to="/compare" >Compare</Link></li>
                <li className="nav-item"><Link className="text-decoration-none" to="/about" >About</Link></li>
            </ul>
        </nav>
    )
}

export default Navbar;