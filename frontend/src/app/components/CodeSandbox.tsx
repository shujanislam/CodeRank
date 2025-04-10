'use client'
import { useState } from 'react';

const CodeSandbox = () => {
  const [code, setCode] = useState(
`function execute(a, b) {
  // write your code here
}`
  );

  const handleSubmit = async () => {
    console.log('Submitted code:', code);
    let language = 'js';
    let problem = 'add-num';
    try{
      const response = await fetch(`http://localhost:8080/v1/api`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ language, problem, code }),
      });
    }
    catch(err){
      console.log(err.message);
    }
  };

  return (
    <div className="flex flex-col items-center p-4 w-full">
      <textarea
        className="w-full max-w-3xl h-64 bg-black text-white p-4 font-mono rounded-md resize-none outline-none"
        value={code}
        onChange={(e) => setCode(e.target.value)}
      />
      <button
        onClick={handleSubmit}
        className="mt-4 bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
      >
        Submit Code
      </button>
    </div>
  );
};

export default CodeSandbox;
