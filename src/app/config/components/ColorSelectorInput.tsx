'use client';

import { useRef } from 'react';

export default function ColorSelectorInput({ 
  label, 
  value, 
  onChange, 
  maxLength = 7 
}: { 
  label?: string, 
  value: string, 
  onChange: (v: string) => void, 
  maxLength?: number 
}) {
  const colorInputRef = useRef<HTMLInputElement | null>(null);
  const textInputRef = useRef<HTMLInputElement | null>(null);
  
  const handleColorBoxClick = () => {
    if (colorInputRef.current) {
      colorInputRef.current.click();
    }
  };
  
  const validateAndFormatHexColor = (input: string): string => {
    // Strip any non-hex characters
    let cleanInput = input.replace(/[^0-9A-Fa-f#]/g, '');
    
    // If it doesn't start with #, add it
    if (!cleanInput.startsWith('#') && cleanInput.length > 0) {
      cleanInput = '#' + cleanInput;
    }
    
    // Ensure it doesn't exceed max length
    return cleanInput.substring(0, maxLength);
  };
  
  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedColor = validateAndFormatHexColor(e.target.value);
    onChange(formattedColor);
    
    // Update the color picker if we have a valid hex color
    if (formattedColor.length === 7 && colorInputRef.current) {
      colorInputRef.current.value = formattedColor;
    }
  };
  
  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    // Get pasted text
    const pastedText = e.clipboardData.getData('text');
    if (!pastedText) return;
    
    // Format it properly
    const formattedColor = validateAndFormatHexColor(pastedText);
    
    // Update the value
    onChange(formattedColor);
    
    // Update the color picker if we have a valid hex color
    if (formattedColor.length === 7 && colorInputRef.current) {
      colorInputRef.current.value = formattedColor;
    }
    
    // Prevent default paste behavior since we've handled it
    e.preventDefault();
  };
  
  return (
    <div className="flex items-center gap-2">
      {label && <label className="text-sm font-medium w-32">{label}</label>}
      
      {/* Hidden color input that opens when square is clicked */}
      <input
        ref={colorInputRef}
        type="color"
        value={value || '#ffffff'}
        onChange={e => {
          const newColor = e.target.value;
          onChange(newColor);
          // Update the text input too
          if (textInputRef.current) {
            textInputRef.current.value = newColor;
          }
        }}
        className="opacity-0 absolute w-0 h-0"
      />
      
      {/* Visible colored square */}
      <div 
        className="w-10 h-10 border border-gray-300 rounded cursor-pointer"
        style={{ backgroundColor: value || '#ffffff' }}
        onClick={handleColorBoxClick}
      ></div>
      
      {/* Text input for hex value */}
      <input
        ref={textInputRef}
        type="text"
        value={value || ''}
        onChange={handleTextChange}
        onPaste={handlePaste}
        onKeyDown={(e) => {
          // Explicitly allow Ctrl+V for pasting
          if ((e.ctrlKey || e.metaKey) && e.key === 'v') {
            // Default paste behavior will be handled by onPaste
            return;
          }
        }}
        className="border border-gray-200 rounded px-2 py-1 text-sm w-20 shadow-sm"
        maxLength={maxLength}
        placeholder="#ffffff"
      />
    </div>
  );
} 