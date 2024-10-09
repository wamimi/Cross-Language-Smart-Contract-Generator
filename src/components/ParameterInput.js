import React from 'react';

const templateParams = {
  ERC20: ['name', 'symbol', 'totalSupply'],
  ERC721: ['name', 'symbol']
};

function ParameterInput({ template, onChange }) {
  if (!template) return null;

  return (
    <div className="parameter-input">
      <h2>Enter Parameters</h2>
      {templateParams[template].map(param => (
        <div key={param} className="parameter-field">
          <label htmlFor={param}>{param}: </label>
          <input 
            id={param}
            type="text" 
            onChange={(e) => onChange(param, e.target.value)} 
          />
        </div>
      ))}
    </div>
  );
}

export default ParameterInput;