import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import PostLetter from '../src/pages/PostLetter'
import Home from './pages/Home';
import AllLetters from './pages/AllLetters';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/post" element={<PostLetter />} />
        <Route path="/getLetters" element={<AllLetters />} />
      </Routes>
    </Router>
  );
}

export default App;