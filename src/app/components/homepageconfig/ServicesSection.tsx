import React, { useState } from 'react';
import ColorSelectorInput from '../ColorSelectorInput';

interface ServiceItem {
  title: string;
  description: string;
  icon: string;
  imageUrl: string;
  link: string;
}

interface ServicesSectionProps {
  servicesSection: {
    title: string;
    subtitle: string;
    backgroundColor: string;
    textColor: string;
    serviceItems: ServiceItem[];
  };
  onChange: (newConfig: any) => void;
}

const ServicesSection: React.FC<ServicesSectionProps> = ({ servicesSection, onChange }) => {
  const [expanded, setExpanded] = useState(false);
  const [activeItemIndex, setActiveItemIndex] = useState<number | null>(null);

  const handleChange = (field: string, value: any) => {
    onChange({
      ...servicesSection,
      [field]: value
    });
  };

  const handleItemChange = (index: number, field: keyof ServiceItem, value: string) => {
    const updatedItems = [...servicesSection.serviceItems];
    updatedItems[index] = { ...updatedItems[index], [field]: value };
    handleChange('serviceItems', updatedItems);
  };

  const handleAddItem = () => {
    handleChange('serviceItems', [
      ...servicesSection.serviceItems,
      { 
        title: 'New Service', 
        description: 'Description of the service',
        icon: 'wrench',
        imageUrl: '',
        link: '/services'
      }
    ]);
    // Open the new item for editing
    setActiveItemIndex(servicesSection.serviceItems.length);
  };

  const handleRemoveItem = (index: number) => {
    const updatedItems = [...servicesSection.serviceItems];
    updatedItems.splice(index, 1);
    handleChange('serviceItems', updatedItems);
    // Reset active item if the removed one was active
    if (activeItemIndex === index) {
      setActiveItemIndex(null);
    } else if (activeItemIndex !== null && activeItemIndex > index) {
      // Adjust active index if an item before it was removed
      setActiveItemIndex(activeItemIndex - 1);
    }
  };

  const handleFileChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target && event.target.result) {
          handleItemChange(index, 'imageUrl', event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // List of available icons
  const iconOptions = [
    { value: 'wrench', label: 'Wrench' },
    { value: 'briefcase', label: 'Briefcase' },
    { value: 'code', label: 'Code' },
    { value: 'cog', label: 'Cog' },
    { value: 'heart', label: 'Heart' },
    { value: 'home', label: 'Home' },
    { value: 'lightbulb', label: 'Light Bulb' },
    { value: 'truck', label: 'Truck' }
  ];

  return (
    <div className="border border-gray-200 rounded-lg shadow-sm mb-4 overflow-hidden">
      <div 
        className="p-4 bg-gray-50 flex justify-between items-center cursor-pointer"
        onClick={() => setExpanded(!expanded)}
      >
        <h3 className="text-lg font-medium text-gray-900">Services Section</h3>
        <span>{expanded ? '▼' : '►'}</span>
      </div>
      
      {expanded && (
        <div className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Section Title
              </label>
              <input
                type="text"
                value={servicesSection.title}
                onChange={(e) => handleChange('title', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Section Subtitle
              </label>
              <input
                type="text"
                value={servicesSection.subtitle}
                onChange={(e) => handleChange('subtitle', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            <div>
              <ColorSelectorInput
                label="Background Color"
                value={servicesSection.backgroundColor}
                onChange={(value) => handleChange('backgroundColor', value)}
              />
            </div>

            <div>
              <ColorSelectorInput
                label="Text Color"
                value={servicesSection.textColor}
                onChange={(value) => handleChange('textColor', value)}
              />
            </div>
          </div>

          <div className="mt-6">
            <div className="flex justify-between items-center mb-3">
              <h4 className="text-md font-medium text-gray-900">Service Items</h4>
              <button
                type="button"
                onClick={handleAddItem}
                className="px-3 py-1 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Add Service
              </button>
            </div>
            
            {servicesSection.serviceItems.map((item, index) => (
              <div key={index} className="mb-4 border border-gray-200 rounded-lg overflow-hidden">
                <div 
                  className="p-3 bg-gray-50 flex justify-between items-center cursor-pointer"
                  onClick={() => setActiveItemIndex(activeItemIndex === index ? null : index)}
                >
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-gray-700">
                      {item.title || `Service #${index + 1}`}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRemoveItem(index);
                      }}
                      className="p-1 bg-red-100 text-red-700 rounded hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                    >
                      Remove
                    </button>
                    <span>{activeItemIndex === index ? '▼' : '►'}</span>
                  </div>
                </div>
                
                {activeItemIndex === index && (
                  <div className="p-4 border-t border-gray-200">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                          Icon
                        </label>
                        <select
                          value={item.icon}
                          onChange={(e) => handleItemChange(index, 'icon', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        >
                          {iconOptions.map((icon) => (
                            <option key={icon.value} value={icon.value}>
                              {icon.label}
                            </option>
                          ))}
                        </select>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Link
                        </label>
                        <input
                          type="text"
                          value={item.link}
                          onChange={(e) => handleItemChange(index, 'link', e.target.value)}
                          placeholder="/services/service-name"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        />
                      </div>
                      
                      <div className="md:col-span-2">
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
                      
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Image
                        </label>
                        <div className="flex flex-col gap-2">
                          {item.imageUrl && (
                            <div className="relative w-full h-48 overflow-hidden rounded-md">
                              <img 
                                src={item.imageUrl} 
                                alt={item.title} 
                                className="w-full h-full object-cover"
                              />
                            </div>
                          )}
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleFileChange(index, e)}
                            className="file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ServicesSection; 