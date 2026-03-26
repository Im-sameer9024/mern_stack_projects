import { useRef, useState, useEffect } from 'react';
import { CloudUpload, X, FileVideo } from 'lucide-react';
import { Spinner } from '@/components/ui/spinner';

// ─────────────────────────────────────────────────────────────────────────────
// LectureVideoUpload
//
// Handles three states:
//   1. Empty          — value is null/undefined
//   2. Existing video — value is a string (Cloudinary URL from edit mode)
//   3. New file       — value is a File object (user just picked a file)
// ─────────────────────────────────────────────────────────────────────────────

const LectureVideoUpload = ({ value, onChange, error }) => {
  const inputRef = useRef(null);
  const [dragOver, setDragOver] = useState(false);
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    // No value — clear preview
    if (!value) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setPreview(null);
      return;
    }

    // Existing Cloudinary URL (edit mode) — use directly as src
    if (typeof value === 'string') {
      setPreview(value);
      return;
    }

    // Newly picked File — create a local object URL
    if (value instanceof File) {
      const url = URL.createObjectURL(value);
      setPreview(url);
      // Revoke the blob URL when value changes or component unmounts
      return () => URL.revokeObjectURL(url);
    }
  }, [value]);

  const handleFile = (file) => {
    if (!file) return;
    if (!file.type.startsWith('video/')) return;
    onChange(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    handleFile(e.dataTransfer.files?.[0]);
  };

  const handleChange = (e) => handleFile(e.target.files?.[0]);

  const handleRemove = (e) => {
    e.stopPropagation();
    onChange(null);
    // preview is reset by the useEffect above reacting to value → null
    if (inputRef.current) inputRef.current.value = '';
  };

  return (
    <div className="space-y-1.5">
      <label className="text-sm font-medium text-white">
        Lecture Video <span className="text-red-400">*</span>
      </label>

      <div
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => {
          e.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
        className={[
          'relative border-2 border-dashed rounded-lg transition-all cursor-pointer',
          'min-h-40 flex flex-col items-center justify-center gap-3 px-6 py-8',
          dragOver
            ? 'border-yellow-400 bg-yellow-400/5'
            : 'border-richBlack-500 bg-richBlack-700/50',
          error ? 'border-red-500' : '',
        ].join(' ')}
      >
        {preview ? (
          <div className="flex flex-col gap-3 w-full">
            {/* Video preview — works for both blob URLs and Cloudinary URLs */}
            <video
              src={preview}
              controls
              className="w-full rounded-md max-h-48"
              // Prevent click on video from re-opening the file picker
              onClick={(e) => e.stopPropagation()}
            />

            {/* File info row */}
            <div className="flex items-center gap-3 w-full">
              <div
                className="w-10 h-10 rounded-lg bg-yellow-400/10 border border-yellow-400/20
                              flex items-center justify-center shrink-0"
              >
                <FileVideo size={20} className="text-yellow-400" />
              </div>

              <div className="flex-1 min-w-0">
                <p className="text-sm text-white font-medium truncate">
                  {value instanceof File ? value.name : 'Existing video'}
                </p>
                {value instanceof File && (
                  <p className="text-xs text-richBlack-400 mt-0.5">
                    {(value.size / (1024 * 1024)).toFixed(2)} MB
                  </p>
                )}
                {typeof value === 'string' && (
                  <p className="text-xs text-richBlack-400 mt-0.5">
                    Click to replace with a new video
                  </p>
                )}
              </div>

              <button
                type="button"
                onClick={handleRemove}
                className="w-7 h-7 rounded-full bg-richBlack-600 hover:bg-red-500/20
                           flex items-center justify-center shrink-0 transition-colors"
              >
                <X size={14} className="text-richBlack-300 hover:text-red-400" />
              </button>
            </div>
          </div>
        ) : (
          <>
            <div
              className="w-12 h-12 rounded-full bg-richBlack-600 border border-richBlack-500
                            flex items-center justify-center"
            >
              <CloudUpload size={22} className="text-richBlack-300" />
            </div>
            <div className="text-center">
              <p className="text-sm text-richBlack-300">
                Drop a video here or <span className="text-yellow-400">browse</span>
              </p>
              <p className="text-xs text-richBlack-500 mt-1">MP4, MOV, AVI up to 1 GB</p>
            </div>
          </>
        )}

        <input
          ref={inputRef}
          type="file"
          accept="video/*"
          className="hidden"
          onChange={handleChange}
        />
      </div>

      {error && <p className="text-xs text-red-400">{error}</p>}
    </div>
  );
};

export default LectureVideoUpload;
