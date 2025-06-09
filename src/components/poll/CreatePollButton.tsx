
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface CreatePollButtonProps {
  onCreatePoll: (poll: any) => void;
}

const CreatePollButton: React.FC<CreatePollButtonProps> = ({ onCreatePoll }) => {
  const [isCreating, setIsCreating] = useState(false);
  const [pollData, setPollData] = useState({
    title: '',
    description: '',
    options: ['', '']
  });

  const addOption = () => {
    setPollData(prev => ({
      ...prev,
      options: [...prev.options, '']
    }));
  };

  const updateOption = (index: number, value: string) => {
    setPollData(prev => ({
      ...prev,
      options: prev.options.map((opt, i) => i === index ? value : opt)
    }));
  };

  const removeOption = (index: number) => {
    if (pollData.options.length > 2) {
      setPollData(prev => ({
        ...prev,
        options: prev.options.filter((_, i) => i !== index)
      }));
    }
  };

  const handleCreate = () => {
    if (pollData.title && pollData.options.every(opt => opt.trim())) {
      const newPoll = {
        id: Date.now().toString(),
        title: pollData.title,
        description: pollData.description,
        author: 'You',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop',
        timeAgo: 'now',
        category: 'General',
        totalVotes: 0,
        hasVoted: false,
        options: pollData.options.map((text, index) => ({
          id: `option-${index}`,
          text,
          votes: 0,
          percentage: 0
        }))
      };
      
      onCreatePoll(newPoll);
      setPollData({ title: '', description: '', options: ['', ''] });
      setIsCreating(false);
    }
  };

  if (!isCreating) {
    return (
      <motion.div
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        className="fixed bottom-6 right-6 z-50"
      >
        <Button
          onClick={() => setIsCreating(true)}
          size="lg"
          className="bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg h-14 w-14"
        >
          <Plus size={24} />
        </Button>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
    >
      <Card className="w-full max-w-md bg-slate-800 border-slate-700">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-white">Create New Poll</CardTitle>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsCreating(false)}
            className="text-slate-400 hover:text-white"
          >
            <X size={16} />
          </Button>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input
            placeholder="Poll question..."
            value={pollData.title}
            onChange={(e) => setPollData(prev => ({ ...prev, title: e.target.value }))}
            className="bg-slate-700 border-slate-600 text-white"
          />
          <Input
            placeholder="Description (optional)..."
            value={pollData.description}
            onChange={(e) => setPollData(prev => ({ ...prev, description: e.target.value }))}
            className="bg-slate-700 border-slate-600 text-white"
          />
          
          <div className="space-y-2">
            {pollData.options.map((option, index) => (
              <div key={index} className="flex gap-2">
                <Input
                  placeholder={`Option ${index + 1}...`}
                  value={option}
                  onChange={(e) => updateOption(index, e.target.value)}
                  className="bg-slate-700 border-slate-600 text-white flex-1"
                />
                {pollData.options.length > 2 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeOption(index)}
                    className="text-red-400 hover:text-red-300"
                  >
                    <X size={16} />
                  </Button>
                )}
              </div>
            ))}
          </div>

          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={addOption}
              className="flex-1 border-slate-600 text-slate-300"
            >
              Add Option
            </Button>
            <Button
              onClick={handleCreate}
              className="flex-1 bg-blue-600 hover:bg-blue-700"
              disabled={!pollData.title || !pollData.options.every(opt => opt.trim())}
            >
              Create Poll
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default CreatePollButton;
