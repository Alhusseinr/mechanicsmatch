import React from 'react';

interface Option {
  value: string;
  label: string;
}

interface CustomSelectProps {
  options: Option[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export const CustomSelect: React.FC<CustomSelectProps> = ({
  options,
  value,
  onChange,
  placeholder = "Select an option",
  className = ""
}) => {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`
          w-full px-4 py-3 bg-white border border-slate-200 rounded-xl 
          focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 
          transition-all duration-200 appearance-none cursor-pointer pr-10
          text-slate-900 font-medium
          ${className}
        `}
        style={{
          color: '#1f2937', // Ensure text color
        }}
      >
        {placeholder && (
          <option value="" disabled className="text-slate-400 bg-white">
            {placeholder}
          </option>
        )}
        {options.map((option) => (
          <option
            key={option.value}
            value={option.value}
            className="text-slate-900 bg-white hover:bg-blue-50 py-2"
            style={{
              backgroundColor: 'white',
              color: '#1f2937',
            }}
          >
            {option.label}
          </option>
        ))}
      </select>
      
      {/* Custom dropdown arrow */}
      <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
        <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </div>
  );
};