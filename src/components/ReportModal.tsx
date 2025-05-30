
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Flag, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

interface ReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (reason: string, details: string) => void;
  type: 'post' | 'comment' | 'user';
}

const ReportModal: React.FC<ReportModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  type
}) => {
  const [selectedReason, setSelectedReason] = useState('');
  const [details, setDetails] = useState('');

  const reportReasons = [
    'Spam or unwanted content',
    'Harassment or bullying',
    'Hate speech',
    'Violence or threats',
    'Misinformation',
    'Inappropriate content',
    'Copyright violation',
    'Other'
  ];

  const handleSubmit = () => {
    if (selectedReason) {
      onSubmit(selectedReason, details);
      setSelectedReason('');
      setDetails('');
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-slate-800 border-slate-700 max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-white">
            <Flag size={20} className="text-red-400" />
            Report {type}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="flex items-start gap-2 p-3 bg-yellow-600/20 rounded-lg border border-yellow-600/30">
            <AlertTriangle size={16} className="text-yellow-400 mt-0.5" />
            <p className="text-sm text-yellow-200">
              Reports help keep our community safe. Please select the most appropriate reason.
            </p>
          </div>

          <RadioGroup value={selectedReason} onValueChange={setSelectedReason}>
            {reportReasons.map((reason) => (
              <div key={reason} className="flex items-center space-x-2">
                <RadioGroupItem value={reason} id={reason} />
                <Label htmlFor={reason} className="text-slate-300 text-sm">
                  {reason}
                </Label>
              </div>
            ))}
          </RadioGroup>

          <Textarea
            placeholder="Additional details (optional)"
            value={details}
            onChange={(e) => setDetails(e.target.value)}
            className="bg-slate-700 border-slate-600 text-white"
          />

          <div className="flex gap-2 pt-2">
            <Button
              variant="outline"
              onClick={onClose}
              className="flex-1 border-slate-600 text-slate-300"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSubmit}
              disabled={!selectedReason}
              className="flex-1 bg-red-600 hover:bg-red-700"
            >
              Submit Report
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ReportModal;
