'use client';
import { useEffect, useState } from 'react';

const Problems = ({ onProblemSelect }) => {
  const [problems, setProblems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProblems = async () => {
      try {
        const result = await fetch('http://localhost:8080/v1/api/problems');
        if (result.ok) {
          const data = await result.json();
          setProblems(data);
        } else {
          setError('No problems found or API error');
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProblems();
  }, []);

  if (loading) return <div className="p-4">Loading problems...</div>;
  if (error) return <div className="text-red-500 p-4">Error: {error}</div>;
  if (problems.length === 0) return <div>No problems available</div>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Problems</h2>
      <ul className="space-y-4">
        {problems.map((problem) => (
          <li
            key={problem.id}
            className="border p-4 rounded-md shadow-sm hover:bg-gray-100 cursor-pointer"
            onClick={() => onProblemSelect(problem.title)}
          >
            <h3 className="text-lg font-semibold">{problem.title}</h3>
            <p className="text-sm text-gray-600">{problem.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Problems;
