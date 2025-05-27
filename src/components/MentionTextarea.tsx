
import React, { useState, useRef, useCallback, useEffect } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { useMentions } from '@/hooks/useMentions';
import MentionSuggestions from './MentionSuggestions';
import { MentionSuggestion } from '@/types/mention';

interface MentionTextareaProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
  minHeight?: number;
}

const MentionTextarea: React.FC<MentionTextareaProps> = ({
  value,
  onChange,
  placeholder = 'Type @ to mention someone...',
  className,
  disabled,
  minHeight = 80
}) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [cursorPosition, setCursorPosition] = useState(0);
  const [suggestionPosition, setSuggestionPosition] = useState({ top: 0, left: 0 });
  
  const {
    mentionQuery,
    setMentionQuery,
    showSuggestions,
    setShowSuggestions,
    activeSuggestionIndex,
    setActiveSuggestionIndex,
    suggestions
  } = useMentions();

  const updateSuggestionPosition = useCallback(() => {
    if (!textareaRef.current) return;
    
    const textarea = textareaRef.current;
    const rect = textarea.getBoundingClientRect();
    
    // Create a temporary div to measure text dimensions
    const div = document.createElement('div');
    const style = window.getComputedStyle(textarea);
    
    div.style.font = style.font;
    div.style.fontSize = style.fontSize;
    div.style.fontFamily = style.fontFamily;
    div.style.lineHeight = style.lineHeight;
    div.style.padding = style.padding;
    div.style.border = style.border;
    div.style.whiteSpace = 'pre-wrap';
    div.style.wordWrap = 'break-word';
    div.style.position = 'absolute';
    div.style.visibility = 'hidden';
    div.style.width = `${textarea.clientWidth}px`;
    
    const textBeforeCursor = value.substring(0, cursorPosition);
    div.textContent = textBeforeCursor;
    
    document.body.appendChild(div);
    
    const lineHeight = parseInt(style.lineHeight) || 20;
    const lines = Math.floor(div.scrollHeight / lineHeight);
    
    setSuggestionPosition({
      top: rect.top + (lines * lineHeight) + 40,
      left: rect.left + 10
    });
    
    document.body.removeChild(div);
  }, [value, cursorPosition]);

  const handleTextChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value;
    const newCursorPosition = e.target.selectionStart;
    
    onChange(newValue);
    setCursorPosition(newCursorPosition);

    // Check for @ mention trigger
    const textBeforeCursor = newValue.substring(0, newCursorPosition);
    const mentionMatch = textBeforeCursor.match(/@(\w*)$/);
    
    if (mentionMatch) {
      setMentionQuery(mentionMatch[1]);
      setShowSuggestions(true);
      setActiveSuggestionIndex(0);
      updateSuggestionPosition();
    } else {
      setShowSuggestions(false);
      setMentionQuery('');
    }
  }, [onChange, setMentionQuery, setShowSuggestions, setActiveSuggestionIndex, updateSuggestionPosition]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (!showSuggestions || suggestions.length === 0) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setActiveSuggestionIndex((prev) => 
          prev < suggestions.length - 1 ? prev + 1 : 0
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setActiveSuggestionIndex((prev) => 
          prev > 0 ? prev - 1 : suggestions.length - 1
        );
        break;
      case 'Enter':
      case 'Tab':
        if (suggestions[activeSuggestionIndex]) {
          e.preventDefault();
          handleMentionSelect(suggestions[activeSuggestionIndex]);
        }
        break;
      case 'Escape':
        e.preventDefault();
        setShowSuggestions(false);
        break;
    }
  }, [showSuggestions, suggestions, activeSuggestionIndex, setActiveSuggestionIndex, setShowSuggestions]);

  const handleMentionSelect = useCallback((user: MentionSuggestion) => {
    if (!textareaRef.current) return;

    const textarea = textareaRef.current;
    const beforeCursor = value.substring(0, cursorPosition);
    const afterCursor = value.substring(cursorPosition);
    
    // Find the @ symbol position
    const mentionStart = beforeCursor.lastIndexOf('@');
    const beforeMention = value.substring(0, mentionStart);
    const mention = `@${user.username} `;
    const newValue = beforeMention + mention + afterCursor;
    const newCursorPosition = mentionStart + mention.length;
    
    onChange(newValue);
    setShowSuggestions(false);
    setMentionQuery('');
    
    // Set cursor position after the mention
    setTimeout(() => {
      textarea.setSelectionRange(newCursorPosition, newCursorPosition);
      textarea.focus();
    }, 0);
  }, [value, cursorPosition, onChange, setShowSuggestions, setMentionQuery]);

  useEffect(() => {
    if (showSuggestions) {
      updateSuggestionPosition();
    }
  }, [showSuggestions, updateSuggestionPosition]);

  return (
    <div className="relative">
      <Textarea
        ref={textareaRef}
        value={value}
        onChange={handleTextChange}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        className={className}
        disabled={disabled}
        style={{ minHeight }}
        onSelect={(e) => setCursorPosition(e.currentTarget.selectionStart)}
        onClick={(e) => setCursorPosition(e.currentTarget.selectionStart)}
      />
      
      <MentionSuggestions
        suggestions={suggestions}
        isVisible={showSuggestions}
        activeIndex={activeSuggestionIndex}
        onSelect={handleMentionSelect}
        position={suggestionPosition}
      />
    </div>
  );
};

export default MentionTextarea;
