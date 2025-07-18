import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import SideBar from "./Component/SideBar/SideBar.jsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Washroom from "../src/pages/Washroom/Washroom.jsx";
import Kitchen from "./pages/Balcony/Balcony.jsx";
import Society from "../src/pages/Society/Society.jsx";
import CollectionPage from "./pages/Collection/Collection.jsx";

function App() {
  const [count, setCount] = useState(0);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<SideBar />} />
        <Route path="/washroom" element={<Washroom />} />
        <Route path="/Balcony" element={<Kitchen />} />
        {/* <Route path="/hall" element={<Hall />} /> */}
        <Route path="/Outside" element={<Society />} />
        <Route path="/collection" element={<CollectionPage />} />
      </Routes>
    </Router>
  );
}

export default App;
