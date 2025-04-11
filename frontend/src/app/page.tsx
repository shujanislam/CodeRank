'use client';
import { useState } from 'react';
import Navbar from './components/Navbar';
import CodeSandbox from './components/CodeSandbox';
import OutputBox from './components/OutputBox';
import Problems from './components/Problems';

export default function Home() {
  const [selectedProblem, setSelectedProblem] = useState('');

  return (
    <>
      <Navbar />
      <CodeSandbox selectedProblem={selectedProblem} />
      <OutputBox />
      <Problems onProblemSelect={setSelectedProblem} />
    </>
  );
}
