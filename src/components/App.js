import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Main from './main';  // Ensure correct case if the filename is `Main.js`
import Navbar from './NavBar';  // Ensure correct case if the filename is `Navbar.js`
import Footer from './Footer';
import LoginPage from './LoginPage';
import Result from './Result';
import Infopage from './Infopage';
import Event from './Event';
import AllPlaylists from './AllPlaylists';  // Import the AllPlaylists component

function App({ concertData }) {  // Accept concertData as a prop
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/home" element={<Main concertData={concertData} />} />
        <Route path="/result" element={<Result concertData={concertData} />} />
        <Route path="/infopage/:concertTitle" element={<Infopage concertData={concertData} />} />
        <Route path="/event" element={<Event />} />
        <Route path="/all-playlists" element={<AllPlaylists concertData={concertData} />} />  // New route for viewing all playlists
        <Route path="/" element={<Navigate replace to="/login" />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;