export function Versions({ process }: { process: Record<string, string | undefined> }) {
  return (
    <ul className="flex flex-wrap gap-2">
      {Object.entries(process).map(([key, value]) => (
        <li key={key} className="py-1 px-4 rounded-full bg-slate-100 border text-xs">
          {key} v{value ?? ' [unknown]'}
        </li>
      ))}
    </ul>
  );
}
