import React from 'react';
import { File, Folder, Code } from 'lucide-react';
import { useSystemStore } from '@/store/useSystemStore';

export default function FileExplorer() {
  const { files, openApp } = useSystemStore();

  const handleDoubleClick = (filename: string, type: string) => {
    if (type === 'text') openApp('vscode', 'VS Code');
    else if (type === 'binary') openApp('terminal', 'Terminal');
  };

  return (
    <div className="flex h-full text-white bg-[#1e1e1e]">
      <div className="w-48 border-r border-gray-700 p-2">
        <div className="font-bold mb-2 text-sm text-gray-300">Acesso Rápido</div>
        <div className="text-sm text-gray-400 cursor-pointer hover:text-white py-1">/home/user</div>
      </div>
      <div className="flex-1 p-4 flex gap-4 content-start flex-wrap">
        {Object.values(files).map((file) => (
          <div 
            key={file.name} 
            onDoubleClick={() => handleDoubleClick(file.name, file.type)}
            className="flex flex-col items-center justify-start cursor-pointer hover:bg-white/10 p-2 rounded w-24 h-24 text-center"
          >
            {file.type === 'binary' ? <File size={40} className="text-green-400" /> : <Code size={40} className="text-blue-400" />}
            <span className="text-xs mt-2 break-all">{file.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
