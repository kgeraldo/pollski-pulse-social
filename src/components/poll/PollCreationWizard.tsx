
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, ArrowLeft, ArrowRight, Check, X, Calendar, Users, BarChart3 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

interface PollCreationWizardProps {
  isOpen: boolean;
  onClose: () => void;
  onCreatePoll: (poll: any) => void;
}

const PollCreationWizard: React.FC<PollCreationWizardProps> = ({ isOpen, onClose, onCreatePoll }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [pollData, setPollData] = useState({
    title: '',
    description: '',
    options: ['', ''],
    category: '',
    duration: '24h',
    allowMultiple: false,
    isAnonymous: false,
    requireVerification: false
  });

  const steps = [
    { title: 'Basic Info', icon: BarChart3 },
    { title: 'Options', icon: Plus },
    { title: 'Settings', icon: Users },
    { title: 'Review', icon: Check }
  ];

  const categories = ['Technology', 'Design', 'Business', 'Lifestyle', 'Entertainment', 'Education', 'Other'];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const addOption = () => {
    setPollData(prev => ({
      ...prev,
      options: [...prev.options, '']
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

  const updateOption = (index: number, value: string) => {
    setPollData(prev => ({
      ...prev,
      options: prev.options.map((option, i) => i === index ? value : option)
    }));
  };

  const handleCreatePoll = () => {
    const newPoll = {
      id: Date.now().toString(),
      title: pollData.title,
      description: pollData.description,
      author: 'You',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop',
      timeAgo: 'now',
      category: pollData.category,
      totalVotes: 0,
      hasVoted: false,
      options: pollData.options.filter(opt => opt.trim()).map((text, i) => ({
        id: `option-${i}`,
        text,
        votes: 0,
        percentage: 0
      }))
    };

    onCreatePoll(newPoll);
    onClose();
    setPollData({
      title: '',
      description: '',
      options: ['', ''],
      category: '',
      duration: '24h',
      allowMultiple: false,
      isAnonymous: false,
      requireVerification: false
    });
    setCurrentStep(0);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-card border border-border rounded-xl w-full max-w-2xl max-h-[90vh] overflow-hidden"
      >
        <CardHeader className="border-b border-border">
          <div className="flex items-center justify-between">
            <CardTitle className="text-foreground">Create New Poll</CardTitle>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X size={20} />
            </Button>
          </div>
          
          {/* Progress Steps */}
          <div className="flex items-center gap-2 mt-4">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isActive = index === currentStep;
              const isCompleted = index < currentStep;
              
              return (
                <React.Fragment key={step.title}>
                  <div className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
                    isActive ? 'bg-primary text-primary-foreground' :
                    isCompleted ? 'bg-green-500 text-white' :
                    'bg-muted text-muted-foreground'
                  }`}>
                    <Icon size={16} />
                    <span className="text-sm font-medium">{step.title}</span>
                  </div>
                  {index < steps.length - 1 && (
                    <ArrowRight size={16} className="text-muted-foreground" />
                  )}
                </React.Fragment>
              );
            })}
          </div>
        </CardHeader>

        <CardContent className="p-6 max-h-96 overflow-y-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
            >
              {/* Step 0: Basic Info */}
              {currentStep === 0 && (
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="title">Poll Title</Label>
                    <Input
                      id="title"
                      placeholder="What would you like to ask?"
                      value={pollData.title}
                      onChange={(e) => setPollData(prev => ({ ...prev, title: e.target.value }))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="description">Description (Optional)</Label>
                    <Textarea
                      id="description"
                      placeholder="Add more context to your poll..."
                      value={pollData.description}
                      onChange={(e) => setPollData(prev => ({ ...prev, description: e.target.value }))}
                    />
                  </div>
                  <div>
                    <Label>Category</Label>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {categories.map((category) => (
                        <Badge
                          key={category}
                          variant={pollData.category === category ? "default" : "outline"}
                          className="cursor-pointer"
                          onClick={() => setPollData(prev => ({ ...prev, category }))}
                        >
                          {category}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Step 1: Options */}
              {currentStep === 1 && (
                <div className="space-y-4">
                  <Label>Poll Options</Label>
                  {pollData.options.map((option, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <Input
                        placeholder={`Option ${index + 1}`}
                        value={option}
                        onChange={(e) => updateOption(index, e.target.value)}
                      />
                      {pollData.options.length > 2 && (
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => removeOption(index)}
                        >
                          <X size={16} />
                        </Button>
                      )}
                    </div>
                  ))}
                  <Button variant="outline" onClick={addOption} className="w-full">
                    <Plus size={16} className="mr-2" />
                    Add Option
                  </Button>
                </div>
              )}

              {/* Step 2: Settings */}
              {currentStep === 2 && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Allow Multiple Choices</Label>
                      <p className="text-sm text-muted-foreground">Users can select multiple options</p>
                    </div>
                    <Switch
                      checked={pollData.allowMultiple}
                      onCheckedChange={(checked) => setPollData(prev => ({ ...prev, allowMultiple: checked }))}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Anonymous Voting</Label>
                      <p className="text-sm text-muted-foreground">Hide voter identities</p>
                    </div>
                    <Switch
                      checked={pollData.isAnonymous}
                      onCheckedChange={(checked) => setPollData(prev => ({ ...prev, isAnonymous: checked }))}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Require Verification</Label>
                      <p className="text-sm text-muted-foreground">Only verified users can vote</p>
                    </div>
                    <Switch
                      checked={pollData.requireVerification}
                      onCheckedChange={(checked) => setPollData(prev => ({ ...prev, requireVerification: checked }))}
                    />
                  </div>
                </div>
              )}

              {/* Step 3: Review */}
              {currentStep === 3 && (
                <div className="space-y-4">
                  <div className="bg-accent/30 p-4 rounded-lg">
                    <h3 className="font-semibold text-foreground mb-2">{pollData.title || 'Untitled Poll'}</h3>
                    {pollData.description && (
                      <p className="text-sm text-muted-foreground mb-3">{pollData.description}</p>
                    )}
                    <div className="space-y-2">
                      {pollData.options.filter(opt => opt.trim()).map((option, index) => (
                        <div key={index} className="flex items-center gap-2 p-2 bg-muted rounded">
                          <div className="w-4 h-4 border border-border rounded" />
                          <span className="text-sm">{option}</span>
                        </div>
                      ))}
                    </div>
                    <div className="flex items-center gap-4 mt-4 text-xs text-muted-foreground">
                      <span>Category: {pollData.category || 'Uncategorized'}</span>
                      {pollData.allowMultiple && <span>Multiple Choice</span>}
                      {pollData.isAnonymous && <span>Anonymous</span>}
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </CardContent>

        <div className="border-t border-border p-4 flex items-center justify-between">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentStep === 0}
          >
            <ArrowLeft size={16} className="mr-2" />
            Previous
          </Button>
          
          {currentStep < steps.length - 1 ? (
            <Button onClick={handleNext}>
              Next
              <ArrowRight size={16} className="ml-2" />
            </Button>
          ) : (
            <Button onClick={handleCreatePoll}>
              <Check size={16} className="mr-2" />
              Create Poll
            </Button>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default PollCreationWizard;
