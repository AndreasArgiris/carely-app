import { useState } from 'react';
import { UploadCloud } from 'lucide-react';

export function FileDropzone({ onFilesAdded }) {
  const [isDragging, setIsDragging] = useState(false);

  const handleDrop = (event) => {
    event.preventDefault();
    setIsDragging(false);
    onFilesAdded(event.dataTransfer.files);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    setIsDragging(true);
  };

  const handleInput = (event) => {
    onFilesAdded(event.target.files);
    event.target.value = '';
  };

  return (
    <label
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={() => setIsDragging(false)}
      className={`flex cursor-pointer flex-col items-center gap-2 rounded-2xl border-2 border-dashed px-4 py-7 text-center transition ${isDragging ? 'border-ink bg-sun-50 shadow-glow' : 'border-zinc-200 hover:border-zinc-400'}`}
    >
      <span className="grid size-11 place-items-center rounded-xl bg-sun shadow-glow-sm">
        <UploadCloud className="size-5" />
      </span>
      <span className="text-sm font-semibold">Drop PDF results here or click to browse</span>
      <span className="text-xs text-zinc-400">One or more .pdf files</span>
      <input
        type="file"
        accept="application/pdf,.pdf"
        multiple
        className="sr-only"
        onChange={handleInput}
      />
    </label>
  );
}
