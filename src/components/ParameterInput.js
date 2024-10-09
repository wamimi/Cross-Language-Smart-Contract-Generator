import React from 'react';

const templateParams = {
  ERC20: ['name', 'symbol', 'totalSupply'],
  ERC721: ['name', 'symbol']
};

function ParameterInput({ template, onChange }) {
  if (!template) return null;

  return (
    <div>
      <h2>Enter Parameters</h2>
      {templateParams[template].map(param => (
        <div key={param}>
          <label>{param}: </label>
          <input 
            type="text" 
            onChange={(e) => onChange(param, e.target.value)} 
          />
        </div>
      ))}
    </div>
  );
}

export default ParameterInput;