import { useState } from 'react';
import { isPdf } from '../lib/files';

export function useFileSelection() {
  const [files, setFiles] = useState([]);

  const addFiles = (fileList) => {
    const pdfs = Array.from(fileList).filter(isPdf);
    setFiles((current) => [...current, ...pdfs]);
  };

  const removeFile = (index) => setFiles((current) => current.filter((_, i) => i !== index));
  const clearFiles = () => setFiles([]);

  return { files, addFiles, removeFile, clearFiles };
}
