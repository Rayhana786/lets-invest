import { Routes, Route } from "react-router-dom";

import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import Pitchsubmissionform from "./pages/Pitchsubmissionform";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/submit" element={<Pitchsubmissionform />} />
      
    </Routes>
  );
}

export default App;