import React, { useEffect, useState } from "react";
import Weather from "./Weather";

const Home = () => {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=Phoenix&appid=7852ab96d33019389e602d5b6bd4be3d`
        );
        const data = await response.json();
        setWeather(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching weather data:", error);
        setLoading(false);
      }
    };

    fetchWeather();
  }, []);

  return (
    <section id="home" className="home-selection">
      <div className="container center">
        <h2>Welcome to my Portfolio</h2>
        <p>Hello! I'm Victor, a budding front-end developer</p>
      </div>
      <div className="container mt-4">
        {loading ? (
          <p>Loading weather data...</p>
        ) : (
          <Weather data={weather} />
        )}
      </div>
    </section>
  );
};

export default Home;

