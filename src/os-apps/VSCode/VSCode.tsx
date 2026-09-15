import React, { useState, useEffect } from 'react';
import Editor from '@monaco-editor/react';
import { useSystemStore } from '@/store/useSystemStore';
import { Save } from 'lucide-react';

export default function VSCode() {
  const { files, writeFile } = useSystemStore();
  const [currentFile, setCurrentFile] = useState('main.c');
  const [code, setCode] = useState('');

  useEffect(() => {
    if (files[currentFile] && files[currentFile].type === 'text') {
      setCode(files[currentFile].content as string);
    }
  }, [currentFile]); 

  const handleSave = () => {
    writeFile(currentFile, code, 'text');
  };

  const textFiles = Object.keys(files).filter(k => files[k].type === 'text');

  return (
    <div className="h-full flex flex-col bg-[#1e1e1e]">
      <div className="flex bg-[#2d2d2d] border-b border-gray-700">
        {textFiles.map(f => (
          <div 
            key={f} 
            onClick={() => setCurrentFile(f)}
            className={`px-4 py-2 text-sm cursor-pointer border-r border-gray-700 ${currentFile === f ? 'bg-[#1e1e1e] text-blue-400 border-t-2 border-t-blue-500' : 'text-gray-400 hover:bg-[#252525]'}`}
          >
            {f}
          </div>
        ))}
        <button onClick={handleSave} className="ml-auto px-4 text-gray-400 hover:text-white flex items-center gap-2" title="Save (Ctrl+S)">
          <Save size={16} /> Salvar
        </button>
      </div>
      <div className="flex-1">
        <Editor
          height="100%"
          language={currentFile.endsWith('.py') ? 'python' : 'c'}
          theme="vs-dark"
          value={code}
          onChange={(val) => setCode(val || '')}
        />
      </div>
    </div>
  );
}
