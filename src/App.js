import React, { useState } from 'react';
import TemplateSelector from './components/TemplateSelector';
import ParameterInput from './components/ParameterInput';
import CodeDisplay from './components/CodeDisplay';
import { generateCode } from './utils/codeGenerator';
import './App.css';

function App() {
  const [selectedTemplate, setSelectedTemplate] = useState('');
  const [parameters, setParameters] = useState({});
  const [generatedCode, setGeneratedCode] = useState({ solidity: '', rust: '' });

  const handleGenerateCode = () => {
    const code = generateCode(selectedTemplate, parameters);
    setGeneratedCode(code);
  };

  return (
    <div className="App">
      <h1>Cross-Language Smart Contract Translator</h1>
      <TemplateSelector onSelect={setSelectedTemplate} />
      <ParameterInput onParametersChange={setParameters} />
      <button onClick={handleGenerateCode}>Generate Code</button>
      <CodeDisplay solidityCode={generatedCode.solidity} rustCode={generatedCode.rust} />
    </div>
  );
}

export default App;