'use client';

export default function InfoBarConfig({ config, setConfig }: { config: any, setConfig: (v: any) => void }) {
  // Helper function to update preview iframes when colors change
  const updatePreviewIframes = (updatedConfig: any) => {
    if (typeof window !== 'undefined') {
      // First, make sure the config is saved to both localStorage and sessionStorage
      try {
        // Save to localStorage
        const currentConfig = localStorage.getItem('siteConfig');
        if (currentConfig) {
          const parsedConfig = JSON.parse(currentConfig);
          const mergedConfig = {
            ...parsedConfig,
            infoBar: {
              ...parsedConfig.infoBar,
              ...updatedConfig.infoBar
            }
          };
          localStorage.setItem('siteConfig', JSON.stringify(mergedConfig));
        } else {
          localStorage.setItem('siteConfig', JSON.stringify(updatedConfig));
        }
        
        // Save to sessionStorage for new iframe loads
        sessionStorage.setItem('previewConfig', JSON.stringify(updatedConfig));
      } catch (error) {
        console.error('Error saving config to storage:', error);
      }
      
      // Update any existing iframe previews
      const previewIframes = document.querySelectorAll('iframe');
      previewIframes.forEach(iframe => {
        if (iframe && iframe.contentWindow) {
          try {
            iframe.contentWindow.postMessage({
              type: 'configUpdate',
              config: updatedConfig,
              themeColor: updatedConfig.themeColor
            }, '*');
          } catch (error) {
            console.error('Error updating preview:', error);
          }
        }
      });
    }
  };

  // Helper function to update a color in the config and immediately update preview
  const updateColor = (colorType: string, value: string) => {
    const updatedConfig = { 
      ...config, 
      infoBar: { 
        ...config.infoBar, 
        [colorType]: value 
      } 
    };
    
    // Update React state
    setConfig(updatedConfig);
    
    // Update storage and iframe previews
    updatePreviewIframes(updatedConfig);
    
    // Force update on the Header component by dispatching a custom event
    if (typeof window !== 'undefined') {
      document.dispatchEvent(new CustomEvent('infobar-color-changed', { 
        detail: { 
          colorType, 
          value 
        } 
      }));
    }
  };

  return (
    <div className="mb-6 p-6 bg-white border-2 border-purple-300 rounded-xl shadow-lg">
      <h2 className="text-xl font-bold text-black mb-4">Info Bar</h2>
      <div className="mb-2 flex items-center gap-4">
        <label className="font-semibold text-black mr-2">Background Color:</label>
        <input
          type="color"
          value={config.infoBar?.backgroundColor || '#1787c9'}
          onChange={e => updateColor('backgroundColor', e.target.value)}
          className="w-10 h-10 border rounded"
        />
        <input
          type="text"
          value={config.infoBar?.backgroundColor || '#1787c9'}
          onChange={e => {
            const val = e.target.value;
            if (/^#([0-9A-Fa-f]{6}|[0-9A-Fa-f]{3})$/.test(val) || val === '') {
              updateColor('backgroundColor', val);
            }
          }}
          className="ml-2 text-xs border rounded px-2 py-1 w-20"
          maxLength={7}
          placeholder="#1787c9"
        />
      </div>
      <div className="mb-2 flex items-center gap-4">
        <label className="font-semibold text-black mr-2">Phone:</label>
        <input
          type="text"
          value={config.infoBar?.phone || ''}
          onChange={e => setConfig({ ...config, infoBar: { ...config.infoBar, phone: e.target.value } })}
          className="border rounded px-2 py-1 w-56"
          placeholder="Phone"
        />
      </div>
      <div className="mb-2 flex items-center gap-4">
        <label className="font-semibold text-black mr-2">Address:</label>
        <input
          type="text"
          value={config.infoBar?.address || ''}
          onChange={e => setConfig({ ...config, infoBar: { ...config.infoBar, address: e.target.value } })}
          className="border rounded px-2 py-1 w-96"
          placeholder="Address"
        />
      </div>
      <div className="mb-2 flex items-center gap-4">
        <label className="font-semibold text-black mr-2">Hours:</label>
        <input
          type="text"
          value={config.infoBar?.hours || ''}
          onChange={e => setConfig({ ...config, infoBar: { ...config.infoBar, hours: e.target.value } })}
          className="border rounded px-2 py-1 w-64"
          placeholder="Hours"
        />
      </div>
      <div className="mb-2 flex items-center gap-4">
        <label className="font-semibold text-black mr-2">Text Color:</label>
        <input
          type="color"
          value={config.infoBar?.textColor || '#ffffff'}
          onChange={e => updateColor('textColor', e.target.value)}
          className="w-10 h-10 border rounded"
        />
        <input
          type="text"
          value={config.infoBar?.textColor || '#ffffff'}
          onChange={e => {
            const val = e.target.value;
            if (/^#([0-9A-Fa-f]{6}|[0-9A-Fa-f]{3})$/.test(val) || val === '') {
              updateColor('textColor', val);
            }
          }}
          className="ml-2 text-xs border rounded px-2 py-1 w-20"
          maxLength={7}
          placeholder="#ffffff"
        />
      </div>
    </div>
  );
} 