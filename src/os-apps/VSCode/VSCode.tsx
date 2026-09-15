import React from 'react';
import Editor from '@monaco-editor/react';

export default function VSCode() {
  return (
    <Editor
      height="100%"
      defaultLanguage="c"
      theme="vs-dark"
      defaultValue="#include <stdio.h>\n\nint main() {\n  printf(\"Hello Carlinho OS!\\n\");\n  return 0;\n}"
    />
  );
}
