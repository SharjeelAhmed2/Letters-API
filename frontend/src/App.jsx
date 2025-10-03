import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './pages/Navbar';
import Home from './pages/Home';
import PostLetter from './pages/PostLetter';
import AllLetters from './pages/AllLetters';
import RandomLetter from './pages/RandomLetter';
import About from './pages/About';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/post" element={<PostLetter />} />
        <Route path="/getLetters" element={<AllLetters />} />
        <Route path="/random" element={<RandomLetter />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </Router>
  );
}

export default App;
