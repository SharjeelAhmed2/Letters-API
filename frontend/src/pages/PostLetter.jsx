import { useState } from 'react';

export default function SubmitLetter() {
  const [author, setAuthor] = useState('');
  const [mood, setMood] = useState('');
  const [content, setContent] = useState('');

  const maxChars = 500;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!mood || !content.trim()) {
      alert('Mood and Content are required.');
      return;
    }

    const payload = {
      author: author.trim() || 'Anonymous',
      mood,
      content: content.trim(),
    };

    try {
      const res = await fetch('http://localhost:8081/api/letters', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        alert('Letter sent successfully 💌');
        setAuthor('');
        setMood('');
        setContent('');
      } else {
        alert('Something went wrong 😞');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Network error 😵');
    }
  };

  return (
    <div className="min-h-screen bg-pink-100 flex items-center justify-center px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-xl p-6 w-full max-w-xl"
      >
        <h2 className="text-2xl font-semibold text-pink-600 mb-4">
          ✍️ Write a Love Letter
        </h2>

        <label className="block text-sm font-medium text-gray-700 mb-1">Author</label>
        <input
          type="text"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          placeholder="Anonymous"
          className="w-full p-2 border border-gray-300 rounded-md mb-4"
        />

        <label className="block text-sm font-medium text-gray-700 mb-1">Mood <span className="text-red-500">*</span></label>
        <select
          value={mood}
          onChange={(e) => setMood(e.target.value)}
          required
          className="w-full p-2 border border-gray-300 rounded-md mb-4"
        >
          <option value="" disabled>Select a mood</option>
          <option value="flirty">💋 Flirty</option>
          <option value="comforting">☁️ Comforting</option>
          <option value="wholesome">🌼 Wholesome</option>
          <option value="playful">😏 Playful</option>
          <option value="tired">😓 Tired</option>
          <option value="exhausted">😞 Exhausted</option>
          <option value="emotional">🥺 Emotional</option>
          <option value="mixed">😔 Mixed</option>
        </select>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Content <span className="text-red-500">*</span>
        </label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          maxLength={maxChars}
          rows={6}
          placeholder="Write your letter here..."
          className="w-full p-3 border border-gray-300 rounded-md mb-2 resize-none"
          required
        ></textarea>
        <div className="text-sm text-gray-500 text-right mb-4">{content.length} / {maxChars}</div>

        <button
          type="submit"
          className="w-full bg-pink-500 hover:bg-pink-600 text-white font-medium py-2 px-4 rounded-md transition"
        >
          Send to the Wind 💌
        </button>
      </form>
    </div>
  );
}
