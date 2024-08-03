import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useState } from "react";

export default function SearchBox() {
  const [city, setCity] = useState("");
  const API_URL = import.meta.env.VITE_API_URL;
  const API_KEY = import.meta.env.VITE_API_KEY;

  async function getData() {
     
    let response = await fetch(`${API_URL}?q=${city}&appid=${API_KEY}`);
    let data = await response.json();
    console.log(data);
  }

  const handleChange = (evt) => {
    setCity(evt.target.value);
  };

  const onSubmit = async (evt) => {
    evt.preventDefault();
    await getData();
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
