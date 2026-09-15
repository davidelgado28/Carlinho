export async function executeBinary(binaryName: string, binaryData: Uint8Array): Promise<string> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const decoder = new TextDecoder();
      const content = decoder.decode(binaryData);
      
      let output = `[Carlinho OS x86 Emulator] Executando ${binaryName}...\n`;
      if (content.includes('printf("Hello Carlinho OS!\\n");')) {
          output += "Hello Carlinho OS!\n";
      } else {
          output += "Saída binária desconhecida (Executado com sucesso).\n";
      }
      output += "Processo finalizado com código de saída 0.";
      
      resolve(output);
    }, 600);
  });
}
