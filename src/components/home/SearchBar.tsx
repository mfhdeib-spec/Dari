"use client";

import { SearchIcon } from "@/components/home/icons";

type Props = {
  value: string;
  onChange: (next: string) => void;
  placeholder: string;
};

export default function SearchBar({ value, onChange, placeholder }: Props) {
  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6">
      <div className="mt-8 rounded-full bg-white px-4 py-3 shadow-sm ring-1 ring-black/5">
        <div className="flex items-center gap-3">
          <SearchIcon className="h-5 w-5 text-neutral-500" />
          <input
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            className="w-full bg-transparent text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none"
            type="search"
            aria-label={placeholder}
          />
        </div>
      </div>
    </div>
  );
}

