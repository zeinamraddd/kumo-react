
export default function TravelAdvisor({ forecast }) {
  // Calculate a score for each forecast day
  const days = forecast.map((item) => {
    const day = item.day;
    let score = 0;

    // Comfortable temperatures
    if (day.avgtemp_c >= 18 && day.avgtemp_c <= 26) {
      score += 3;
    } else if (day.avgtemp_c >= 12 && day.avgtemp_c <= 30) {
      score += 1;
    }

    // Low chance of rain
    if (day.daily_chance_of_rain < 20) {
      score += 3;
    } else if (day.daily_chance_of_rain < 50) {
      score += 1;
    }

    // Low wind speed
    if (day.maxwind_kph < 20) {
      score += 2;
    } else if (day.maxwind_kph < 35) {
      score += 1;
    }

    return {
      date: item.date,
      temperature: day.avgtemp_c,
      rain: day.daily_chance_of_rain,
      wind: day.maxwind_kph,
      score: score
    };
  });

  // Find the day with the highest score
  let bestDay = days[0];

  days.forEach((day) => {
    if (day.score > bestDay.score) {
      bestDay = day;
    }
  });

  const isToday = bestDay.date === days[0].date;

  return (
    <section className="travel-advisor">
      <h2>✈️ Travel Weather Advisor</h2>

      <p>
        {isToday
          ? "Today has the best weather in the available forecast."
          : "A better day to visit is coming up!"}
      </p>

      <h3>
        Best day: {bestDay.date}
      </h3>

      <p>
        Average temperature: {bestDay.temperature}°C
      </p>

      <p>
        Chance of rain: {bestDay.rain}%
      </p>

      <p>
        Maximum wind speed: {bestDay.wind} km/h
      </p>

      <h3>Upcoming forecast</h3>

      <div className="forecast-list">
        {days.map((day) => (
          <div className="forecast-day" key={day.date}>
            <strong>{day.date}</strong>
            <span>{day.temperature}°C</span>
            <span>🌧️ {day.rain}%</span>
            <span>💨 {day.wind} km/h</span>
            {day.date === bestDay.date && (
              <strong>⭐ Best day</strong>
            )}
          </div>
        ))}
      </div>

      <p className="travel-note">
        Recommendations are based on forecast temperature,
        rain probability, and wind speed. Weather preferences
        may vary.
      </p>
    </section>
  );
}
