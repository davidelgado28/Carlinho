import React from 'react';
import { File, Folder } from 'lucide-react';

export default function FileExplorer() {
  return (
    <div className="flex h-full text-white bg-[#1e1e1e]">
      <div className="w-48 border-r border-gray-700 p-2">
        <div className="font-bold mb-2 text-sm text-gray-300">Acesso Rápido</div>
        <div className="text-sm text-gray-400 cursor-pointer hover:text-white py-1">Área de Trabalho</div>
        <div className="text-sm text-gray-400 cursor-pointer hover:text-white py-1">Projetos</div>
        <div className="text-sm text-gray-400 cursor-pointer hover:text-white py-1">Binários</div>
      </div>
      <div className="flex-1 p-4 flex gap-4 content-start">
        <div className="flex flex-col items-center cursor-pointer hover:bg-white/10 p-2 rounded w-20">
          <Folder size={40} className="text-blue-400" />
          <span className="text-xs mt-1 truncate w-full text-center">src</span>
        </div>
        <div className="flex flex-col items-center cursor-pointer hover:bg-white/10 p-2 rounded w-20">
          <File size={40} className="text-gray-400" />
          <span className="text-xs mt-1 truncate w-full text-center">main.c</span>
        </div>
        <div className="flex flex-col items-center cursor-pointer hover:bg-white/10 p-2 rounded w-20">
          <File size={40} className="text-green-400" />
          <span className="text-xs mt-1 truncate w-full text-center">main.exe</span>
        </div>
      </div>
    </div>
  );
}
