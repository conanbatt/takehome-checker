import { ReactNode } from "react";

interface ProjectAnalysisProps {
  icon?: ReactNode | string;
  title: string;
  analysis: string;
}

export default function ProjectAnalysis({ icon, title, analysis }: ProjectAnalysisProps) {
  return (
    <div className="mt-6 bg-gradient-to-br from-gray-50 to-white shadow-lg rounded-2xl border border-gray-300 p-6 transition hover:shadow-xl max-w-2xl mx-auto">
      <div className="flex items-start gap-4">
        {/* Decorative Icon */}
        <div className="w-12 h-12 flex items-center justify-center bg-blue-100 text-blue-600 rounded-xl text-2xl">
          {icon || "📄"}
        </div>
        {/* Content */}
        <div>
          <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
          <p className="text-gray-700 mt-2 leading-relaxed">
            {analysis || "No analysis available"}
          </p>
        </div>
      </div>
    </div>
  );
}
