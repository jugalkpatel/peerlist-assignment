import { useQueryParamState } from "@/hooks/useQueryParamState";
import { SearchIcon } from "lucide-react";

export function Search() {
  const [value, onChange] = useQueryParamState<string>("q", "");

  return (
    <div className="relative ">
      <span className="absolute inset-y-0 left-0 flex items-center pl-2">
        <SearchIcon className="w-4 h-4" />
      </span>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        type="search"
        placeholder="Search for applicants here..."
        className="w-full bg-transparent rounded-md border border-stroke dark:border-dark-3 py-[10px] px-5 pl-8 text-dark-6 outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-gray-2 disabled:border-gray-2 text-sm"
      />
    </div>
  );
}
