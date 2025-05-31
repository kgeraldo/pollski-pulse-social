
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Keyboard, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Shortcut {
  key: string;
  description: string;
  modifiers?: string[];
}

const shortcuts: Shortcut[] = [
  { key: 'N', description: 'Create new post', modifiers: ['Ctrl'] },
  { key: 'K', description: 'Search posts', modifiers: ['Ctrl'] },
  { key: 'R', description: 'Refresh feed', modifiers: ['Ctrl'] },
  { key: '?', description: 'Show shortcuts' },
  { key: 'J', description: 'Next post' },
  { key: 'K', description: 'Previous post' },
  { key: 'L', description: 'Like post' },
  { key: 'C', description: 'Comment on post' },
  { key: 'B', description: 'Bookmark post' },
  { key: 'Esc', description: 'Close modals' }
];

const KeyboardShortcuts: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button
        size="sm"
        onClick={() => setIsOpen(true)}
        className="bg-slate-800 hover:bg-slate-700 border border-slate-600 text-slate-300 h-8 w-8 p-0"
        title="Keyboard shortcuts (?)"
      >
        <Keyboard size={12} />
      </Button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-slate-800 border border-slate-700 rounded-xl p-6 max-w-md w-full shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  <Keyboard size={20} />
                  Keyboard Shortcuts
                </h2>
                <Button
                  size="sm"
                  onClick={() => setIsOpen(false)}
                  className="bg-slate-700 hover:bg-slate-600 h-8 w-8 p-0"
                >
                  <X size={14} />
                </Button>
              </div>

              <div className="space-y-3">
                {shortcuts.map((shortcut, index) => (
                  <motion.div
                    key={`${shortcut.key}-${shortcut.description}`}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.2, delay: index * 0.05 }}
                    className="flex items-center justify-between py-2 px-3 rounded-lg bg-slate-700/30"
                  >
                    <span className="text-slate-300 text-sm">{shortcut.description}</span>
                    <div className="flex items-center gap-1">
                      {shortcut.modifiers?.map((modifier) => (
                        <kbd
                          key={modifier}
                          className="px-2 py-1 text-xs bg-slate-600 text-slate-200 rounded border border-slate-500"
                        >
                          {modifier}
                        </kbd>
                      ))}
                      <kbd className="px-2 py-1 text-xs bg-slate-600 text-slate-200 rounded border border-slate-500">
                        {shortcut.key}
                      </kbd>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="mt-6 p-3 bg-blue-600/10 border border-blue-500/20 rounded-lg">
                <p className="text-blue-400 text-xs">
                  💡 Tip: Press <kbd className="px-1 py-0.5 bg-blue-600/20 rounded text-xs">?</kbd> anytime to open this dialog
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default KeyboardShortcuts;
