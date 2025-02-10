"use client";

import { useState } from "react";
import { Repo } from "@/types/repo";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "./ui/select";

interface RepoSelectorProps {
  repos: Repo[];
  onChange?: (repo: Repo | null) => void;
}

export default function RepoSelector({ repos, onChange }: RepoSelectorProps) {
  const [selectedRepo, setSelectedRepo] = useState<Repo | null>(null);

  const handleValueChange = (value: string) => {
    const repo = repos.find((repo) => repo.id === value) || null;
    setSelectedRepo(repo);
    if (onChange) {
      onChange(repo);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <Select onValueChange={handleValueChange}>
        <SelectTrigger className="w-full p-2 border rounded-md bg-white shadow-sm focus:ring-2 focus:ring-blue-500">
          <SelectValue placeholder="Select a repository" />
        </SelectTrigger>
        <SelectContent className="bg-white shadow-lg rounded-md">
          {repos.map((repo) => (
            <SelectItem key={repo.id} value={repo.id}>
              {repo.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {selectedRepo && (
        <div className="mt-4 p-4 border rounded-md bg-gray-50 shadow-sm align-center">
          <h2 className="text-lg font-bold text-gray-900">{selectedRepo.name}</h2>
          <p className="text-gray-700">{selectedRepo.description || "No description"}</p>
        </div>
      )}
    </div>
  );
}
