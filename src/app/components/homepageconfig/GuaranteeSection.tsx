import React, { useState } from 'react';
import ColorSelectorInput from '../ColorSelectorInput';

interface GuaranteeSectionProps {
  guaranteeSection: {
    title: string;
    subtitle: string;
    backgroundColor: string;
    textColor: string;
    buttonText: string;
    buttonUrl: string;
    buttonColor: string;
    imageUrl: string;
    guaranteeItems: {
      title: string;
      description: string;
    }[];
  };
  onChange: (newConfig: any) => void;
}

const GuaranteeSection: React.FC<GuaranteeSectionProps> = ({ guaranteeSection, onChange }) => {
  const [expanded, setExpanded] = useState(false);

  const handleChange = (field: string, value: any) => {
    onChange({
      ...guaranteeSection,
      [field]: value
    });
  };

  const handleItemChange = (index: number, field: string, value: string) => {
    const updatedItems = [...guaranteeSection.guaranteeItems];
    updatedItems[index] = { ...updatedItems[index], [field]: value };
    handleChange('guaranteeItems', updatedItems);
  };

  const handleAddItem = () => {
    handleChange('guaranteeItems', [
      ...guaranteeSection.guaranteeItems,
      { title: 'New Guarantee', description: 'Description of the guarantee' }
    ]);
  };

  const handleRemoveItem = (index: number) => {
    const updatedItems = [...guaranteeSection.guaranteeItems];
    updatedItems.splice(index, 1);
    handleChange('guaranteeItems', updatedItems);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target && event.target.result) {
          handleChange('imageUrl', event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="border border-gray-200 rounded-lg shadow-sm mb-4 overflow-hidden">
      <div 
        className="p-4 bg-gray-50 flex justify-between items-center cursor-pointer"
        onClick={() => setExpanded(!expanded)}
      >
        <h3 className="text-lg font-medium text-gray-900">Guarantee Section</h3>
        <span>{expanded ? '▼' : '►'}</span>
      </div>
      
      {expanded && (
        <div className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Title
              </label>
              <input
                type="text"
                value={guaranteeSection.title}
                onChange={(e) => handleChange('title', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Subtitle
              </label>
              <input
                type="text"
                value={guaranteeSection.subtitle}
                onChange={(e) => handleChange('subtitle', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            <div>
              <ColorSelectorInput
                label="Background Color"
                value={guaranteeSection.backgroundColor}
                onChange={(value) => handleChange('backgroundColor', value)}
              />
            </div>

            <div>
              <ColorSelectorInput
                label="Text Color"
                value={guaranteeSection.textColor}
                onChange={(value) => handleChange('textColor', value)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Button Text
              </label>
              <input
                type="text"
                value={guaranteeSection.buttonText}
                onChange={(e) => handleChange('buttonText', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Button URL
              </label>
              <input
                type="text"
                value={guaranteeSection.buttonUrl}
                onChange={(e) => handleChange('buttonUrl', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            <div>
              <ColorSelectorInput
                label="Button Color"
                value={guaranteeSection.buttonColor}
                onChange={(value) => handleChange('buttonColor', value)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Section Image
              </label>
              <div className="flex flex-col gap-2">
                {guaranteeSection.imageUrl && (
                  <div className="relative w-full h-32 overflow-hidden rounded-md">
                    <img 
                      src={guaranteeSection.imageUrl} 
                      alt="Section" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                />
              </div>
            </div>
          </div>

          <div className="mt-6">
            <h4 className="text-md font-medium text-gray-900 mb-3">Guarantee Items</h4>
            
            {guaranteeSection.guaranteeItems.map((item, index) => (
              <div key={index} className="mb-4 border border-gray-200 rounded-lg p-4">
                <div className="flex justify-between items-center mb-3">
                  <h5 className="font-medium text-gray-700">Item #{index + 1}</h5>
                  <button
                    type="button"
                    onClick={() => handleRemoveItem(index)}
                    className="p-1 bg-red-100 text-red-700 rounded hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                  >
                    Remove
                  </button>
                </div>
                
                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Title
                    </label>
                    <input
                      type="text"
                      value={item.title}
                      onChange={(e) => handleItemChange(index, 'title', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Description
                    </label>
                    <textarea
                      value={item.description}
                      onChange={(e) => handleItemChange(index, 'description', e.target.value)}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>
                </div>
              </div>
            ))}
            
            <button
              type="button"
              onClick={handleAddItem}
              className="mt-2 px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Add Guarantee Item
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default GuaranteeSection; 