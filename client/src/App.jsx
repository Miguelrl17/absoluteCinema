
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/homePage.jsx';
import BestOfThree from "./pages/BestOfThree.jsx";

import React, { useState } from 'react';
import './App.css';

function App() {
  const [formData, setFormData] = useState({
    age: '',
    genre: '',
    rating: '',
    triggers: '',
  });

  const [output, setOutput] = useState('');

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Process the trigger list into an array
    const triggerList = formData.triggers.split(',').map(trigger => trigger.trim());

    const dataToSave = {
      age: formData.age,
      genre: formData.genre,
      rating: formData.rating,
      trigger_list: triggerList,
    };

    try {
      const response = await fetch('http://127.0.0.1:5000/movieRecs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToSave),
      });
      if (!response.ok) {
        throw new Error(`Failed to send preferences: ${response.status}`);
      }
  
      const result = await response.json();
      console.log('Server response:', result);
      
    
      setOutput(JSON.stringify(result, null, 2));
  
      const blob = new Blob([JSON.stringify(result, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'server_response.json';
      a.click();
      URL.revokeObjectURL(url);
  
    } catch (error) {
      console.error('Error sending preferences:', error);
      setOutput(`Error: ${error.message}`);
    }
  };

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
