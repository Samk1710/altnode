"use client";

import { useRef, useEffect } from 'react'
import MonacoEditor from '@monaco-editor/react'
import * as monaco from 'monaco-editor'

interface EditorProps {
  code: string;
  onChange: (value: string | undefined, event: monaco.editor.IModelContentChangedEvent) => void;
}

export default function Editor({ code, onChange }: EditorProps) {
  const editorRef = useRef<EditorInstance | null>(null)

  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.focus()
    }
  }, [])

  interface EditorInstance {
    focus: () => void;
  }

  const handleEditorDidMount = (editor: EditorInstance) => {
    editorRef.current = editor
  }

  return (
    <div className="h-[calc(100vh-24rem)] rounded-2xl overflow-hidden">
      <MonacoEditor
        height="100%"
        language="python"
        theme="vs-dark"
        value={code}
        onChange={onChange}
        onMount={handleEditorDidMount}
        options={{
          minimap: { enabled: false },
          scrollBeyondLastLine: false,
          wordWrap: 'on',
          fontSize: 15,
          lineNumbers: 'on',
          renderLineHighlight: 'all',
          automaticLayout: true,
          theme: 'vs-dark',
        }}
      />
    </div>
  )
}

