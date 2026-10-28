import TravelAdvisor from './components/TravelAdvisor.jsx';
import { useState, useEffect } from 'react';
import SearchBar from './components/SearchBar.jsx';
import LoadingSpinner from './components/LoadingSpinner.jsx';
import ErrorMessage from './components/ErrorMessage.jsx';
import WeatherCard from './components/WeatherCard.jsx';
import { loadWeather } from './weather.js';
import './style.css';

export default function App() {
  const [city, setCity] = useState('');
  const [searchedCity, setSearchedCity] = useState('');

  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  function handleSearch() {
    if (city.trim() === '' || loading) {
      return;
    }

    setSearchedCity(city.trim());
  }

  useEffect(() => {
    if (!searchedCity) {
      return;
    }

    let cancelled = false;

    async function fetchWeather() {
      setLoading(true);
      setError('');
      setWeather(null);

      try {
        const data = await loadWeather(searchedCity);

        if (!cancelled) {
          setWeather(data);
        }
      } catch (err) {
        if (!cancelled) {
          if (err.message === 'not-found') {
            setError('City not found. Please try again.');
          } else if (err.message === 'api-key') {
            setError('Weather API key is missing or invalid.');
          } else if (err.message === 'rate-limit') {
            setError('Too many requests. Please try again later.');
          } else {
            setError('Unable to load weather. Please try again.');
          }
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    fetchWeather();

    return () => {
      cancelled = true;
    };
  }, [searchedCity]);

  return (
    <main className="page-shell">
      <section className="app-card">
        <header className="hero">
          <div className="brand-row">
            <div className="brand-mark" aria-hidden="true">
              ☁️
            </div>

            <div>
              <h1>Kumo</h1>
            </div>
          </div>

          <p className="intro">
            Which city's weather would you like to check out?
          </p>
        </header>

        <SearchBar
          city={city}
          setCity={setCity}
          onSearch={handleSearch}
        />

        <section className="status-wrap" aria-live="polite">
          {loading ? (
            <LoadingSpinner />
          ) : error ? (
            <ErrorMessage message={error} />
          ) : weather ? (
            <p className="message" data-state="success">
              Weather loaded for {weather.searchedName}! ✨
            </p>
          ) : (
            <p className="message" data-state="idle">
              Enter a city to begin ✨
            </p>
          )}
        </section>
        {weather && !loading && !error && (
        <>
          <WeatherCard weather={weather} />
          {weather.forecast?.length > 0 && (
            <TravelAdvisor forecast={weather.forecast} />
          )}
        </>
)}
        
      </section>

      <div className="decor decor-one" aria-hidden="true"></div>
      <div className="decor decor-two" aria-hidden="true"></div>
      <div className="decor decor-three" aria-hidden="true"></div>
    </main>
  );
}
