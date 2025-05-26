
import React, { useState } from 'react';
import { Bold, Italic, Link, Image, List } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

interface RichTextEditorProps {
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

const RichTextEditor: React.FC<RichTextEditorProps> = ({
  placeholder = "What's on your mind?",
  value,
  onChange,
  className = ""
}) => {
  const [isFocused, setIsFocused] = useState(false);

  const formatButtons = [
    { icon: Bold, label: 'Bold', shortcut: 'Ctrl+B' },
    { icon: Italic, label: 'Italic', shortcut: 'Ctrl+I' },
    { icon: Link, label: 'Link', shortcut: 'Ctrl+K' },
    { icon: Image, label: 'Image', shortcut: 'Ctrl+U' },
    { icon: List, label: 'List', shortcut: 'Ctrl+L' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`bg-slate-800 rounded-xl border border-slate-700 transition-all duration-200 ${
        isFocused ? 'border-blue-500 shadow-lg shadow-blue-500/20' : 'hover:border-slate-600'
      } ${className}`}
    >
      {/* Toolbar */}
      <div className="flex items-center gap-1 p-3 border-b border-slate-700">
        {formatButtons.map((button) => (
          <Button
            key={button.label}
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0 text-slate-400 hover:text-white hover:bg-slate-700"
            title={`${button.label} (${button.shortcut})`}
          >
            <button.icon size={16} />
          </Button>
        ))}
      </div>

      {/* Editor */}
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        placeholder={placeholder}
        className="w-full p-4 bg-transparent text-white placeholder-slate-400 resize-none border-none outline-none min-h-[120px]"
        rows={4}
      />

      {/* Footer */}
      <div className="flex items-center justify-between p-3 border-t border-slate-700">
        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-500">
            {value.length}/280 characters
          </span>
        </div>
        <Button
          size="sm"
          disabled={!value.trim()}
          className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Post
        </Button>
      </div>
    </motion.div>
  );
};

export default RichTextEditor;
