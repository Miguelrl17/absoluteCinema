import './App.css'

function App() {
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

      <footer className="footer">
        <p>&copy; 2025 Trigger-Free Movies. All rights reserved.</p>
      </footer>
    </div>
  )
}

export default App
