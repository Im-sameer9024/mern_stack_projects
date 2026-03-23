import { Button } from '@/components/ui/button';
import { RxCross2 } from 'react-icons/rx';
import { useUpdateProfileImage } from '../hooks/useProfile';
import { useForm } from 'react-hook-form';
import { useRef, useState } from 'react';
import { FiUploadCloud } from 'react-icons/fi';
import imageCompression from 'browser-image-compression';

const ProfileImageForm = ({ setOpenImageForm }) => {
  const { mutateAsync: updateProfileImage, isPending } = useUpdateProfileImage();
  const [previewUrl, setPreviewUrl] = useState(null);
  const [dragOver, setDragOver] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const inputRef = useRef(null);

  const {
    handleSubmit,
    setValue,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm();

  const onClose = () => setOpenImageForm(false);

  const validateAndSet = (file) => {
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setError('file', { message: 'Only image files are allowed' });
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setError('file', { message: 'Image must be smaller than 5MB' });
      return;
    }

    clearErrors('file');
    setValue('file', file);
    setPreviewUrl(URL.createObjectURL(file));
  };

  const handleFileChange = (e) => validateAndSet(e.target.files?.[0]);

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    validateAndSet(e.dataTransfer.files?.[0]);
  };

  const onSubmit = async (data) => {
    if (!data.file) {
      setError('file', { message: 'Please select an image' });
      return;
    }

    //--------- compress image file---------

    const options = {
      maxSizeMB: 0.3, // 300KB is plenty for a profile pic
      maxWidthOrHeight: 400, // profile pics are never displayed larger than this
      useWebWorker: true,
      fileType: 'image/webp', // ✅ modern format, smaller than jpg/png
      initialQuality: 0.8, // 80% quality — visually identical, smaller file
    };
    const compressedFile = await imageCompression(data.file, options);

    const formData = new FormData();
    formData.append('file', compressedFile);

    setUploadProgress(0);
    await updateProfileImage({
      formData,
      onUploadProgress: (progressEvent) => {
        const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
        setUploadProgress(percentCompleted);
      },
    });

    onClose();
  };

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Update Profile Image</h3>
        <Button onClick={onClose} disabled={isPending}>
          <RxCross2 size={18} />
        </Button>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {/* Drop Zone */}
        <div
          onClick={() => inputRef.current?.click()}
          onDragOver={(e) => {
            e.preventDefault();
            setDragOver(true);
          }}
          onDragLeave={() => setDragOver(false)}
          onDrop={handleDrop}
          className={`cursor-pointer border-2 border-dashed rounded-lg p-10 flex flex-col items-center justify-center gap-2 transition-colors
            ${dragOver ? 'border-blue-500 bg-blue-50/5' : 'border-richBlack-500 bg-richBlack-900/40'}
            ${errors.file ? 'border-red-500' : ''}`}
        >
          {previewUrl ? (
            <img
              src={previewUrl}
              alt="Preview"
              className="w-20 h-20 rounded-full object-cover border-2 border-richBlack-500"
            />
          ) : (
            <FiUploadCloud size={40} className="text-richBlack-400" />
          )}

          <p className="font-semibold text-base">{previewUrl ? 'Change Image' : 'Upload a File'}</p>
          <p className="text-sm text-richBlack-400">Drag and drop files here</p>

          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
          />
        </div>

        {/* Error */}
        {errors.file && <p className="text-sm text-red-500">{errors.file.message}</p>}

        {/* Progress Bar */}
        {isPending && (
          <div className="w-full bg-richBlack-700 rounded-full h-2.5 mt-4">
            <div
              className="bg-yellow-400 h-2.5 rounded-full transition-all duration-300 ease-in-out"
              style={{ width: `${uploadProgress}%` }}
            ></div>
            <p className="text-xs text-richBlack-200 mt-1 text-center">
              Uploading: {uploadProgress}%
            </p>
          </div>
        )}

        {/* Submit */}
        <Button
          type="submit"
          disabled={isPending}
          className=" w-full bg-yellow-400 text-black hover:bg-yellow-300"
        >
          {isPending ? (
            <span className="flex items-center gap-2">
              <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Uploading...
            </span>
          ) : (
            'Upload'
          )}
        </Button>
      </form>
    </div>
  );
};

export default ProfileImageForm;
