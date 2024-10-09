import React from 'react';

const templates = ['ERC20', 'ERC721'];

function TemplateSelector({ onSelect }) {
  return (
    <div>
      <h2>Select a Contract Template</h2>
      <select onChange={(e) => onSelect(e.target.value)}>
        <option value="">Select a template</option>
        {templates.map(template => (
          <option key={template} value={template}>{template}</option>
        ))}
      </select>
    </div>
  );
}

export default TemplateSelector;