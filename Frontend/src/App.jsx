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
import Navbar from "./components/Navbar";
import { useState } from "react";
import { TokenContext, RefreshContext, UserContext } from "../context/Context";
import MusikDetail from "./pages/MusicDetail";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import AuthRequired from "./components/AuthRequired";

function App() {
  const [refresh, setRefresh] = useState(false);
  const [token, setToken] = useState();
  const [user, setUser] = useState();
  return (<LocalizationProvider dateAdapter={AdapterDayjs}>
    <RefreshContext.Provider value={{ refresh, setRefresh }}>
      <TokenContext.Provider value={{ token, setToken }}>
        <UserContext.Provider value={{ user, setUser }}>
          <BrowserRouter>
            <Routes>
              <Route
                path='/'
                element={<LandingPage />}
              />
              <Route
                path='/login'
                element={<Login />}
              />
              <Route
                path='/register'
                element={<Registration />}
              />
              <Route
                path='/get-started'
                element={<GetStarted />}
              />

              <Route
                path='/notification'
                element={<Notification />}
              />


              <Route
                path='/home'
                element={<AuthRequired><Home /></AuthRequired>}
              />
              <Route
                path='/yoga'
                element={<YogaPage />}
              />
              <Route
                path='/yoga/:yogaId'
                element={<YogaDetail />}
              />
              <Route
                path='/meditation'
                element={<MeditationPage />}
              />
              <Route
                path='/meditation/:meditationId'
                element={<MeditationDetail />}
              />
              <Route
                path='/music'
                element={<MusicPage />}
              />
              <Route
                path='/musicdetails/:trackId'
                element={<MusikDetail />}
              />
              <Route
                path='/profile'
                element={<AuthRequired><ProfilePage /></AuthRequired>}
              />
            </Routes>
            <Navbar />
          </BrowserRouter>
        </UserContext.Provider>
      </TokenContext.Provider>
    </RefreshContext.Provider>   </LocalizationProvider>
  );
}

export default App;
