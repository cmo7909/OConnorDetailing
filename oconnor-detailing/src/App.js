import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Navbar from './Components/Navbar';
import Home from './Pages/Home';
import Pricing from './Pages/Pricing';
import Gallery from './Pages/Gallery';
import Contact from './Pages/Contact';
import './Components/theme.css';

function App() {
  return (
    <Router>
      <Navbar />
      <div className='page-container'>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
      </div>
    </Router>
  );
}

export default App;
