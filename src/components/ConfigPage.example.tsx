import React, { useState } from 'react';
import IconConfigField from './IconConfigField';
import BackgroundAndColorsSection from './BackgroundAndColorsSection';

const ConfigPageExample: React.FC = () => {
  // Example state for config values
  const [configValues, setConfigValues] = useState({
    icon: '<YellowCircleIcon className="w-full h-full" />',
    backgroundImage: '/images/back1.png',
    iconColor: '#ffffff',
    backgroundColor: '#3b82f6',
    textColor: '#ffffff',
    borderColor: '#e5e7eb',
    headerIcon: '<BuildingIcon className="w-full h-full" />',
    footerIcon: '<InfoIcon className="w-full h-full" />',
  });

  const [showBackground, setShowBackground] = useState(true);

  // Handler for updating config values
  const handleValueChange = (field: string, value: string) => {
    setConfigValues(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Mock save function
  const handleSave = () => {
    console.log('Config values saved:', configValues);
    alert('Configuration saved!');
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-50 rounded-lg shadow">
      <h1 className="text-2xl font-bold mb-6">Configuration Page</h1>
      
      <BackgroundAndColorsSection 
        backgroundImage={configValues.backgroundImage}
        icon={configValues.icon}
        iconColor={configValues.iconColor}
        backgroundColor={configValues.backgroundColor}
        textColor={configValues.textColor}
        borderColor={configValues.borderColor}
        onBackgroundImageChange={(value) => handleValueChange('backgroundImage', value)}
        onIconChange={(value) => handleValueChange('icon', value)}
        onIconColorChange={(value) => handleValueChange('iconColor', value)}
        onBackgroundColorChange={(value) => handleValueChange('backgroundColor', value)}
        onTextColorChange={(value) => handleValueChange('textColor', value)}
        onBorderColorChange={(value) => handleValueChange('borderColor', value)}
        expanded={showBackground}
        onToggleExpand={() => setShowBackground(!showBackground)}
      />
      
      <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
        <h2 className="text-xl font-semibold mb-4 flex items-center">
          <span className="mr-2">Header Settings</span>
          <button className="text-blue-500">▼</button>
        </h2>
        
        <IconConfigField
          label="Header Icon"
          value={configValues.headerIcon}
          onChange={(value) => handleValueChange('headerIcon', value)}
        />
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
        <h2 className="text-xl font-semibold mb-4 flex items-center">
          <span className="mr-2">Footer Settings</span>
          <button className="text-blue-500">▼</button>
        </h2>
        
        <IconConfigField
          label="Footer Icon"
          value={configValues.footerIcon}
          onChange={(value) => handleValueChange('footerIcon', value)}
        />
      </div>
      
      <div className="flex justify-end mt-6">
        <button 
          className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          onClick={handleSave}
        >
          Save Configuration
        </button>
      </div>
    </div>
  );
};

export default ConfigPageExample; 