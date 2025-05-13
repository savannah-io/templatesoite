'use client';

import ColorSelectorInput from '@/app/config/components/ColorSelectorInput';

export default function EditableGuaranteeCards({ cards, onChange }: { cards: any[], onChange: (v: any[]) => void }) {
  return (
    <div className="space-y-6">
      {cards.map((card, index) => (
        <div key={index} className="bg-white rounded-xl shadow-lg p-4 border border-cyan-200">
          <div className="flex justify-between items-center mb-3">
            <h4 className="font-semibold text-cyan-800">Card {index + 1}</h4>
            <button 
              onClick={() => onChange(cards.filter((_, i) => i !== index))}
              className="text-red-500 hover:text-red-700"
            >
              Remove
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-cyan-800 mb-1">Title</label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-cyan-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500"
                value={card.title || ''}
                onChange={e => {
                  const newCards = [...cards];
                  newCards[index] = { ...newCards[index], title: e.target.value };
                  onChange(newCards);
                }}
                placeholder="Card Title"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-cyan-800 mb-1">Icon</label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-cyan-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500"
                value={card.icon || ''}
                onChange={e => {
                  const newCards = [...cards];
                  newCards[index] = { ...newCards[index], icon: e.target.value };
                  onChange(newCards);
                }}
                placeholder="icon.png"
              />
            </div>
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-cyan-800 mb-1">Description</label>
            <textarea
              className="w-full px-3 py-2 border border-cyan-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500"
              value={card.description || ''}
              onChange={e => {
                const newCards = [...cards];
                newCards[index] = { ...newCards[index], description: e.target.value };
                onChange(newCards);
              }}
              placeholder="Card Description"
              rows={2}
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
            <div>
              <label className="block text-sm font-medium text-cyan-800 mb-1">Background Color</label>
              <ColorSelectorInput
                value={card.bgColor || '#e6f7ff'}
                onChange={value => {
                  const newCards = [...cards];
                  newCards[index] = { ...newCards[index], bgColor: value };
                  onChange(newCards);
                }}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-cyan-800 mb-1">Text Color</label>
              <ColorSelectorInput
                value={card.textColor || '#0369a1'}
                onChange={value => {
                  const newCards = [...cards];
                  newCards[index] = { ...newCards[index], textColor: value };
                  onChange(newCards);
                }}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-cyan-800 mb-1">Border Color</label>
              <ColorSelectorInput
                value={card.borderColor || '#bae6fd'}
                onChange={value => {
                  const newCards = [...cards];
                  newCards[index] = { ...newCards[index], borderColor: value };
                  onChange(newCards);
                }}
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
            <div>
              <label className="block text-sm font-medium text-cyan-800 mb-1">Hover BG Color</label>
              <ColorSelectorInput
                value={card.hoverBgColor || '#bae6fd'}
                onChange={value => {
                  const newCards = [...cards];
                  newCards[index] = { ...newCards[index], hoverBgColor: value };
                  onChange(newCards);
                }}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-cyan-800 mb-1">Hover Text Color</label>
              <ColorSelectorInput
                value={card.hoverTextColor || '#0284c7'}
                onChange={value => {
                  const newCards = [...cards];
                  newCards[index] = { ...newCards[index], hoverTextColor: value };
                  onChange(newCards);
                }}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-cyan-800 mb-1">Hover Border Color</label>
              <ColorSelectorInput
                value={card.hoverBorderColor || '#7dd3fc'}
                onChange={value => {
                  const newCards = [...cards];
                  newCards[index] = { ...newCards[index], hoverBorderColor: value };
                  onChange(newCards);
                }}
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-cyan-800 mb-1">Icon Background Color</label>
              <ColorSelectorInput
                value={card.iconBgColor || '#0284c7'}
                onChange={value => {
                  const newCards = [...cards];
                  newCards[index] = { ...newCards[index], iconBgColor: value };
                  onChange(newCards);
                }}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-cyan-800 mb-1">Icon Color</label>
              <ColorSelectorInput
                value={card.iconColor || '#e0f2fe'}
                onChange={value => {
                  const newCards = [...cards];
                  newCards[index] = { ...newCards[index], iconColor: value };
                  onChange(newCards);
                }}
              />
            </div>
          </div>
        </div>
      ))}
      
      <button
        onClick={() => onChange([...cards, {
          title: "New Guarantee",
          description: "Description of this guarantee",
          icon: "guarantee.png",
          bgColor: "#e6f7ff",
          textColor: "#0369a1",
          borderColor: "#bae6fd",
          hoverBgColor: "#bae6fd",
          hoverTextColor: "#0284c7",
          hoverBorderColor: "#7dd3fc",
          iconBgColor: "#0284c7",
          iconColor: "#e0f2fe"
        }])}
        className="bg-cyan-600 text-white px-4 py-2 rounded-md hover:bg-cyan-700 w-full text-center font-medium"
      >
        Add Guarantee Card
      </button>
    </div>
  );
} 