import React from 'react';
import { SearchBar } from './SearchBar';
import { Card } from './Card';

function Main(props) {
    const { concertData } = props;
    return (
        <div>
            <header>
                <div className="motto">
                    <div className="searchbar">
                        <h1>Feel the Music, Live the Moment!</h1>
                        <SearchBar />
                    </div>
                </div>
            </header>
            <main>
                <div className="container">
                    <section className="column-1">
                        <h1>Recommendation</h1>
                    </section>
                    <Card concertData={concertData}/>
                </div>              
            </main>
        </div>
    );
}

export default Main;