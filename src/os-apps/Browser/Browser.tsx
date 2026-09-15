import React, { useState } from 'react';
export default function Browser() {
  const [url, setUrl] = useState('https://duckduckgo.com/');
  const [input, setInput] = useState('https://duckduckgo.com/');
  const handleNav = (e: React.FormEvent) => {
    e.preventDefault();
    setUrl(!input.startsWith('http') ? 'https://' + input : input);
  };
  return (
    <div className="flex flex-col h-full bg-white">
      <form onSubmit={handleNav} className="flex p-2 bg-gray-200 gap-2 border-b">
        <input className="flex-1 px-2 py-1 border rounded text-black" value={input} onChange={(e) => setInput(e.target.value)} />
        <button className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600 transition">Ir</button>
      </form>
      <iframe src={url} className="flex-1 w-full border-none bg-white" sandbox="allow-scripts allow-same-origin" />
    </div>
  );
}
