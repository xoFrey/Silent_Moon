import { BrowserRouter, Route, Routes } from "react-router-dom";
import './App.css';
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

function App() {
  return <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Registration />} />
        <Route path="/get-started" element={<GetStarted />} />
        <Route path="/notification" element={<Notification />} />
        <Route path="/home" element={<Home />} />
        <Route path="/yoga" element={<YogaPage />} />
        <Route path="/yoga/:yogaId" element={<YogaDetail />} />
        <Route path="/meditation" element={<MeditationPage />} />
        <Route path="/meditation/:meditationId" element={<MeditationDetail />} />
        <Route path="/music" element={<MusicPage />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Routes>
    </BrowserRouter>
  </>;

}

export default App;
