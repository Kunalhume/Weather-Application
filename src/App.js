import React, { useState } from "react";
import axios from "axios";

function App() {
  const [weatherData, setWeatherData] = useState({});
  const [location, setLocation] = useState("");

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=96720f7fff25cf94f0740ef4778851db`;

  const searchLocation = async (event) => {
    if (event.key === "Enter") {
      try {
        const { data } = await axios.get(url);
        console.log(data);
        setWeatherData(data);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <>
      <div className="app">
        <div className="search">
          <input
            value={location}
            onChange={(event) => setLocation(event.target.value)}
            onKeyPress={searchLocation}
            placeholder="Enter Location"
            type="text"
          />
        </div>
        <div className="container">
          <div className="top">
            <div className="location">
              <p>{weatherData.name}</p>
            </div>
            <div className="temp">
              {weatherData.main ? <h1>{weatherData.main.temp.toFixed()}°C</h1> : null}
            </div>
            <div className="description">
              {weatherData.weather ? (
                <p>{weatherData.weather[0].main}</p>
              ) : null}
            </div>
          </div>

          <div className="bottom">
            <div className="feels">
              {weatherData.main ? <p className="bold">{weatherData.main.feels_like.toFixed()}°C</p> :null}
              
              <p>Feels Like</p>
            </div>
            <div className="humidity">
            {weatherData.main ? <p className="bold">{weatherData.main.humidity}%</p> :null}
              <p>Humidity</p>
            </div>
            <div className="wind">
            {weatherData.wind ? <p className="bold">{weatherData.wind.speed.toFixed()} KMH</p> :null}
              <p>Wind Speed</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
