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

  const handleSubmit = (e) => {
    e.preventDefault();

    // Process the trigger list into an array
    const triggerList = formData.triggers.split(',').map(trigger => trigger.trim());

    const dataToSave = {
      age: formData.age,
      genre: formData.genre,
      rating: formData.rating,
      trigger_list: triggerList,
    };

    // Convert to JSON string
    const jsonString = JSON.stringify(dataToSave, null, 2);

    // Create a Blob with the JSON data
    const blob = new Blob([jsonString], { type: 'application/json' });

    // Create a download link
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'preferences.json'; // This will be the filename
    a.click();
    URL.revokeObjectURL(url);

    // Optional: Set formatted output on the page
    setOutput(jsonString);
  };

  return (
    <div className="landing-container">
      <header className="hero">
        <h1>SafeCinema</h1>
        <p>Discover movies curated for sensitive viewers — free from violence, abuse, and other triggering content.</p>
      </header>

      <section className="movie-section">
        <h2>Featured Movies</h2>
        <p>(List coming soon...)</p>
        {/* Later, map over a list of movies here */}
      </section>

      <section className="form-section">
        <h2>Submit Your Preferences</h2>
        <form id="movieForm" onSubmit={handleSubmit}>
          <label>
            Age: <input type="number" id="age" value={formData.age} onChange={handleChange} /><br /><br />
          </label>
          <label>
            Genre: <input type="text" id="genre" value={formData.genre} onChange={handleChange} /><br /><br />
          </label>
          <label>
            Rating: <input type="text" id="rating" value={formData.rating} onChange={handleChange} /><br /><br />
          </label>
          <label>
            Triggers (comma separated): <input type="text" id="triggers" value={formData.triggers} onChange={handleChange} /><br /><br />
          </label>
          <button type="submit">Submit</button>
        </form>
        <pre id="output">{output}</pre>
      </section>

      <footer className="footer">
        <p>&copy; 2025 Trigger-Free Movies. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;