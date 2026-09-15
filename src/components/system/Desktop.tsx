import React from 'react';
import { useSystemStore, AppId } from '@/store/useSystemStore';
import { Terminal, Code, Globe, Folder, Activity } from 'lucide-react';

const APPS: { id: AppId; title: string; icon: React.ReactNode }[] = [
  { id: 'terminal', title: 'Terminal', icon: <Terminal size={32} /> },
  { id: 'vscode', title: 'VS Code', icon: <Code size={32} /> },
  { id: 'browser', title: 'Navegador', icon: <Globe size={32} /> },
  { id: 'explorer', title: 'Arquivos', icon: <Folder size={32} /> },
  { id: 'taskmanager', title: 'Tarefas', icon: <Activity size={32} /> },
];

export default function Desktop() {
  const openApp = useSystemStore(state => state.openApp);

  return (
    <div className="flex-1 p-4 grid grid-cols-1 gap-4 content-start w-24">
      {APPS.map(app => (
        <div
          key={app.id}
          className="flex flex-col items-center justify-center p-2 rounded-lg hover:bg-white/20 cursor-pointer text-white"
          onDoubleClick={() => openApp(app.id, app.title)}
        >
          {app.icon}
          <span className="text-xs mt-1 drop-shadow-md">{app.title}</span>
        </div>
      ))}
    </div>
  );
}
