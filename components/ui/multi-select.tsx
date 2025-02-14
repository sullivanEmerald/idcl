'use client';

import * as React from 'react';
import { Command as CommandPrimitive } from 'cmdk';
import { X } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Command, CommandGroup, CommandItem } from '@/components/ui/command';

interface Option {
  value: string;
  label: string;
}

interface MultiSelectProps {
  options: Option[];
  selected: Option[];
  onChange: (options: Option[]) => void;
  placeholder?: string;
  className?: string;
}

export function MultiSelect({
  options,
  selected,
  onChange,
  placeholder = 'Select options...',
  className,
}: MultiSelectProps) {
  const [open, setOpen] = React.useState(false);
  const [inputValue, setInputValue] = React.useState('');

  const handleUnselect = (option: Option) => {
    onChange(selected.filter((s) => s.value !== option.value));
  };

  const handleSelect = (option: Option) => {
    onChange([...selected, option]);
    setInputValue('');
  };

  const filteredOptions = options.filter((option) => {
    const matchesSearch = option.label.toLowerCase().includes(inputValue.toLowerCase());
    const isSelected = selected.some((s) => s.value === option.value);
    return matchesSearch && !isSelected;
  });

  return (
    <Command className={className}>
      <div className="group border border-gray-300 px-3 py-2 text-sm ring-offset-white rounded-md focus-within:ring-2 focus-within:ring-blue-500 focus-within:ring-offset-2 hover:border-gray-400">
        <div className="flex gap-1 flex-wrap">
          {selected.map((option) => (
            <Badge key={option.value} variant="secondary" className="bg-blue-100 text-blue-800 hover:bg-blue-200">
              {option.label}
              <button
                className="ml-1 ring-offset-background rounded-full outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleUnselect(option);
                  }
                }}
                onMouseDown={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                }}
                onClick={() => handleUnselect(option)}
              >
                <X className="h-3 w-3 text-blue-600 hover:text-blue-800" />
              </button>
            </Badge>
          ))}
          <CommandPrimitive.Input
            value={inputValue}
            onValueChange={setInputValue}
            onBlur={() => setOpen(false)}
            onFocus={() => setOpen(true)}
            placeholder={selected.length === 0 ? placeholder : undefined}
            className="ml-2 bg-transparent outline-none placeholder:text-gray-500 flex-1"
          />
        </div>
      </div>
      <div className="relative mt-1">
        {open && filteredOptions.length > 0 && (
          <div className="absolute w-full z-50 top-0 rounded-md border bg-white text-gray-900 shadow-lg outline-none animate-in">
            <CommandGroup className="h-full overflow-auto max-h-60">
              {filteredOptions.map((option) => (
                <CommandItem
                  key={option.value}
                  onSelect={() => handleSelect(option)}
                  className="px-4 py-2 text-sm cursor-pointer hover:bg-blue-50 hover:text-blue-600 focus:bg-blue-50 focus:text-blue-600 aria-selected:bg-blue-50 aria-selected:text-blue-600"
                >
                  {option.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </div>
        )}
      </div>
    </Command>
  );
}
