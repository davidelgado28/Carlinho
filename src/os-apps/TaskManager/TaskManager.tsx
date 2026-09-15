import React, { useState, useEffect } from 'react';
import { useSystemStore } from '@/store/useSystemStore';

export default function TaskManager() {
  const { windows, closeApp } = useSystemStore();
  const [ram, setRam] = useState(1.2);

  useEffect(() => {
    const interval = setInterval(() => {
      setRam(prev => Math.max(0.5, prev + (Math.random() * 0.2 - 0.1)));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-4 text-white bg-[#1e1e1e] h-full flex flex-col">
      <div className="mb-4 border-b border-gray-700 pb-2 flex justify-between items-end">
        <h2 className="text-lg font-bold">Gerenciador de Tarefas</h2>
        <span className="text-xs text-green-400">RAM: {ram.toFixed(2)} GB / 4.00 GB (WASM)</span>
      </div>
      <div className="flex-1 overflow-auto">
        <table className="w-full text-left border-collapse text-sm">
          <thead>
            <tr className="border-b border-gray-700 text-gray-400">
              <th className="pb-2 font-medium">Processo (App)</th>
              <th className="pb-2 font-medium">Status</th>
              <th className="pb-2 font-medium text-right">Ação</th>
            </tr>
          </thead>
          <tbody>
            {windows.map(w => (
              <tr key={w.id} className="border-b border-gray-800 hover:bg-white/5">
                <td className="py-2 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-green-500"></span>
                  {w.title}
                </td>
                <td className="py-2 text-gray-300">Em Execução</td>
                <td className="py-2 text-right">
                  <button onClick={() => closeApp(w.id)} className="text-red-500 hover:text-red-400 hover:underline">Matar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
