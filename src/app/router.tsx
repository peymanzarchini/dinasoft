import { Route, Routes } from "react-router";

// Routes
import HomeRoute from "./routes/home";
import NotFoundRoute from "./routes/not-found";
import ProfileRoute from "./routes/profile";
import ToDoRoute from "./routes/to-do";
import WeatherRoute from "./routes/weather";

// Layouts
import DashboardLayout from "../components/layouts/dashboard";

export default function AppRouter() {
  return (
    <Routes>
      <Route element={<DashboardLayout />}>
        <Route index element={<HomeRoute />} />
        <Route path="to-do" element={<ToDoRoute />} />
        <Route path="weather" element={<WeatherRoute />} />
        <Route path="profile" element={<ProfileRoute />} />
      </Route>

      <Route path="*" element={<NotFoundRoute />} />
    </Routes>
  );
}
