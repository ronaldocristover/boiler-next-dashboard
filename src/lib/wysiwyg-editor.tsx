"use client";

import { useState, useRef, useEffect } from "react";

interface WysiwygEditorProps {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    className?: string;
}

export function WysiwygEditor({ value, onChange, placeholder = "Start typing...", className = "" }: WysiwygEditorProps) {
    const editorRef = useRef<HTMLDivElement>(null);
    const [isInitialized, setIsInitialized] = useState(false);

    useEffect(() => {
        if (editorRef.current && !isInitialized) {
            editorRef.current.innerHTML = value;
            setIsInitialized(true);
        }
    }, [value, isInitialized]);

    const handleInput = () => {
        if (editorRef.current) {
            onChange(editorRef.current.innerHTML);
        }
    };

    const execCommand = (command: string, value?: string) => {
        document.execCommand(command, false, value);
        editorRef.current?.focus();
        handleInput();
    };

    const isActive = (command: string) => {
        return document.queryCommandState(command);
    };

    const insertLink = () => {
        const url = prompt("Enter URL:");
        if (url) {
            execCommand("createLink", url);
        }
    };

    const changeFontSize = (size: string) => {
        execCommand("fontSize", size);
    };

    const changeTextColor = (color: string) => {
        execCommand("foreColor", color);
    };

    const changeBackgroundColor = (color: string) => {
        execCommand("backColor", color);
    };

    return (
        <div className={`border rounded-md bg-background ${className}`}>
            {/* Toolbar */}
            <div className="border-b p-2 flex flex-wrap gap-1">
                {/* Text Formatting */}
                <div className="flex gap-1 border-r pr-2 mr-2">
                    <button
                        type="button"
                        onClick={() => execCommand("bold")}
                        className={`p-2 rounded hover:bg-accent transition-colors ${isActive("bold") ? "bg-accent" : ""}`}
                        title="Bold"
                    >
                        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 4h8a4 4 0 014 4 4 4 0 01-4 4H6z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 12h9a4 4 0 014 4 4 4 0 01-4 4H6z" />
                        </svg>
                    </button>
                    <button
                        type="button"
                        onClick={() => execCommand("italic")}
                        className={`p-2 rounded hover:bg-accent transition-colors ${isActive("italic") ? "bg-accent" : ""}`}
                        title="Italic"
                    >
                        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 4h-9M14 20H5m8-16l-3 12" />
                        </svg>
                    </button>
                    <button
                        type="button"
                        onClick={() => execCommand("underline")}
                        className={`p-2 rounded hover:bg-accent transition-colors ${isActive("underline") ? "bg-accent" : ""}`}
                        title="Underline"
                    >
                        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v12m0 0a4 4 0 01-4-4V4h8v12a4 4 0 01-4 4zM4 20h16" />
                        </svg>
                    </button>
                    <button
                        type="button"
                        onClick={() => execCommand("strikethrough")}
                        className={`p-2 rounded hover:bg-accent transition-colors ${isActive("strikethrough") ? "bg-accent" : ""}`}
                        title="Strikethrough"
                    >
                        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2v4m0 0v4m0-4h8m-8 0H4" />
                        </svg>
                    </button>
                </div>

                {/* Alignment */}
                <div className="flex gap-1 border-r pr-2 mr-2">
                    <button
                        type="button"
                        onClick={() => execCommand("justifyLeft")}
                        className="p-2 rounded hover:bg-accent transition-colors"
                        title="Align Left"
                    >
                        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6h18M3 12h12M3 18h18" />
                        </svg>
                    </button>
                    <button
                        type="button"
                        onClick={() => execCommand("justifyCenter")}
                        className="p-2 rounded hover:bg-accent transition-colors"
                        title="Align Center"
                    >
                        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6h18M3 12h18M3 18h18" />
                        </svg>
                    </button>
                    <button
                        type="button"
                        onClick={() => execCommand("justifyRight")}
                        className="p-2 rounded hover:bg-accent transition-colors"
                        title="Align Right"
                    >
                        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6h18M9 12h12M3 18h18" />
                        </svg>
                    </button>
                </div>

                {/* Lists */}
                <div className="flex gap-1 border-r pr-2 mr-2">
                    <button
                        type="button"
                        onClick={() => execCommand("insertUnorderedList")}
                        className="p-2 rounded hover:bg-accent transition-colors"
                        title="Bullet List"
                    >
                        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </button>
                    <button
                        type="button"
                        onClick={() => execCommand("insertOrderedList")}
                        className="p-2 rounded hover:bg-accent transition-colors"
                        title="Numbered List"
                    >
                        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4h13M3 8h9l1 1-1 1H3m0 6h13m-10-3L4 15l2 2" />
                        </svg>
                    </button>
                </div>

                {/* Font Size */}
                <div className="flex gap-1 border-r pr-2 mr-2">
                    <select
                        onChange={(e) => changeFontSize(e.target.value)}
                        className="px-2 py-1 border rounded text-sm bg-background"
                        title="Font Size"
                    >
                        <option value="1">8pt</option>
                        <option value="2">10pt</option>
                        <option value="3" selected>12pt</option>
                        <option value="4">14pt</option>
                        <option value="5">18pt</option>
                        <option value="6">24pt</option>
                        <option value="7">36pt</option>
                    </select>
                </div>

                {/* Colors */}
                <div className="flex gap-1 border-r pr-2 mr-2">
                    <input
                        type="color"
                        onChange={(e) => changeTextColor(e.target.value)}
                        className="w-8 h-8 border rounded cursor-pointer"
                        title="Text Color"
                    />
                    <input
                        type="color"
                        onChange={(e) => changeBackgroundColor(e.target.value)}
                        className="w-8 h-8 border rounded cursor-pointer"
                        title="Background Color"
                    />
                </div>

                {/* Links and Actions */}
                <div className="flex gap-1">
                    <button
                        type="button"
                        onClick={insertLink}
                        className="p-2 rounded hover:bg-accent transition-colors"
                        title="Insert Link"
                    >
                        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                        </svg>
                    </button>
                    <button
                        type="button"
                        onClick={() => execCommand("removeFormat")}
                        className="p-2 rounded hover:bg-accent transition-colors"
                        title="Clear Formatting"
                    >
                        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
            </div>

            {/* Editor */}
            <div
                ref={editorRef}
                contentEditable
                onInput={handleInput}
                className="min-h-[200px] p-4 focus:outline-none"
                style={{ minHeight: "200px" }}
                data-placeholder={placeholder}
            />

            <style jsx>{`
                [contenteditable]:empty:before {
                    content: attr(data-placeholder);
                    color: #9ca3af;
                    font-style: italic;
                }
            `}</style>
        </div>
    );
}