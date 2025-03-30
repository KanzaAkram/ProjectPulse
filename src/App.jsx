
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import "./index.css";
import {
  createRoutesFromElements,
  createBrowserRouter,
  Route,
  RouterProvider,
  Navigate,
} from "react-router-dom";

import { themeSettings } from "./theme";
import Layout from "./scenes/Layout";
import Admin from "./scenes/Admin";

import ProjectOverview from "./scenes/Dashboard";
import Tasks from "./scenes/Tasks";
import ProjectPulseTimeline from "./scenes/Timeline";
import TeamDashboard from "./scenes/Team";
import StatusReports from "./scenes/StatusReports";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<Layout />}>
      <Route path="/" element={<Navigate to="/overview" replace />} />
      <Route path="/overview" element={<ProjectOverview />} />
      <Route path="/tasks" element={<Tasks />} />
      <Route path="/timeline" element={<ProjectPulseTimeline />} />
      <Route path="/team" element={<TeamDashboard />} />
      <Route path="/status-reports" element={<StatusReports />} /> {/* Added route */}
      
      <Route path="/admin" element={<Admin />} />
      

    </Route>
  )
);

function App() {
  const mode = useSelector((state) => state.global.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;
