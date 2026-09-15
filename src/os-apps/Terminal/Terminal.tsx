import React, { useState, useRef, useEffect } from 'react';
import { useSystemStore } from '@/store/useSystemStore';
import { runPythonCode } from '@/core/pythonRunner';
import { compileC } from '@/core/gccCompiler';
import { executeBinary } from '@/core/exeRunner';

export default function Terminal() {
  const { files, writeFile } = useSystemStore();
  const [history, setHistory] = useState<{ text: string, type: 'in' | 'out' | 'err' }[]>([
    { text: 'Carlinho OS Terminal v1.0', type: 'out' },
    { text: "Type 'help' to see available commands.", type: 'out' }
  ]);
  const [input, setInput] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const handleCommand = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && input.trim() && !isProcessing) {
      const cmd = input.trim();
      setInput('');
      setHistory(prev => [...prev, { text: `user@carlinho:~$ ${cmd}`, type: 'in' }]);
      setIsProcessing(true);

      const args = cmd.split(' ');
      const baseCmd = args[0];

      try {
        if (baseCmd === 'help') {
          setHistory(prev => [...prev, { text: 'Comandos: ls, cat <file>, python <file.py>, gcc <file.c> -o <out.exe>, ./<exe>, clear', type: 'out' }]);
        } else if (baseCmd === 'clear') {
          setHistory([]);
        } else if (baseCmd === 'ls') {
          setHistory(prev => [...prev, { text: Object.keys(files).join('  '), type: 'out' }]);
        } else if (baseCmd === 'cat') {
          const file = files[args[1]];
          if (file) setHistory(prev => [...prev, { text: file.content.toString(), type: 'out' }]);
          else setHistory(prev => [...prev, { text: `cat: ${args[1]}: Arquivo não encontrado`, type: 'err' }]);
        } else if (baseCmd === 'python') {
          const file = files[args[1]];
          if (file && file.type === 'text') {
            setHistory(prev => [...prev, { text: 'Carregando interpretador Python (WASM)...', type: 'out' }]);
            const out = await runPythonCode(file.content as string);
            setHistory(prev => [...prev, { text: out, type: 'out' }]);
          } else {
            setHistory(prev => [...prev, { text: `python: ${args[1]}: Arquivo não encontrado ou inválido`, type: 'err' }]);
          }
        } else if (baseCmd === 'gcc') {
          const file = files[args[1]];
          const outName = args[3] || 'a.exe';
          if (file && file.type === 'text') {
            const result = await compileC(file.content as string, outName);
            if (result.success && result.binary) {
              writeFile(outName, result.binary, 'binary');
              setHistory(prev => [...prev, { text: result.message, type: 'out' }]);
            } else {
              setHistory(prev => [...prev, { text: result.message, type: 'err' }]);
            }
          } else {
             setHistory(prev => [...prev, { text: `gcc: ${args[1]}: Arquivo C não encontrado`, type: 'err' }]);
          }
        } else if (baseCmd.startsWith('./')) {
          const exeName = baseCmd.slice(2);
          const file = files[exeName];
          if (file && file.type === 'binary') {
            const out = await executeBinary(exeName, file.content as Uint8Array);
            setHistory(prev => [...prev, { text: out, type: 'out' }]);
          } else {
            setHistory(prev => [...prev, { text: `bash: ${baseCmd}: Permissão negada ou arquivo não encontrado`, type: 'err' }]);
          }
        } else {
          setHistory(prev => [...prev, { text: `bash: ${baseCmd}: comando não encontrado`, type: 'err' }]);
        }
      } catch (err: any) {
        setHistory(prev => [...prev, { text: `Erro no sistema: ${err.message}`, type: 'err' }]);
      }
      setIsProcessing(false);
    }
  };

  return (
    <div className="p-2 font-mono text-sm h-full w-full bg-black flex flex-col overflow-auto text-green-400 cursor-text" onClick={() => document.getElementById('term-input')?.focus()}>
      {history.map((h, i) => (
        <div key={i} className={`whitespace-pre-wrap ${h.type === 'err' ? 'text-red-400' : h.type === 'in' ? 'text-blue-300' : 'text-green-400'}`}>
          {h.text}
        </div>
      ))}
      <div className="mt-1 flex">
        <span className="mr-2 text-blue-400">user@carlinho:~$</span>
        <input 
          id="term-input"
          className="bg-transparent outline-none flex-1 text-white border-none focus:ring-0" 
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={handleCommand}
          disabled={isProcessing}
          autoFocus 
          autoComplete="off"
        />
      </div>
      <div ref={endRef} />
    </div>
  );
}
