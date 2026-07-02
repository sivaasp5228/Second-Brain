import { Search } from 'lucide-react';

interface SearchBarProps {
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  className?: string;
}

export default function SearchBar({
  placeholder = 'Ask your Second Brain...',
  value,
  onChange,
  className = '',
}: SearchBarProps) {
  return (
    <div className={`relative group ${className}`}>
      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-violet-500/20 blur-xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-500" />
      <div className="relative flex items-center glass rounded-xl border border-white/10 focus-within:border-white/20 transition-colors duration-300">
        <Search className="w-5 h-5 text-white/40 ml-4 flex-shrink-0" />
        <input
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          className="w-full bg-transparent px-4 py-3.5 text-white placeholder-white/30 focus:outline-none text-sm"
        />
        <div className="mr-3 px-2 py-1 rounded-md bg-white/5 text-white/30 text-xs border border-white/5">
          ⌘K
        </div>
      </div>
    </div>
  );
}
