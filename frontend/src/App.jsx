import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import PostLetter from '../src/pages/PostLetter'
import Home from './pages/Home';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/post" element={<PostLetter />} />
      </Routes>
    </Router>
  );
}

export default App;