import SearchIcon from "@mui/icons-material/Search";
import { IconButton, Stack, TextField, Typography } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { FormEvent, useEffect, useState } from "react";

export default function WeatherLayout() {
  const [inputCity, setInputCity] = useState("");
  const [city, setCity] = useState("");
  const [temperature, setTemperature] = useState("");

  const { mutate, error, isError } = useMutation({
    mutationFn: async () => {
      setTemperature("");
      try {
        const { data } = await axios.get(
          `https://geocoding-api.open-meteo.com/v1/search?name=${
            inputCity || "london"
          }&count=1&language=en&format=json`
        );
        const { latitude, longitude } = data.results[0];
        setCity(data.results[0].name);

        const temp = await axios.get(
          `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`
        );

        setTemperature(temp.data.current_weather.temperature);
      } catch (error) {
        throw new Error("City not found");
        console.log(error);
      }
    },
  });

  useEffect(() => {
    mutate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleOnSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    mutate();
  };

  return (
    <Stack
      spacing={4}
      sx={{ alignItems: "center", height: "100%", px: 2, pt: 4 }}
    >
      <Typography variant="h4" align="center">
        Input your desired city name
      </Typography>
      <Stack
        component="form"
        spacing={1}
        direction="row"
        sx={{ maxWidth: "512px", width: "100%" }}
        onSubmit={(event) => handleOnSubmit(event)}
      >
        <TextField
          label="City name"
          type="search"
          variant="filled"
          required
          sx={{ width: "100%" }}
          onChange={(event) => setInputCity(event.target.value)}
        />
        <IconButton type="submit" sx={{ width: "56px", height: "56px" }}>
          <SearchIcon />
        </IconButton>
      </Stack>
      {isError && (
        <Typography color="error">
          {error instanceof Error ? error.message : "City not found"}
        </Typography>
      )}
      {temperature && (
        <Stack sx={{ bgcolor: "primary.main", p: 8, borderRadius: 2 }}>
          <Typography
            align="center"
            variant="h4"
            sx={{ color: "primary.contrastText" }}
          >
            {city}
          </Typography>
          <Typography
            variant="h2"
            align="center"
            sx={{ color: "primary.contrastText" }}
          >
            {temperature}°C
          </Typography>
        </Stack>
      )}
    </Stack>
  );
}
