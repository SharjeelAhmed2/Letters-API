import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
export default function AllLetters() {
  const [letters, setLetters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);

  const navigate = useNavigate();
  const goToSubmit = async () => {
    navigate('/post');

  }
  useEffect(() => {
    fetch('http://localhost:8081/api/letters')
      .then((res) => res.json())
      .then((data) => {
        setLetters(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching letters:', err);
        setLoading(false);
      });
  }, []);
  const filteredLetters = filter === 'all'
    ? letters
    : letters.filter(letter => letter.mood?.toLowerCase() === filter);
  const moods = ['all', 'flirty', 'comforting', 'wholesome', 'playful', 'tired', 'exhausted', 'emotional', 'mixed'];
  if (loading) {
    return <div className="min-h-screen flex items-center justify-center text-pink-600 font-semibold">Loading letters... 💌</div>;
  }
  const fetchLetters = async () => {
    try {
      const res = await axios.get('http://localhost:8081/api/letters');
      setLetters(res.data);
    } catch (err) {
      console.error('Error fetching letters:', err);
    }
  };
  const deleteLetter = async (id) => {
    try {
      await axios.delete(`http://localhost:8081/api/letters/${id}`);
      setConfirmDeleteId(null);
      fetchLetters(); // Refresh list
    } catch (err) {
      console.error('Error deleting letter:', err);
    }
  };
  if (letters.length === 0) {
    return <div className="min-h-screen flex items-center justify-center text-gray-500 font-medium">No letters yet 😔</div>;
  }

  return (

    <div className="min-h-screen bg-pink-50 py-10 px-4">
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="flex flex-col items-center gap-2 mb-6">
          <h2 className="text-3xl font-bold text-pink-700 text-center">💌 Letters from the Wind</h2>
          <button
            onClick={goToSubmit} // or use a prop/state toggle in parent
            className="text-sm text-pink-600 hover:underline"
          >
            ← Return to Write Letter
          </button>
          <div className="flex flex-wrap gap-2 mt-4 justify-center">
            {moods.map((m) => (
              <button
                key={m}
                onClick={() => setFilter(m)}
                className={`px-3 py-1 rounded-full text-sm capitalize transition
        ${filter === m
                    ? 'bg-pink-600 text-white'
                    : 'bg-pink-200 text-pink-800 hover:bg-pink-300'}`}
              >
                {m === 'all' ? '💌 All' : `${moodEmoji(m)} ${m}`}
              </button>
            ))}
          </div>
        </div>


        {filteredLetters.map((letter) => (
          <div
            key={letter.id}
            className="bg-white shadow-lg rounded-xl p-5 border-l-4 border-pink-300"
          >
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-gray-500 italic">
                — {letter.author || 'Anonymous'}
              </span>
              <span className="text-xs bg-pink-200 text-pink-800 px-3 py-1 rounded-full capitalize">
                {moodEmoji(letter.mood)} {letter.mood}
              </span>
            </div>

          <p className="text-gray-800 whitespace-pre-wrap font-serif">
              {letter.content}
            </p>
            <div className="text-right text-xs text-gray-400 mt-3">
              {new Date(letter.createdAt).toLocaleString()}
            </div>
            
            <button
            onClick={() => setConfirmDeleteId(letter.id)}
           // className="absolute top-2 right-2 bg-red-200 hover:bg-red-400 text-red-800 text-sm px-3 py-1 rounded-full transition-all"
          >
            🗑️ Delete
          </button>
          </div>
          
        ))}
      {confirmDeleteId && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-md max-w-sm w-full">
            <h2 className="text-lg font-semibold mb-3">Are you sure?</h2>
            <p className="mb-5 text-gray-700">
              Do you really want to let this letter go?  
              <span className="italic"> Memories can't be undeleted… 🥺💔</span>
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setConfirmDeleteId(null)}
                className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded-md"
              >
                Cancel
              </button>
              <button
                onClick={() => deleteLetter(confirmDeleteId)}
                className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-md"
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}
        <button
          onClick={() => navigate('/random')}// or use a prop/state toggle in parent
          className="text-sm text-pink-600 hover:underline"
        >
          🎲 Random Letter
        </button>
      </div>
    </div>
  );
}


function moodEmoji(mood) {
  const moodMap = {
    flirty: '💋',
    comforting: '☁️',
    wholesome: '🌼',
    playful: '😏',
    tired: '😓',
    exhausted: '😞',
    emotional: '🥺',
    mixed: '😔',
  };
  return moodMap[mood?.toLowerCase()] || '💌';
}
