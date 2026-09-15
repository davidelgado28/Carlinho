let pyodideInstance: any = null;

export async function initPython() {
  if (pyodideInstance) return pyodideInstance;
  if (!(window as any).loadPyodide) {
    await new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = "https://cdn.jsdelivr.net/pyodide/v0.25.0/full/pyodide.js";
      script.onload = resolve;
      script.onerror = reject;
      document.head.appendChild(script);
    });
  }
  pyodideInstance = await (window as any).loadPyodide();
  return pyodideInstance;
}

export async function runPythonCode(code: string): Promise<string> {
  try {
    const py = await initPython();
    py.runPython(`
import sys
import io
sys.stdout = io.StringIO()
sys.stderr = io.StringIO()
    `);
    await py.runPythonAsync(code);
    const stdout = py.runPython("sys.stdout.getvalue()");
    const stderr = py.runPython("sys.stderr.getvalue()");
    return stdout + stderr || "Executado sem saída.";
  } catch (err: any) {
    return `Erro Python: ${err.message}`;
  }
}
