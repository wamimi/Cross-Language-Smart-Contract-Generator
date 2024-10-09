import React from 'react';
import { Light as SyntaxHighlighter } from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { javascript, rust } from 'react-syntax-highlighter/dist/esm/languages/hljs';
import { CopyToClipboard } from 'react-copy-to-clipboard';

SyntaxHighlighter.registerLanguage('javascript', javascript);
SyntaxHighlighter.registerLanguage('rust', rust);

function CodeDisplay({ solidityCode, rustCode }) {
  return (
    <div className="code-display">
      <h2>Generated Code</h2>
      <div className="code-container">
        <h3>Solidity</h3>
        <div className="code-block">
          <SyntaxHighlighter language="javascript" style={docco}>
            {solidityCode}
          </SyntaxHighlighter>
          <CopyToClipboard text={solidityCode}>
            <button className="copy-button">Copy</button>
          </CopyToClipboard>
        </div>
      </div>
      <div className="code-container">
        <h3>Rust</h3>
        <div className="code-block">
          <SyntaxHighlighter language="rust" style={docco}>
            {rustCode}
          </SyntaxHighlighter>
          <CopyToClipboard text={rustCode}>
            <button className="copy-button">Copy</button>
          </CopyToClipboard>
        </div>
      </div>
    </div>
  );
}

export default CodeDisplay;