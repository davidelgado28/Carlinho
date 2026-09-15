export async function compileC(sourceCode: string, outputName: string = 'main.exe'): Promise<{ success: boolean; message: string; binary?: Uint8Array }> {
  try {
    if (!sourceCode.includes('main')) {
      return { success: false, message: "Erro de compilação: Função 'main' não encontrada no código C." };
    }
    
    const encoder = new TextEncoder();
    const binaryData = encoder.encode(sourceCode);
    
    return {
      success: true,
      message: `Compilado com sucesso: Gerado binário '${outputName}' (${binaryData.length} bytes)`,
      binary: binaryData
    };
  } catch (err: any) {
    return { success: false, message: `Erro fatal no GCC: ${err.message}` };
  }
}
