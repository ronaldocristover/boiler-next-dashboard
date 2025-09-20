"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Toggle } from "@/components/ui/toggle";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Bold,
    Italic,
    Underline,
    Strikethrough,
    AlignLeft,
    AlignCenter,
    AlignRight,
    List,
    ListOrdered,
    Link2,
    RotateCcw
} from "lucide-react";

interface WysiwygEditorProps {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    className?: string;
}

export function WysiwygEditor({ value, onChange, placeholder = "Start typing...", className = "" }: WysiwygEditorProps) {
    const [formattingOptions, setFormattingOptions] = useState({
        bold: false,
        italic: false,
        underline: false,
        strikethrough: false,
        alignment: "left",
        fontSize: "14",
        textColor: "#000000",
        backgroundColor: "#ffffff"
    });
    const [linkUrl, setLinkUrl] = useState("");
    const [showLinkPopover, setShowLinkPopover] = useState(false);

    const handleFormatToggle = (format: string, isActive: boolean) => {
        setFormattingOptions(prev => ({
            ...prev,
            [format]: isActive
        }));
    };

    const formatText = (formatType: string, formatValue?: string) => {
        const textarea = document.getElementById('rich-textarea') as HTMLTextAreaElement;
        if (!textarea) return;

        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        const selectedText = textarea.value.substring(start, end);

        let formattedText = selectedText;

        switch (formatType) {
            case 'bold':
                formattedText = `**${selectedText}**`;
                break;
            case 'italic':
                formattedText = `*${selectedText}*`;
                break;
            case 'underline':
                formattedText = `<u>${selectedText}</u>`;
                break;
            case 'strikethrough':
                formattedText = `~~${selectedText}~~`;
                break;
            case 'link':
                formattedText = `[${selectedText || 'Link Text'}](${formatValue || linkUrl})`;
                break;
            case 'list':
                formattedText = `\n- ${selectedText}`;
                break;
            case 'orderedList':
                formattedText = `\n1. ${selectedText}`;
                break;
            case 'clear':
                formattedText = selectedText.replace(/(\*\*|__|\*|_|~~|<u>|<\/u>)/g, '');
                break;
        }

        const newValue = value.substring(0, start) + formattedText + value.substring(end);
        onChange(newValue);

        // Restore focus and selection
        setTimeout(() => {
            textarea.focus();
            textarea.setSelectionRange(start, start + formattedText.length);
        }, 0);
    };

    const insertLink = () => {
        if (linkUrl) {
            formatText('link', linkUrl);
            setLinkUrl("");
            setShowLinkPopover(false);
        }
    };

    return (
        <div className={`border rounded-md bg-background ${className}`}>
            {/* Toolbar */}
            <div className="border-b p-2 flex flex-wrap gap-1 items-center">
                {/* Text Formatting */}
                <div className="flex gap-1 items-center">
                    <Toggle
                        pressed={formattingOptions.bold}
                        onPressedChange={(pressed) => {
                            handleFormatToggle('bold', pressed);
                            if (pressed) formatText('bold');
                        }}
                        size="sm"
                        aria-label="Bold"
                    >
                        <Bold className="h-4 w-4" />
                    </Toggle>
                    <Toggle
                        pressed={formattingOptions.italic}
                        onPressedChange={(pressed) => {
                            handleFormatToggle('italic', pressed);
                            if (pressed) formatText('italic');
                        }}
                        size="sm"
                        aria-label="Italic"
                    >
                        <Italic className="h-4 w-4" />
                    </Toggle>
                    <Toggle
                        pressed={formattingOptions.underline}
                        onPressedChange={(pressed) => {
                            handleFormatToggle('underline', pressed);
                            if (pressed) formatText('underline');
                        }}
                        size="sm"
                        aria-label="Underline"
                    >
                        <Underline className="h-4 w-4" />
                    </Toggle>
                    <Toggle
                        pressed={formattingOptions.strikethrough}
                        onPressedChange={(pressed) => {
                            handleFormatToggle('strikethrough', pressed);
                            if (pressed) formatText('strikethrough');
                        }}
                        size="sm"
                        aria-label="Strikethrough"
                    >
                        <Strikethrough className="h-4 w-4" />
                    </Toggle>
                </div>

                <Separator orientation="vertical" className="h-6" />

                {/* Alignment */}
                <div className="flex gap-1">
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setFormattingOptions(prev => ({ ...prev, alignment: 'left' }))}
                    >
                        <AlignLeft className="h-4 w-4" />
                    </Button>
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setFormattingOptions(prev => ({ ...prev, alignment: 'center' }))}
                    >
                        <AlignCenter className="h-4 w-4" />
                    </Button>
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setFormattingOptions(prev => ({ ...prev, alignment: 'right' }))}
                    >
                        <AlignRight className="h-4 w-4" />
                    </Button>
                </div>

                <Separator orientation="vertical" className="h-6" />

                {/* Lists */}
                <div className="flex gap-1">
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => formatText('list')}
                    >
                        <List className="h-4 w-4" />
                    </Button>
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => formatText('orderedList')}
                    >
                        <ListOrdered className="h-4 w-4" />
                    </Button>
                </div>

                <Separator orientation="vertical" className="h-6" />

                {/* Font Size */}
                <Select
                    value={formattingOptions.fontSize}
                    onValueChange={(value) => setFormattingOptions(prev => ({ ...prev, fontSize: value }))}
                >
                    <SelectTrigger className="w-20 h-8">
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="12">12px</SelectItem>
                        <SelectItem value="14">14px</SelectItem>
                        <SelectItem value="16">16px</SelectItem>
                        <SelectItem value="18">18px</SelectItem>
                        <SelectItem value="20">20px</SelectItem>
                        <SelectItem value="24">24px</SelectItem>
                    </SelectContent>
                </Select>

                <Separator orientation="vertical" className="h-6" />

                {/* Colors */}
                <div className="flex gap-1">
                    <input
                        type="color"
                        value={formattingOptions.textColor}
                        onChange={(e) => setFormattingOptions(prev => ({ ...prev, textColor: e.target.value }))}
                        className="w-8 h-8 border rounded cursor-pointer"
                        title="Text Color"
                    />
                    <input
                        type="color"
                        value={formattingOptions.backgroundColor}
                        onChange={(e) => setFormattingOptions(prev => ({ ...prev, backgroundColor: e.target.value }))}
                        className="w-8 h-8 border rounded cursor-pointer"
                        title="Background Color"
                    />
                </div>

                <Separator orientation="vertical" className="h-6" />

                {/* Link */}
                <Popover open={showLinkPopover} onOpenChange={setShowLinkPopover}>
                    <PopoverTrigger asChild>
                        <Button variant="ghost" size="sm">
                            <Link2 className="h-4 w-4" />
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-80">
                        <div className="space-y-2">
                            <Label htmlFor="link-url">Link URL</Label>
                            <div className="flex gap-2">
                                <Input
                                    id="link-url"
                                    value={linkUrl}
                                    onChange={(e) => setLinkUrl(e.target.value)}
                                    placeholder="https://example.com"
                                />
                                <Button onClick={insertLink} size="sm">
                                    Insert
                                </Button>
                            </div>
                        </div>
                    </PopoverContent>
                </Popover>

                {/* Clear Formatting */}
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => formatText('clear')}
                    title="Clear Formatting"
                >
                    <RotateCcw className="h-4 w-4" />
                </Button>
            </div>

            {/* Editor */}
            <Textarea
                id="rich-textarea"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
                className="min-h-[200px] border-0 resize-none focus-visible:ring-0 focus-visible:ring-offset-0"
                style={{
                    fontSize: `${formattingOptions.fontSize}px`,
                    textAlign: formattingOptions.alignment as "left" | "center" | "right",
                    color: formattingOptions.textColor,
                    backgroundColor: formattingOptions.backgroundColor,
                }}
            />
        </div>
    );
}