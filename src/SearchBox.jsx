import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useState } from "react";

export default function SearchBox() {
  const [city, setCity] = useState("");
  const API_URL = import.meta.env.VITE_API_URL;
  const API_KEY = import.meta.env.VITE_API_KEY;

  const Hourly_forecast_url = import.meta.env.VITE_HOURLY_URL;
  const Hourly_forecast_key = import.meta.env.VITE_HOURLY_KEY;

  async function getHourlyData() {
    let response = await fetch(
      `${Hourly_forecast_url}?q=${city}&appid=${Hourly_forecast_key}&units=metric`
    );
    let Data = await response.json();


    let HourlyInfo = {
 first_hour_date: Data.list[0].dt_txt,
 first_hour_temp: Data.list[0].main.temp,
 first_hour_description: Data.list[0].weather[0].description,

 second_hour_date: Data.list[1].dt_txt,
 second_hour_temp: Data.list[1].main.temp,
 second_hour_description: Data.list[1].weather[0].description,


 thrid_hour_date: Data.list[2].dt_txt,
 thrid_hour_temp: Data.list[2].main.temp,
 thrid_hour_description: Data.list[2].weather[0].description,
};

let DaysInfo = {

      Day1_date: Data.list[4].dt_txt,
      Day1_temp: Data.list[4].main.temp,
      Day1_description: Data.list[4].weather[0].description,

      Day2_date: Data.list[12].dt_txt,
      Day2_temp: Data.list[12].main.temp,
      Day2_description: Data.list[12].weather[0].description,

      Day3_date: Data.list[20].dt_txt,
      Day3_temp: Data.list[20].main.temp,
      Day3_description: Data.list[20].weather[0].description,

}
    
   
    console.log(HourlyInfo);
    console.log(DaysInfo);
  
    }

  async function getData() {
    let response = await fetch(
      `${API_URL}?q=${city}&appid=${API_KEY}&units=metric`
    );
    let data = await response.json();

    let currentForecast = {
      Location: data.name,
      Humidity: data.main.humidity,
      Temp: data.main.temp,
      Description: data.weather[0].description,
    };
    console.log(currentForecast);
  }

  const handleChange = (evt) => {
    setCity(evt.target.value);
  };

  const onSubmit = async (evt) => {
    evt.preventDefault();
    await getData();
    await getHourlyData();
  };

  return (
    <>
      <form onSubmit={onSubmit}>
        <TextField
          id="standard-basic"
          value={city}
          onChange={handleChange}
          label="City"
          variant="standard"
        />
        <br />
        <br />
        <Button type="submit" variant="contained">
          Search
        </Button>
      </form>
    </>
  );
}
