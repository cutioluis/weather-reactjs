import { useEffect, useState } from "react";
import Loading from "../components/Loading";
import WeatherForm from "../components/WeatherForm";
import WeatherDetails from "../components/WeatherDetails";

export default function WeatherApp() {
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    loadInfo();
  }, []);

  useEffect(() => {
    document.title = `Weather | ${weather?.location.country}`;
  }, [weather]);

  async function loadInfo(city = "Ecuador") {
    try {
      const data = await fetch(
        `${process.env.REACT_APP_URL}&key=${process.env.REACT_APP_KEY}&q=${city}`
      );
      const response = await data.json();
      setWeather(response);
    } catch (error) {}
  }

  function handleChangeCity(city) {
    setWeather(null);
    loadInfo(city);
  }

  return (
    <div className="weather-app">
      <WeatherForm onChangeCity={handleChangeCity} />
      <div>{weather ? <WeatherDetails weather={weather} /> : <Loading />}</div>
    </div>
  );
}
