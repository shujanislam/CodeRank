const OutputBox = ({ result }) => {
  return (
  <div className="flex flex-col items-center">
    <div className="mt-6 w-full max-w-3xl bg-[#1e1e1e] text-green-400 p-4 rounded-lg font-mono text-sm shadow-md">
      <h2 className="text-white mb-2 font-semibold">Console Output:</h2>
      <div className="whitespace-pre-wrap break-words">
        {result ? result : "⏳ Waiting for result..."}
      </div>
    </div>
  </div>
  );
};

export default OutputBox;
