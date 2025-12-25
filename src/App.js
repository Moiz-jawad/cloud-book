import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar section/Navbar";
import Home from "./components/home section/Home";
import About from "./components/about section/About";
import NoteState from "./context/noteState";

function App() {
  return (
    <>
      <NoteState>
        <Router>
          <Navbar />
          <div className="container">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
            </Routes>
          </div>
        </Router>
      </NoteState>
    </>
  );
}

export default App;
