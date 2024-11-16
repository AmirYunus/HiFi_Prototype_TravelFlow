import React from 'react';
import { Check, ChevronsUpDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from './button';
import { 
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

interface AutoCompleteProps {
  options: { code: string; name: string }[];
  value: { code: string; name: string };
  onChange: (value: { code: string; name: string }) => void;
  label: string;
  error?: string;
}

export function AutoComplete({
  options,
  value,
  onChange,
  label,
  error,
}: AutoCompleteProps) {
  const [open, setOpen] = React.useState(false);

  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-medium text-gray-700">{label}</label>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className={cn(
              "w-full justify-between",
              error ? "border-red-500" : "border-gray-200"
            )}
          >
            {value?.name || "Select airport..."}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[300px] p-0">
          <Command>
            <CommandInput placeholder="Search airports..." />
            <CommandEmpty>No airports found.</CommandEmpty>
            <CommandGroup>
              {options.map((airport) => (
                <CommandItem
                  key={airport.code}
                  value={airport.code}
                  onSelect={() => {
                    onChange(airport);
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value?.code === airport.code ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {airport.name}
                </CommandItem>
              ))}
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
}