import { create } from 'zustand';

export type AppId = 'terminal' | 'vscode' | 'browser' | 'explorer' | 'taskmanager';

export interface WindowState {
  id: string;
  appId: AppId;
  title: string;
  isOpen: boolean;
  isMinimized: boolean;
  isMaximized: boolean;
  zIndex: number;
}

export type FileData = { name: string; content: string | Uint8Array; type: 'text' | 'binary' };

interface SystemStore {
  windows: WindowState[];
  activeWindowId: string | null;
  files: Record<string, FileData>;
  openApp: (appId: AppId, title: string) => void;
  closeApp: (id: string) => void;
  minimizeApp: (id: string) => void;
  maximizeApp: (id: string) => void;
  focusWindow: (id: string) => void;
  writeFile: (path: string, content: string | Uint8Array, type: 'text' | 'binary') => void;
  deleteFile: (path: string) => void;
}

let nextZIndex = 1;

export const useSystemStore = create<SystemStore>((set) => ({
  windows: [],
  activeWindowId: null,
  files: {
    'main.c': { name: 'main.c', content: '#include <stdio.h>\n\nint main() {\n  printf("Hello Carlinho OS!\\n");\n  return 0;\n}', type: 'text' },
    'app.py': { name: 'app.py', content: 'print("Hello from Python in Carlinho OS!")', type: 'text' }
  },

  openApp: (appId, title) => set((state) => {
    const existingWindow = state.windows.find(w => w.appId === appId);
    if (existingWindow) {
        return {
            windows: state.windows.map(w => w.appId === appId ? { ...w, isMinimized: false, zIndex: ++nextZIndex } : w),
            activeWindowId: existingWindow.id
        };
    }
    const newWindow: WindowState = {
      id: `${appId}-${Date.now()}`,
      appId, title, isOpen: true, isMinimized: false, isMaximized: false, zIndex: ++nextZIndex,
    };
    return { windows: [...state.windows, newWindow], activeWindowId: newWindow.id };
  }),

  closeApp: (id) => set((state) => ({
    windows: state.windows.filter(w => w.id !== id),
    activeWindowId: state.activeWindowId === id ? null : state.activeWindowId
  })),

  minimizeApp: (id) => set((state) => ({
    windows: state.windows.map(w => w.id === id ? { ...w, isMinimized: true } : w),
    activeWindowId: state.activeWindowId === id ? null : state.activeWindowId
  })),

  maximizeApp: (id) => set((state) => ({
    windows: state.windows.map(w => w.id === id ? { ...w, isMaximized: !w.isMaximized } : w)
  })),

  focusWindow: (id) => set((state) => ({
    windows: state.windows.map(w => w.id === id ? { ...w, zIndex: ++nextZIndex } : w),
    activeWindowId: id
  })),

  writeFile: (path, content, type) => set((state) => ({
    files: { ...state.files, [path]: { name: path, content, type } }
  })),

  deleteFile: (path) => set((state) => {
    const newFiles = { ...state.files };
    delete newFiles[path];
    return { files: newFiles };
  })
}));
