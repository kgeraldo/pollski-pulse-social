
import React from 'react';
import { motion } from 'framer-motion';
import { Code, Briefcase, Heart, Gamepad2, Coffee, Users, Lightbulb, Globe } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface Category {
  id: string;
  name: string;
  icon: React.ElementType;
  count: number;
  color: string;
}

interface PollCategoriesProps {
  selectedCategory: string;
  onCategorySelect: (category: string) => void;
}

const PollCategories: React.FC<PollCategoriesProps> = ({ selectedCategory, onCategorySelect }) => {
  const categories: Category[] = [
    { id: 'all', name: 'All', icon: Globe, count: 234, color: 'bg-blue-500' },
    { id: 'technology', name: 'Technology', icon: Code, count: 89, color: 'bg-green-500' },
    { id: 'work', name: 'Work & Career', icon: Briefcase, count: 67, color: 'bg-purple-500' },
    { id: 'lifestyle', name: 'Lifestyle', icon: Heart, count: 45, color: 'bg-pink-500' },
    { id: 'gaming', name: 'Gaming', icon: Gamepad2, count: 32, color: 'bg-orange-500' },
    { id: 'food', name: 'Food & Drink', icon: Coffee, count: 28, color: 'bg-yellow-500' },
    { id: 'social', name: 'Social', icon: Users, count: 21, color: 'bg-indigo-500' },
    { id: 'ideas', name: 'Ideas', icon: Lightbulb, count: 18, color: 'bg-cyan-500' }
  ];

  return (
    <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
      {categories.map((category, index) => {
        const Icon = category.icon;
        const isSelected = selectedCategory === category.id;
        
        return (
          <motion.button
            key={category.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
            onClick={() => onCategorySelect(category.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-full whitespace-nowrap transition-all duration-200 ${
              isSelected
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/25'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700 border border-slate-600'
            }`}
          >
            <Icon size={16} />
            <span className="font-medium">{category.name}</span>
            <Badge 
              variant="secondary" 
              className={`text-xs ${isSelected ? 'bg-white/20 text-white' : 'bg-slate-700 text-slate-400'}`}
            >
              {category.count}
            </Badge>
          </motion.button>
        );
      })}
    </div>
  );
};

export default PollCategories;
