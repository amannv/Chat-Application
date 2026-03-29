import ChatPage from "./pages/ChatPage"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import LandingPage from "./pages/LandingPage"

const App = () => {
  return (
    <div className="h-screen w-full bg-black">
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/chat" element={<ChatPage />} />
      </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
