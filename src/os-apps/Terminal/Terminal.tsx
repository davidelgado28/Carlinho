import React from 'react';
export default function Terminal() {
  return (
    <div className="p-2 text-green-400 font-mono text-sm h-full w-full bg-black flex flex-col">
      <div>Carlinho OS Terminal v1.0</div>
      <div>Type 'help' to see available commands.</div>
      <div className="mt-2 flex">
        <span className="mr-2 text-blue-400">user@carlinho:~$</span>
        <input className="bg-transparent outline-none flex-1 text-white border-none focus:ring-0" autoFocus />
      </div>
    </div>
  );
}
