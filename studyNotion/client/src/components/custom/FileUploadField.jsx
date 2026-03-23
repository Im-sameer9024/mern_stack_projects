/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useState, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import { UploadCloud, X } from 'lucide-react';
import { Label } from '../ui/label';

const FileUploadField = ({ label, value, onChange, error, existingImage }) => {
  // preview can be a blob: URL (new file) or an https: URL (existing image)
  const [preview, setPreview] = useState(null);

  // Sync existingImage → preview when entering edit mode (or when reset() fires)
  useEffect(() => {
    if (!value && existingImage) {
      setPreview(existingImage);
    }
    // If RHF resets value to null AND there is no existingImage, clear preview too
    if (!value && !existingImage) {
      setPreview(null);
    }
  }, [existingImage, value]);

  const onDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];
      if (!file) return;
      onChange(file);
      setPreview(URL.createObjectURL(file));
    },
    [onChange]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: { 'image/*': [] },
    maxFiles: 1,
    onDrop,
  });

  // Revoke blob URLs to avoid memory leaks
  useEffect(() => {
    return () => {
      if (preview?.startsWith('blob:')) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);

  const handleRemove = () => {
    setPreview(null);
    onChange(null);
  };

  return (
    <div className="flex flex-col gap-2 w-full">
      <Label className="text-sm text-richBlack-100">{label}</Label>

      {!preview ? (
        <div
          {...getRootProps()}
          className={`border border-dashed rounded-lg p-10 bg-richBlack-700 flex flex-col items-center justify-center text-center cursor-pointer transition
            ${isDragActive ? 'border-yellow-400 bg-richBlack-600' : 'border-richBlack-500 hover:border-yellow-400'}`}
        >
          <input {...getInputProps()} />

          <div className="flex items-center justify-center w-12 h-12 rounded-full bg-richBlack-800 mb-4">
            <UploadCloud
              className={isDragActive ? 'text-yellow-300' : 'text-yellow-400'}
              size={22}
            />
          </div>

          <p className="text-sm text-richBlack-200">
            {isDragActive ? (
              <span className="text-yellow-400 font-semibold">Drop it here…</span>
            ) : (
              <>
                Drag and drop an image, or{' '}
                <span className="text-yellow-400 font-semibold">Browse</span>
              </>
            )}
          </p>

          <div className="flex gap-6 text-xs text-richBlack-400 mt-3">
            <span>• Aspect ratio 16:9</span>
            <span>• Recommended size 1024×576</span>
          </div>
        </div>
      ) : (
        <div className="relative w-full">
          <img
            src={preview}
            alt="thumbnail preview"
            className="rounded-lg w-full object-cover max-h-64"
          />

          {/* Badge: shows whether this is the existing image or a newly chosen one */}
          <span className="absolute bottom-2 left-2 text-[10px] font-medium px-2 py-0.5 rounded-full bg-black/60 text-richBlack-300">
            {value ? 'New image selected' : 'Current thumbnail'}
          </span>

          <button
            type="button"
            onClick={handleRemove}
            className="absolute top-2 right-2 bg-black/60 p-1 rounded-full hover:bg-black transition"
            title="Remove image"
          >
            <X size={18} className="text-white" />
          </button>
        </div>
      )}

      {error && <span className="text-red-400 text-xs">{error.message}</span>}
    </div>
  );
};

export default FileUploadField;
