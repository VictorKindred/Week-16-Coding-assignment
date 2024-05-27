
import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css'; 

const Weather = ({ data }) => {
  if (!data) return null;

  const fahrenheit = ((data.main.temp - 273.15) * 9/5 + 32).toFixed(2);

  return (
    <div className="card mt-4">
      <div className="card-body">
        <h3 className="card-title">Current Weather</h3>
        <p className="card-text">Temperature: {fahrenheit}°F</p>
        <p className="card-text">Condition: {data.weather[0].description}</p>
        <p className="card-text">Humidity: {data.main.humidity}%</p>
       
      </div>
    </div>
  );
};

export default Weather;
