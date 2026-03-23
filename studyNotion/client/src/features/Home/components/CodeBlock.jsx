import { useEffect, useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

const CodeBlock = ({ codeString }) => {
  const [displayedCode, setDisplayedCode] = useState('');

  useEffect(() => {
    let index = 0;

    const interval = setInterval(() => {
      setDisplayedCode(codeString.slice(0, index));
      index++;

      // restart typing when finished (infinite loop)
      if (index > codeString.length) {
        index = 0;
      }
    }, 50); // typing speed

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full max-w-3xl mx-auto overflow-hidden rounded-xl shadow-lg">
      {/* gradient overlay */}
      <div className="absolute inset-0 bg-linear-to-r from-yellow-500/10 via-blue-500/10 to-transparent pointer-events-none z-10" />

      <SyntaxHighlighter
        language="html"
        style={atomDark}
        customStyle={{
          margin: 0,
          background: '#0B1120',
          padding: '24px',
          fontSize: '14px',
          minHeight: '350px',
        }}
      >
        {displayedCode}
      </SyntaxHighlighter>
    </div>
  );
};

export default CodeBlock;
