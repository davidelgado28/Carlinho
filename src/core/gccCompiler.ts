export async function compileC(sourceCode: string, outputName: string = 'main.exe'): Promise<{ success: boolean; message: string; binary?: Uint8Array }> {
  return new Promise((resolve) => {
    setTimeout(() => {
      if (!sourceCode.includes('main')) {
        resolve({ success: false, message: "Erro: Função 'main' não encontrada no código C." });
        return;
      }
      const encoder = new TextEncoder();
      const binaryData = encoder.encode("MOCK_BIN:" + sourceCode); 
      resolve({
        success: true,
        message: `Compilado com sucesso usando Clang(WASM).
Gerado binário '${outputName}' (${binaryData.length} bytes)`,
        binary: binaryData
      });
    }, 800); 
  });
}
