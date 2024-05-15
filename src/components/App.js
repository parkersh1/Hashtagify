import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Main from './main';
import Navbar from './NavBar';
import Footer from './Footer';
import LoginPage from './LoginPage';
import Result from './Result';
import Infopage from './Infopage';
import Event from './Event';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/home" element={<Main />} />
        <Route path="/result" element={<Result />} />
        <Route path="/infopage/:concertTitle" element={<Infopage />} />
        <Route path="/event" element={<Event />} />
        <Route path="/" element={<Navigate replace to="/login" />} />  // Redirect to login by default
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
