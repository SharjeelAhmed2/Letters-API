import { useEffect, useState } from 'react';

export default function RandomLetter() {
  const [letter, setLetter] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchRandom = () => {
    setLoading(true);
    fetch('http://localhost:8081/api/letters/random')
      .then((res) => {
        if (!res.ok) throw new Error('No letter found');
        return res.json();
      })
      .then((data) => {
        setLetter(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching random letter:', err);
        setLetter(null);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchRandom();
  }, []);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center text-pink-600 font-semibold">Loading random letter... 💌</div>;
  }

  if (!letter) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-pink-50 text-center px-6">
        <h2 className="text-2xl font-semibold text-pink-600 mb-4">Oops... no letter blew your way 🥺💨</h2>
        <p className="text-gray-600 mb-6">Maybe the wind’s feeling shy today... or someone forgot to whisper a love note into it 😔💌</p>
        <button
          onClick={fetchRandom}
          className="bg-pink-500 hover:bg-pink-600 text-white font-medium py-2 px-4 rounded-md transition"
        >
          🔁 Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-pink-50 py-10 px-4 flex flex-col items-center">
      <h2 className="text-3xl font-bold text-pink-700 mb-4">🎲 Random Letter</h2>

      <div className="bg-white shadow-lg rounded-xl p-5 border-l-4 border-pink-300 max-w-xl w-full">
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
      </div>

      <button
        onClick={fetchRandom}
        className="mt-6 bg-pink-500 hover:bg-pink-600 text-white font-medium py-2 px-4 rounded-md transition"
      >
        🔁 Shuffle Again
      </button>
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
