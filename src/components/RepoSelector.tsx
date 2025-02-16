"use client";

import { useState } from "react";
import { Repo } from "@/types/repo";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "./ui/select";

interface RepoSelectorProps {
  repos: Repo[];
  onChange?: (repo: Repo | null) => void;
}

export default function RepoSelector({ repos, onChange }: RepoSelectorProps) {
  const handleValueChange = (value: string) => {
    const repo = repos.find((repo) => repo.id.toString() === value) || null;
    if (onChange) {
      onChange(repo);
    }
  };

  return (
    <div className="w-full mx-auto">
      <Select onValueChange={handleValueChange}>
        <SelectTrigger className="w-full p-2 border rounded-md bg-white shadow-sm focus:ring-2 focus:ring-blue-500 min-h-[64px]">
          <SelectValue placeholder="Select a repository" />
        </SelectTrigger>
        <SelectContent className="bg-white shadow-lg rounded-md min-h-[64px]">
          {repos.map((repo) => (
            <SelectItem key={repo.id} value={repo.id.toString()}>
              <div className="text-base cursor-pointer text-left text-gray-700">
                {repo.name}
                <div className="text-sm text-gray-500 truncate">
                  {repo.description
                    ? repo.description.length > 100
                      ? `${repo.description.slice(0, 100)}...`
                      : repo.description
                    : "No description"}
                </div>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
