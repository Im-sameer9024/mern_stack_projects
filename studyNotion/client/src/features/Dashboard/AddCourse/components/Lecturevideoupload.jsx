import { useRef, useState, useEffect } from 'react';
import { CloudUpload, X, FileVideo } from 'lucide-react';

const LectureVideoUpload = ({ value, onChange, error }) => {
  const inputRef = useRef(null);
  const [dragOver, setDragOver] = useState(false);
  const [preview, setPreview] = useState(null); // ✅ preview state

  const handleFile = (file) => {
    if (!file) return;

    const isVideo = file.type.startsWith('video/');
    const isImage = file.type.startsWith('image/');
    if (!isVideo && !isImage) return;

    onChange(file);

    // ✅ create preview URL
    const url = URL.createObjectURL(file);
    setPreview(url);
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
    setPreview(null); // ✅ clear preview
    if (inputRef.current) inputRef.current.value = '';
  };

  // ✅ cleanup memory
  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  return (
    <div className="space-y-1.5">
      <label className="text-sm font-medium text-white">
        Lecture Video <span className="text-red-400">*</span>
      </label>

      <div
        onClick={() => !value && inputRef.current?.click()}
        onDragOver={(e) => {
          e.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
        className={`relative border-2 border-dashed rounded-lg transition-all duration-200
          ${dragOver ? 'border-yellow-400 bg-yellow-400/5' : 'border-richBlack-500 bg-richBlack-700/50'}
          ${error ? 'border-red-500' : ''}
          ${!value ? 'cursor-pointer hover:border-richBlack-400' : 'cursor-default'}
          min-h-40 flex flex-col items-center justify-center gap-3 px-6 py-8`}
      >
        {value ? (
          /* ── preview when file selected ── */
          <div className="flex flex-col gap-3 w-full">
            
            {/* ✅ VIDEO PREVIEW */}
            {preview && value.type.startsWith('video/') && (
              <video
                src={preview}
                controls
                className="w-full rounded-md max-h-48"
              />
            )}

            {/* FILE INFO (same design) */}
            <div className="flex items-center gap-3 w-full">
              <div
                className="w-10 h-10 rounded-lg bg-yellow-400/10 border border-yellow-400/20
                          flex items-center justify-center shrink-0"
              >
                <FileVideo size={20} className="text-yellow-400" />
              </div>

              <div className="flex-1 min-w-0">
                <p className="text-sm text-white font-medium truncate">{value.name}</p>
                <p className="text-xs text-richBlack-400 mt-0.5">
                  {(value.size / (1024 * 1024)).toFixed(2)} MB
                </p>
              </div>

              <button
                type="button"
                onClick={handleRemove}
                className="shrink-0 w-7 h-7 rounded-full bg-richBlack-600 hover:bg-red-500/20
                           flex items-center justify-center transition-colors"
              >
                <X size={14} className="text-richBlack-300 hover:text-red-400" />
              </button>
            </div>
          </div>
        ) : (
          /* ── empty state ── */
          <>
            <div
              className="w-12 h-12 rounded-full bg-richBlack-600 border border-richBlack-500
                        flex items-center justify-center"
            >
              <CloudUpload size={22} className="text-richBlack-300" />
            </div>

            <div className="text-center space-y-1">
              <p className="text-sm text-richBlack-300">
                Drag and drop an image, or{' '}
                <span className="text-yellow-400 font-medium">Browse</span>
              </p>
              <p className="text-xs text-richBlack-500">
                Max 6MB each (12MB for videos)
              </p>
            </div>

            <div className="flex items-center gap-6 text-xs text-richBlack-400 mt-1">
              <span>• Aspect ratio 16:9</span>
              <span>
                • <strong className="text-richBlack-300">Recommended size 1024×576</strong>
              </span>
            </div>
          </>
        )}

        <input
          ref={inputRef}
          name="file"
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