import { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";

const BACON_API_URL = "https://baconipsum.com/api/?type=all";

function BaconApp() {
  const [paragraphs, setParagraphs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [lastUpdated, setLastUpdated] = useState(null);

  const fetchBaconText = async () => {
    setIsLoading(true);
    setErrorMessage("");

    try {
      const response = await fetch(BACON_API_URL);

      if (!response.ok) {
        throw new Error(`The API returned status ${response.status}.`);
      }

      const data = await response.json();

      if (!Array.isArray(data)) {
        throw new Error("The API returned an unexpected response.");
      }

      setParagraphs(data);
      setLastUpdated(new Date());
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : "Unable to fetch Bacon Ipsum text.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBaconText();
  }, []);

  return (
    <div className="page-shell">
      <header className="site-header">
        <a className="wordmark" href="#top" aria-label="Bacon and Words home">
          <span className="wordmark-icon">B</span>
          <span>Bacon<span className="wordmark-accent">&</span>Words</span>
        </a>
        <span className="assignment-label">Assignment 10.05</span>
      </header>

      <main id="top">
        <section className="intro-section">
          <div className="intro-copy">
            <p className="eyebrow">Fetch API / async await</p>
            <h1>Good words.<br /><em>Better bacon.</em></h1>
            <p className="intro-text">A small React experiment that turns the Bacon Ipsum API into a fresh, flavorful reading break.</p>
            <button className="refresh-button" onClick={fetchBaconText} disabled={isLoading}>
              <span className={isLoading ? "spinner" : "refresh-icon"} aria-hidden="true">{isLoading ? "" : "↻"}</span>
              {isLoading ? "Cooking up words..." : "Fetch fresh bacon"}
            </button>
          </div>
          <div className="hero-art" aria-hidden="true">
            <span className="sun"></span>
            <span className="steam steam-one"></span>
            <span className="steam steam-two"></span>
            <div className="plate"><span className="bacon bacon-one"></span><span className="bacon bacon-two"></span><span className="bacon bacon-three"></span><span className="egg"></span></div>
          </div>
        </section>

        <section className="content-section" aria-labelledby="results-title">
          <div className="results-heading">
            <div><p className="eyebrow">Fresh from the endpoint</p><h2 id="results-title">Today&apos;s serving</h2></div>
            {lastUpdated && !isLoading && <time dateTime={lastUpdated.toISOString()}>Updated {lastUpdated.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" })}</time>}
          </div>
          {isLoading && <div className="status-panel" role="status"><span className="large-spinner"></span><p>Fetching something delicious...</p></div>}
          {!isLoading && errorMessage && <div className="status-panel error-panel" role="alert"><strong>We hit a snag.</strong><p>{errorMessage}</p><button className="try-again" onClick={fetchBaconText}>Try again</button></div>}
          {!isLoading && !errorMessage && <div className="paragraph-grid">{paragraphs.map((paragraph, index) => <article className="paragraph-card" key={`${paragraph.slice(0, 20)}-${index}`}><span className="card-number">{String(index + 1).padStart(2, "0")}</span><p>{paragraph}</p></article>)}</div>}
        </section>
      </main>

      <footer className="site-footer"><span>Powered by <a href="https://baconipsum.com/api/?type=all" target="_blank" rel="noreferrer">Bacon Ipsum API</a></span><span>Built with React + Fetch</span></footer>
    </div>
  );
}

createRoot(document.getElementById("root")).render(<BaconApp />);
