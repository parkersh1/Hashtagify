import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Main from './main';
import Navbar from './NavBar';
import Result from './Result';
import Infopage from "./Infopage";
import Event from "./Event";
import Footer from './Footer';

export default function App(props) {
  const [concertData, setConcertData] = useState(props.concertData);

  const addNewEvent = (newEvent) => {
    const updatedEvents = [...concertData, newEvent];
    setConcertData(updatedEvents);
  };

  return (
    <div>
      <BrowserRouter>
        <Navbar aria-label="NavBar" />
        <Routes>
          <Route
            path="/"
            element={<Main concertData={concertData} />}
            aria-label="Home"
          />
          <Route
            path="/Result"
            element={<Result concertData={concertData} />}
            aria-label="Result"
          />
          <Route
            path="/Infopage/:concertTitle"
            element={<Infopage concertData={concertData} />}
            aria-label="Infopage"
          />
          <Route
            path="/Event"
            element={<Event onAddNewEvent={addNewEvent} />}
            aria-label="Event"
          />
        </Routes>
        <Footer aria-label="Footer" />
      </BrowserRouter>
    </div>
  );
};
