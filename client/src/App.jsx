
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/homePage.jsx';
import BestOfThree from "./pages/BestOfThree.jsx";

import './App.css';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/bestOfThree" element={<BestOfThree />} />
      </Routes>
    </BrowserRouter>
  );
}
