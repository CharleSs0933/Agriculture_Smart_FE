"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import dynamic from "next/dynamic";

// Dynamically import ReactQuill with no SSR
const ReactQuill = dynamic(() => import("./ReactQuillWrapper"), {
  ssr: false,
  loading: () => (
    <div className="border rounded-lg">
      <div className="h-12 bg-gray-50 border-b rounded-t-lg animate-pulse" />
      <div className="h-64 bg-white rounded-b-lg flex items-center justify-center">
        <div className="text-gray-400">Đang tải editor...</div>
      </div>
    </div>
  ),
});

import "react-quill-new/dist/quill.snow.css";

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export function RichTextEditor({
  value,
  onChange,
  placeholder = "Nhập nội dung bài viết...",
  className = "",
}: RichTextEditorProps) {
  const [isMounted, setIsMounted] = useState(false);
  const quillRef = useRef(null);

  // Only run on client side
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Quill modules configuration
  const modules = useMemo(
    () => ({
      toolbar: {
        container: [
          [{ header: [1, 2, 3, false] }],
          ["bold", "italic", "underline", "strike"],
          [{ color: [] }, { background: [] }],
          [{ script: "sub" }, { script: "super" }],
          ["blockquote", "code-block"],
          [{ list: "ordered" }, { list: "bullet" }],
          [{ indent: "-1" }, { indent: "+1" }],
          [{ align: [] }],
          ["link"],
          ["clean"],
        ],
      },
      clipboard: {
        matchVisual: false,
      },
    }),
    []
  );

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "color",
    "background",
    "script",
    "blockquote",
    "code-block",
    "list",
    "indent",
    "align",
    "link",
  ];

  // Don't render until mounted on client
  if (!isMounted) {
    return (
      <div className={`border rounded-lg ${className}`}>
        <div className="h-12 bg-gray-50 border-b rounded-t-lg animate-pulse" />
        <div className="h-64 bg-white rounded-b-lg flex items-center justify-center">
          <div className="text-gray-400">Đang tải editor...</div>
        </div>
      </div>
    );
  }

  return (
    <div className={className}>
      <ReactQuill
        ref={quillRef}
        theme="snow"
        value={value}
        onChange={onChange}
        modules={modules}
        formats={formats}
        placeholder={placeholder}
        style={{
          backgroundColor: "white",
        }}
      />

      <style jsx global>{`
        .ql-editor {
          min-height: 300px !important;
          font-size: 16px;
          line-height: 1.6;
        }

        .ql-editor h1 {
          font-size: 2rem;
          font-weight: bold;
          margin: 1rem 0;
        }

        .ql-editor h2 {
          font-size: 1.5rem;
          font-weight: bold;
          margin: 0.875rem 0;
        }

        .ql-editor h3 {
          font-size: 1.25rem;
          font-weight: bold;
          margin: 0.75rem 0;
        }

        .ql-editor blockquote {
          border-left: 4px solid #e5e7eb;
          padding-left: 1rem;
          margin: 1rem 0;
          font-style: italic;
          color: #6b7280;
        }

        .ql-editor pre {
          background-color: #f3f4f6;
          border: 1px solid #e5e7eb;
          border-radius: 0.5rem;
          padding: 1rem;
          margin: 1rem 0;
          overflow-x: auto;
        }

        .ql-editor img {
          max-width: 100%;
          height: auto;
          margin: 1rem 0;
          border-radius: 0.5rem;
        }

        .ql-toolbar {
          border-top: 1px solid #e5e7eb;
          border-left: 1px solid #e5e7eb;
          border-right: 1px solid #e5e7eb;
          border-bottom: none;
          border-top-left-radius: 0.5rem;
          border-top-right-radius: 0.5rem;
        }

        .ql-container {
          border-bottom: 1px solid #e5e7eb;
          border-left: 1px solid #e5e7eb;
          border-right: 1px solid #e5e7eb;
          border-top: none;
          border-bottom-left-radius: 0.5rem;
          border-bottom-right-radius: 0.5rem;
        }

        .ql-editor.ql-blank::before {
          color: #9ca3af;
          font-style: normal;
        }

        .ql-snow .ql-tooltip {
          z-index: 1000;
        }
      `}</style>
    </div>
  );
}
