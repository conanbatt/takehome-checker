interface ProjectAnalysisProps {
  grade: "S" | "A" | "B" | "C" | "D";
  summary: string;
  redFlags: string[];
  yellowFlags: string[];
}

const gradeColors = {
  S: "bg-gradient-to-br from-blue-500 to-blue-700",
  A: "bg-green-500",
  B: "bg-yellow-500",
  C: "bg-orange-500",
  D: "bg-red-500",
};

export default function ProjectAnalysis({
  grade,
  summary,
  redFlags,
  yellowFlags,
}: ProjectAnalysisProps) {
  return (
    <div className="max-w-2xl mx-auto p-6 border rounded-lg shadow-lg bg-white">
      <div className={`text-white p-3 rounded-md ${gradeColors[grade]}`}>
        <h2 className="text-lg font-bold">Project Score: {grade}</h2>
      </div>
      <p className="mt-4 text-gray-700">{summary}</p>

      {redFlags.length > 0 && (
        <div className="mt-6">
          <h3 className="text-red-600 font-semibold text-lg">🚩 Red Flags ({redFlags.length})</h3>
          <ul className="list-disc list-inside text-gray-700">
            {redFlags.map((flag, index) => (
              <li key={index}>{flag}</li>
            ))}
          </ul>
        </div>
      )}

      {yellowFlags.length > 0 && (
        <div className="mt-6">
          <h3 className="text-yellow-600 font-semibold text-lg">⚠️ Yellow Flags ({yellowFlags.length})</h3>
          <ul className="list-disc list-inside text-gray-700">
            {yellowFlags.map((flag, index) => (
              <li key={index}>{flag}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
