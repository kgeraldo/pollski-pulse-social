
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, Send, Minimize2, X, Phone, Video, MoreVertical } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Message {
  id: string;
  author: string;
  avatar: string;
  content: string;
  timestamp: Date;
  isOwn: boolean;
  status: 'sending' | 'sent' | 'read';
}

interface LiveChatProps {
  isOpen: boolean;
  onClose: () => void;
  onMinimize: () => void;
}

const LiveChat: React.FC<LiveChatProps> = ({ isOpen, onClose, onMinimize }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      author: 'Sarah Kim',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b5b4?w=50&h=50&fit=crop',
      content: 'Hey! How are you doing?',
      timestamp: new Date(Date.now() - 1000 * 60 * 5),
      isOwn: false,
      status: 'read'
    },
    {
      id: '2',
      author: 'You',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop',
      content: 'Great! Just working on some new features.',
      timestamp: new Date(Date.now() - 1000 * 60 * 2),
      isOwn: true,
      status: 'read'
    }
  ]);
  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    const message: Message = {
      id: Date.now().toString(),
      author: 'You',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop',
      content: newMessage,
      timestamp: new Date(),
      isOwn: true,
      status: 'sending'
    };

    setMessages(prev => [...prev, message]);
    setNewMessage('');

    // Simulate message being sent
    setTimeout(() => {
      setMessages(prev => prev.map(msg => 
        msg.id === message.id ? { ...msg, status: 'sent' } : msg
      ));
    }, 500);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.8, y: 20 }}
      className="fixed bottom-4 right-4 w-80 h-96 bg-slate-800 border border-slate-700 rounded-lg shadow-2xl z-50 flex flex-col"
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-slate-700">
        <div className="flex items-center gap-3">
          <img
            src="https://images.unsplash.com/photo-1494790108755-2616b612b5b4?w=50&h=50&fit=crop"
            alt="Sarah Kim"
            className="w-8 h-8 rounded-full"
          />
          <div>
            <h3 className="text-white font-semibold text-sm">Sarah Kim</h3>
            <p className="text-green-400 text-xs">Online</p>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <Button size="sm" className="h-8 w-8 p-0 bg-transparent hover:bg-slate-700 text-slate-400">
            <Phone size={14} />
          </Button>
          <Button size="sm" className="h-8 w-8 p-0 bg-transparent hover:bg-slate-700 text-slate-400">
            <Video size={14} />
          </Button>
          <Button size="sm" className="h-8 w-8 p-0 bg-transparent hover:bg-slate-700 text-slate-400">
            <MoreVertical size={14} />
          </Button>
          <Button onClick={onMinimize} size="sm" className="h-8 w-8 p-0 bg-transparent hover:bg-slate-700 text-slate-400">
            <Minimize2 size={14} />
          </Button>
          <Button onClick={onClose} size="sm" className="h-8 w-8 p-0 bg-transparent hover:bg-slate-700 text-slate-400">
            <X size={14} />
          </Button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.map((message) => (
          <motion.div
            key={message.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`flex ${message.isOwn ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`flex items-end gap-2 max-w-[80%] ${message.isOwn ? 'flex-row-reverse' : ''}`}>
              <img
                src={message.avatar}
                alt={message.author}
                className="w-6 h-6 rounded-full"
              />
              <div className={`px-3 py-2 rounded-lg ${
                message.isOwn 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-slate-700 text-slate-200'
              }`}>
                <p className="text-sm">{message.content}</p>
                <div className={`flex items-center gap-1 mt-1 ${message.isOwn ? 'justify-end' : ''}`}>
                  <span className="text-xs opacity-70">{formatTime(message.timestamp)}</span>
                  {message.isOwn && (
                    <span className="text-xs opacity-70">
                      {message.status === 'sending' && '○'}
                      {message.status === 'sent' && '✓'}
                      {message.status === 'read' && '✓✓'}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
        {isTyping && (
          <div className="flex justify-start">
            <div className="flex items-center gap-2">
              <img
                src="https://images.unsplash.com/photo-1494790108755-2616b612b5b4?w=50&h=50&fit=crop"
                alt="Sarah Kim"
                className="w-6 h-6 rounded-full"
              />
              <div className="bg-slate-700 px-3 py-2 rounded-lg">
                <div className="flex space-x-1">
                  <div className="w-1 h-1 bg-slate-400 rounded-full animate-bounce"></div>
                  <div className="w-1 h-1 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-1 h-1 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-4 border-t border-slate-700">
        <div className="flex gap-2">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder="Type a message..."
            className="flex-1 bg-slate-700 text-white px-3 py-2 rounded-lg text-sm border-none focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <Button
            onClick={handleSendMessage}
            disabled={!newMessage.trim()}
            className="bg-blue-600 hover:bg-blue-700 h-10 w-10 p-0 rounded-lg"
          >
            <Send size={16} />
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default LiveChat;
