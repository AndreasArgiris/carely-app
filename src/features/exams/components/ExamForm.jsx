import { useFormState } from '@/shared/hooks/useFormState';
import { toInputDate } from '@/shared/lib/date';
import { Button } from '@/shared/ui/Button';
import { Card } from '@/shared/ui/Card';
import { Field, Input, TextArea } from '@/shared/ui/fields';
import { useFileSelection } from '../hooks/useFileSelection';
import { toAttachment } from '../lib/files';
import { AttachmentChip } from './AttachmentChip';
import { FileDropzone } from './FileDropzone';

const createInitial = () => ({ title: '', examDate: toInputDate(), doctor: '', note: '' });

export function ExamForm({ onSubmit }) {
  const { values, handleChange, reset } = useFormState(createInitial);
  const { files, addFiles, removeFile, clearFiles } = useFileSelection();

  const handleSubmit = async (event) => {
    event.preventDefault();
    await onSubmit({ ...values, title: values.title.trim(), files: files.map(toAttachment) });
    reset();
    clearFiles();
  };

  return (
    <Card>
      <form onSubmit={handleSubmit} className="grid gap-4 sm:grid-cols-2">
        <Field label="Exam" className="sm:col-span-2">
          <Input
            name="title"
            value={values.title}
            onChange={handleChange}
            required
            placeholder="e.g. Blood test, MRI knee"
          />
        </Field>
        <Field label="Date">
          <Input
            type="date"
            name="examDate"
            value={values.examDate}
            onChange={handleChange}
            required
          />
        </Field>
        <Field label="Doctor / lab">
          <Input
            name="doctor"
            value={values.doctor}
            onChange={handleChange}
            placeholder="Optional"
          />
        </Field>
        <Field label="Note" className="sm:col-span-2">
          <TextArea
            name="note"
            value={values.note}
            onChange={handleChange}
            placeholder="Results summary, doctor's comments…"
          />
        </Field>
        <div className="space-y-3 sm:col-span-2">
          <FileDropzone onFilesAdded={addFiles} />
          {files.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {files.map((file, index) => (
                <AttachmentChip
                  key={`${file.name}-${index}`}
                  name={file.name}
                  size={file.size}
                  onRemove={() => removeFile(index)}
                />
              ))}
            </div>
          )}
        </div>
        <div className="sm:col-span-2">
          <Button type="submit">Add to history</Button>
        </div>
      </form>
    </Card>
  );
}
