import { MagnifyingGlass } from 'phosphor-react';
import React, { forwardRef, InputHTMLAttributes } from 'react';

const SearchInput = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>((props, ref) => {
  return (
    <span className="flex w-full items-center gap-3 rounded border border-slate-400 bg-slate-50/50 px-4 py-2 focus-within:outline-orange-550 print:hidden">
      <MagnifyingGlass weight="bold" className="text-teal-400" />
      <input
        className="w-full border-0 bg-transparent caret-teal-400 placeholder:text-gray-400  focus-visible:outline-0"
        type="text"
        aria-label="Buscar"
        placeholder="Buscar"
        ref={ref}
        {...props}
      />
    </span>
  );
});

export default SearchInput;
