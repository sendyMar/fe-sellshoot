"use client";

import { CheckSquare2, Square } from "lucide-react";

interface TaskChecklistProps {
  task: any;
  updateTaskDescription: (id: number, newDesc: string, isCompleted: boolean) => void;
}

export default function TaskChecklist({ task, updateTaskDescription }: TaskChecklistProps) {
  if (!task.description) return null;

  const lines = task.description.split('\n');

  const toggleLine = (lineIndex: number) => {
    const newLines = [...lines];
    const line = newLines[lineIndex];

    // Toggle logic for the specific line
    if (line.includes('- [x] ')) {
      newLines[lineIndex] = line.replace('- [x] ', '- [ ] ');
    } else if (line.includes('- [ ] ')) {
      newLines[lineIndex] = line.replace('- [ ] ', '- [x] ');
    } else if (line.includes('- ')) {
      newLines[lineIndex] = line.replace('- ', '- [x] ');
    }
    
    const updatedDesc = newLines.join('\n');
    
    // Check if ALL top-level items are checked
    const topLevelLines = newLines.filter(l => l.startsWith('- '));
    const allChecked = topLevelLines.length > 0 && topLevelLines.every(l => l.startsWith('- [x] '));
    
    updateTaskDescription(task.id, updatedDesc, allChecked);
  };

  return (
    <div className="mt-3 bg-white/50 rounded-lg p-3 border border-slate-100 text-sm flex flex-col gap-1.5">
      {lines.map((line: string, idx: number) => {
        // Find if line is a list item
        const match = line.match(/^(\s*)-\s+(.*)$/);
        
        if (match) {
          const leadingSpaces = match[1].length;
          let content = match[2];
          
          let isChecked = false;
          if (content.startsWith('[x] ')) {
            isChecked = true;
            content = content.substring(4);
          } else if (content.startsWith('[ ] ')) {
            content = content.substring(4);
          }

          const isTopLevel = leadingSpaces === 0;

          return (
            <div key={idx} className="flex items-start gap-2" style={{ paddingLeft: `${leadingSpaces * 6}px` }}>
              <button 
                onClick={() => toggleLine(idx)} 
                className="mt-0.5 text-slate-400 hover:text-indigo-600 transition-colors shrink-0 focus:outline-none"
              >
                {isChecked ? <CheckSquare2 className="w-4 h-4 text-emerald-500" /> : <Square className="w-4 h-4" />}
              </button>
              <span className={`text-slate-700 leading-relaxed ${isChecked ? 'line-through opacity-60' : ''} ${isTopLevel ? 'font-semibold' : ''}`}>
                {content}
              </span>
            </div>
          );
        }

        // Just normal text (fallback for lines that don't start with -)
        return (
          <div key={idx} className="py-0.5 text-slate-600 leading-relaxed">
            {line.trim()}
          </div>
        );
      })}
    </div>
  );
}
