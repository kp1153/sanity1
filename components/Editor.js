"use client";

import React from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import TextStyle from "@tiptap/extension-text-style";
import Color from "@tiptap/extension-color";
import Youtube from "@tiptap/extension-youtube";

import Toolbar from "./Toolbar"; // 👈 Toolbar.jsx यहाँ import होगा

export default function Editor() {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      TextStyle,
      Color,
      Youtube.configure({
        controls: true,
        nocookie: false,
        allowFullscreen: true,
        width: 640,
        height: 360,
      }),
    ],
    content: "",
  });

  return (
    <div className="border rounded-lg overflow-hidden bg-white dark:bg-gray-800">
      {/* Toolbar */}
      <Toolbar editor={editor} />

      {/* Editor content */}
      <div className="p-2 min-h-[200px]">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
}
