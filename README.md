# Kumo — React Weather Dashboard ☁️

Kumo is a weather dashboard built using React and Vite. Users can search for a city to view current weather conditions and receive a simple recommendation for the best upcoming day to visit based on the weather forecast.

## Features

- Search for weather by city
- Display current temperature, weather condition, humidity, and wind speed
- Display loading and error messages
- View upcoming weather forecasts
- Receive a travel-weather recommendation based on temperature, rain probability, and wind speed
- Responsive interface

## Technologies Used

- React
- Vite
- JavaScript
- HTML and CSS
- Open-Meteo Geocoding API
- WeatherAPI

## Installation and Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/YOUR-USERNAME/kumo-react.git
   ```

2. Navigate into the project:

   ```bash
   cd kumo-react
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Create a `.env` file in the project root and add your WeatherAPI key:

   ```env
   VITE_WEATHER_API_KEY=your_api_key_here
   ```

5. Start the development server:

   ```bash
   npm run dev
   ```

6. Open the local URL displayed in the terminal.

## React Component Structure

The application uses functional components:

- **App.jsx:** Main component that manages application state and data fetching using `useState` and `useEffect`.
- **SearchBar.jsx:** Handles user input and city search submissions.
- **WeatherCard.jsx:** Displays current weather information.
- **LoadingSpinner.jsx:** Displays a loading message during API requests.
- **ErrorMessage.jsx:** Displays errors when weather data cannot be retrieved.
- **TravelAdvisor.jsx:** Evaluates available forecast days and recommends the day with the most favorable weather.

## State and Props

State is managed in `App.jsx` using React's `useState` hook. The application tracks the search input, submitted city, weather data, loading state, and error messages.

The `useEffect` hook fetches weather data when the submitted city changes.

Data is passed from `App.jsx` to child components using props. Callback functions allow the `SearchBar` component to update state in `App.jsx`.

Shared state is lifted to `App.jsx`, and props are passed only one level down, avoiding unnecessary prop drilling.

## Travel Weather Advisor

The Travel Advisor uses a simple scoring system to compare forecast days.

It considers:

- Comfortable average temperatures
- Low chances of rain
- Low wind speeds

The day with the highest score is recommended as the best upcoming day to visit within the available forecast period.

Recommendations are based on weather conditions only and do not guarantee travel safety.

## Running the Project

```bash
npm run dev
```

The application runs locally using Vite's development server.