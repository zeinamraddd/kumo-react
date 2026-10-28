
export default function WeatherCard({ weather }) {
  const current = weather.current;

  const iconUrl = current.condition.icon.startsWith('//')
    ? `https:${current.condition.icon}`
    : current.condition.icon;

  return (
    <section className="weather">
      <div className="weather-heading">
        <div>
          <p className="location-label">
            {weather.country || 'Current weather'}
          </p>

          <h2>{weather.searchedName}</h2>

          <p className="condition-text">
            {current.condition.text}
          </p>
        </div>

        <div className="icon-bubble">
          <img
            src={iconUrl}
            alt={current.condition.text}
          />
        </div>
      </div>

      <div className="temperature-block">
        <p className="temperature">
          {Math.round(current.temp_c)}°C
        </p>

        <p className="feels-like">
          Feels like {Math.round(current.feelslike_c)}°C
        </p>
      </div>

      <div className="details-grid">
        <div className="detail-card">
          <span className="detail-icon">💧</span>
          <span className="detail-label">Humidity</span>
          <strong>{current.humidity}%</strong>
        </div>

        <div className="detail-card">
          <span className="detail-icon">💨</span>
          <span className="detail-label">Wind speed</span>
          <strong>{current.wind_kph} km/h</strong>
        </div>
      </div>

      <p className="updated">
        Last updated: {current.last_updated}
      </p>
    </section>
  );
}
