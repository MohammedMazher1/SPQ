import React, { useState } from 'react';

const SearchBar = ({ onSearch }: { onSearch: (value: string) => void }) => {
  const [searchValue, setSearchValue] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchValue(value);
    onSearch(value); // Pass the search value to the parent component
  };

  return (
    <div className="flex h-10 w-1/3 max-w-sm items-center rounded-md border border-gray-300 bg-white px-3">
      <input
        dir="rtl"
        placeholder="البحث عن ..."
        value={searchValue}
        onChange={handleInputChange}
        className="h-full w-full flex-1 border-0 bg-transparent p-0 text-right placeholder:text-gray-400 focus:outline-none"
      />
      <SearchIcon className="mr-2 h-5 w-5 text-gray-400" />
    </div>
  );
};

// Replace this with your actual Search icon component or import it
const SearchIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    className={className}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
    />
  </svg>
);

export default SearchBar;
