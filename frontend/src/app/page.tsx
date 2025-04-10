import Navbar from './components/Navbar.tsx';
import CodeSandbox from './components/CodeSandbox.tsx';
import OutputBox from './components/OutputBox.tsx';

export default function Home() {
  return (
    <>
      <Navbar />
      <CodeSandbox />
      <OutputBox />
    </>
  );
}
