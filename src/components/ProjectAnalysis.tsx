import { ReactNode } from "react";

interface ProjectAnalysisProps {
  icon?: ReactNode | string;
  title: string;
  analysis: string;
}

export default function ProjectAnalysis({ icon, title, analysis }: ProjectAnalysisProps) {
  const splitAnalysis = analysis.split("\n");

  return (
    <div className="mt-8 bg-gradient-to-br from-gray-50 to-white shadow-xl rounded-3xl border border-gray-200 p-8 transition-all hover:shadow-2xl max-w-3xl mx-auto">
      <div className="flex items-start gap-6">
        {/* Decorative Icon */}
        <div className="w-16 h-16 flex items-center justify-center bg-blue-200 text-blue-800 rounded-xl text-3xl shadow-md">
          {icon || "📄"}
        </div>
        {/* Content */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
          <div className="text-gray-700 space-y-4">
            {splitAnalysis.map((line, index) => (
              <p key={index} className="whitespace-pre-wrap leading-relaxed text-md">
                {line}
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
