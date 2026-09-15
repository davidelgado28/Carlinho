import React from 'react';
import { motion } from 'framer-motion';
import { useSystemStore, WindowState } from '@/store/useSystemStore';
import { X, Minus, Square } from 'lucide-react';

interface WindowProps {
  windowState: WindowState;
  children: React.ReactNode;
}

export default function Window({ windowState, children }: WindowProps) {
  const { closeApp, minimizeApp, maximizeApp, focusWindow } = useSystemStore();

  if (windowState.isMinimized) return null;

  return (
    <motion.div
      drag={!windowState.isMaximized}
      dragConstraints={{ left: 0, right: window.innerWidth - 200, top: 0, bottom: window.innerHeight - 100 }}
      dragMomentum={false}
      onMouseDown={() => focusWindow(windowState.id)}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      style={{
        position: 'absolute',
        zIndex: windowState.zIndex,
        ...(windowState.isMaximized ? {
          top: 0, left: 0, width: '100%', height: 'calc(100% - 3rem)'
        } : {
          top: '10%', left: '10%', width: 800, height: 600
        })
      }}
      className="bg-[#1e1e1e] border border-gray-700 rounded-lg shadow-2xl overflow-hidden flex flex-col"
    >
      <div className="h-8 bg-[#2d2d2d] flex items-center justify-between px-2 cursor-grab active:cursor-grabbing border-b border-gray-900">
        <div className="text-gray-300 text-sm font-semibold">{windowState.title}</div>
        <div className="flex space-x-2">
          <button onClick={() => minimizeApp(windowState.id)} className="text-gray-400 hover:text-white"><Minus size={16} /></button>
          <button onClick={() => maximizeApp(windowState.id)} className="text-gray-400 hover:text-white"><Square size={14} /></button>
          <button onClick={() => closeApp(windowState.id)} className="text-gray-400 hover:text-red-500"><X size={16} /></button>
        </div>
      </div>
      <div className="flex-1 bg-black overflow-hidden relative">
        {children}
      </div>
    </motion.div>
  );
}
