import { Box, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";

export default function HomeLayout() {
  const [time, setTime] = useState(new Date());
  const greeting = time.getHours() < 12 ? "Good Morning" : "Good Afternoon";

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatTime = (time: Date) => {
    const hours = time.getHours();
    const minutes = time.getMinutes();
    const seconds = time.getSeconds();

    return {
      hours: hours < 10 ? `0${hours}` : hours,
      minutes: minutes < 10 ? `0${minutes}` : minutes,
      seconds: seconds < 10 ? `0${seconds}` : seconds,
    };
  };

  const { hours, minutes, seconds } = formatTime(time);

  const boxStyle = {
    fontFamily: "monospace",
    fontSize: 64,
    color: "primary.contrastText",
    maxWidth: "128px",
    maxHeight: "128px",
    width: "100%",
    height: "100%",
    bgcolor: "primary.main",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 1,
    boxShadow: 16,
  };

  return (
    <>
      <Stack sx={{ height: "100%", p: 2 }}>
        <Stack
          direction="row"
          spacing={2}
          sx={{ alignItems: "center", justifyContent: "center", height: "50%" }}
        >
          <Box sx={boxStyle}>{hours}</Box>
          <Box sx={boxStyle}>{minutes}</Box>
          <Box sx={boxStyle}>{seconds}</Box>
        </Stack>
        <Typography
          align="center"
          sx={{
            fontSize: 48,
            bgcolor: "secondary.main",
            color: "secondary.contrastText",
            maxWidth: { xs: "100%", sm: "50%" },
            width: "100%",
            alignSelf: "center",
            borderRadius: 1,
            p: 2,
            boxShadow: 16,
          }}
        >
          {greeting}
        </Typography>
      </Stack>
    </>
  );
}
