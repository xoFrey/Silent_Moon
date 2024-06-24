import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import Registration from "./pages/Registration";
import GetStarted from "./pages/GetStarted";
import Notification from "./pages/Notification";
import YogaDetail from "./pages/YogaDetail";
import MeditationDetail from "./pages/MeditationDetail";
import YogaPage from "./pages/YogaPage";
import MeditationPage from "./pages/MeditationPage";
import MusicPage from "./pages/MusicPage";
import ProfilePage from "./pages/ProfilePage";
import { useEffect, useState } from "react";
import {
  TokenContext,
  RefreshContext,
  UserContext,
  PlaylistContext,
} from "../context/Context";
import MusikDetail from "./pages/MusicDetail";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import AuthRequired from "./components/AuthRequired";
import InformationPage from "./pages/InformationPage";
import { backendUrl } from "./api/api";

function App() {
  const [refresh, setRefresh] = useState(false);
  const [token, setToken] = useState();
  const [user, setUser] = useState();
  const [playlist, setPlaylist] = useState();

  useEffect(() => {
    const fetchPlaylist = async () => {
      const res = await fetch(`${backendUrl}/api/v1/spotify/playlist`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: "3idpjOhj59WP59HhHJe0nD" }),
      });
      const data = await res.json();
      setPlaylist(data);
    };
    fetchPlaylist();
  }, []);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <PlaylistContext.Provider value={{ playlist, setPlaylist }}>
        <RefreshContext.Provider value={{ refresh, setRefresh }}>
          <TokenContext.Provider value={{ token, setToken }}>
            <UserContext.Provider value={{ user, setUser }}>
              <BrowserRouter>
                <Routes>
                  <Route path="/" element={<LandingPage />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Registration />} />
                  <Route path="/get-started" element={<GetStarted />} />

                  <Route path="/notification" element={<Notification />} />

                  <Route
                    path="/home"
                    element={
                      <AuthRequired>
                        <Home />
                      </AuthRequired>
                    }
                  />
                  <Route
                    path="/yoga"
                    element={
                      <AuthRequired>
                        <YogaPage />
                      </AuthRequired>
                    }
                  />
                  <Route
                    path="/yoga/:yogaId"
                    element={
                      <AuthRequired>
                        <YogaDetail />
                      </AuthRequired>
                    }
                  />
                  <Route
                    path="/meditation"
                    element={
                      <AuthRequired>
                        <MeditationPage />
                      </AuthRequired>
                    }
                  />
                  <Route
                    path="/meditation/:meditationId"
                    element={
                      <AuthRequired>
                        <MeditationDetail />
                      </AuthRequired>
                    }
                  />
                  <Route
                    path="/music"
                    element={
                      <AuthRequired>
                        <MusicPage />
                      </AuthRequired>
                    }
                  />
                  <Route
                    path="/musicdetails/:trackId"
                    element={
                      <AuthRequired>
                        <MusikDetail />
                      </AuthRequired>
                    }
                  />
                  <Route
                    path="/profile"
                    element={
                      <AuthRequired>
                        <ProfilePage />
                      </AuthRequired>
                    }
                  />
                  <Route
                    path="/information"
                    element={
                      <AuthRequired>
                        <InformationPage />
                      </AuthRequired>
                    }
                  />
                </Routes>
              </BrowserRouter>
            </UserContext.Provider>
          </TokenContext.Provider>
        </RefreshContext.Provider>
      </PlaylistContext.Provider>
    </LocalizationProvider>
  );
}

export default App;
