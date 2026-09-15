'use client';
import React, { useEffect, useState } from 'react';
import Desktop from '@/components/system/Desktop';
import Taskbar from '@/components/system/Taskbar';
import Window from '@/components/system/Window';
import { useSystemStore } from '@/store/useSystemStore';
import TerminalApp from '@/os-apps/Terminal/Terminal';
import VSCodeApp from '@/os-apps/VSCode/VSCode';
import BrowserApp from '@/os-apps/Browser/Browser';
import ExplorerApp from '@/os-apps/FileExplorer/FileExplorer';
import TaskManagerApp from '@/os-apps/TaskManager/TaskManager';

export default function OS() {
  const windows = useSystemStore(state => state.windows);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <div className="w-screen h-screen bg-black" />;

  const renderApp = (appId: string) => {
    switch (appId) {
      case 'terminal': return <TerminalApp />;
      case 'vscode': return <VSCodeApp />;
      case 'browser': return <BrowserApp />;
      case 'explorer': return <ExplorerApp />;
      case 'taskmanager': return <TaskManagerApp />;
      default: return <div className="p-4 text-white">App not found</div>;
    }
  };

  return (
    <main
      className="w-screen h-screen flex flex-col overflow-hidden bg-cover bg-center"
      style={{ backgroundImage: 'url("/wallpaper.jpg")', backgroundColor: '#2b5a84' }}
    >
      <div className="flex-1 relative">
        <Desktop />
        {windows.map(w => (
          <Window key={w.id} windowState={w}>
            {renderApp(w.appId)}
          </Window>
        ))}
      </div>
      <Taskbar />
    </main>
  );
}
