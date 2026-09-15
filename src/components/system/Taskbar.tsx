import React, { useState, useEffect } from 'react';
import { useSystemStore } from '@/store/useSystemStore';
import { Terminal, Code, Globe, Folder, Activity } from 'lucide-react';

const ICONS: Record<string, React.ReactNode> = {
    terminal: <Terminal size={20} />,
    vscode: <Code size={20} />,
    browser: <Globe size={20} />,
    explorer: <Folder size={20} />,
    taskmanager: <Activity size={20} />
};

export default function Taskbar() {
  const { windows, focusWindow, minimizeApp } = useSystemStore();
  const [time, setTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-12 bg-taskbar backdrop-blur-md border-t border-white/10 flex items-center justify-between px-2 z-[9999] relative">
      <div className="flex items-center space-x-2">
        <button className="h-10 w-10 flex items-center justify-center hover:bg-white/10 rounded">
          <div className="w-4 h-4 bg-blue-500 rounded-full" />
        </button>
        {windows.map(w => (
          <button
            key={w.id}
            onClick={() => w.isMinimized ? focusWindow(w.id) : minimizeApp(w.id)}
            className={`h-10 px-3 flex items-center space-x-2 rounded text-white ${!w.isMinimized ? 'bg-white/20' : 'hover:bg-white/10'}`}
          >
            {ICONS[w.appId]}
          </button>
        ))}
      </div>
      <div className="text-white text-sm pr-4">
        {time}
      </div>
    </div>
  );
}
