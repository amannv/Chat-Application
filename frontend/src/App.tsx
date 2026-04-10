import ChatPage from "./pages/ChatPage";
import { Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";

const App = () => {
  return (
    <div className="h-screen w-full bg-black">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/chat" element={<ChatPage />} />
        </Routes>
    </div>
  );
};

export default App;
