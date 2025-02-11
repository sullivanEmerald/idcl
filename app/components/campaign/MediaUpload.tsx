import { useFormContext } from 'react-hook-form';
import { CampaignFormData } from '@/app/types/campaign';

export function MediaUpload() {
  const {
    register,
    formState: { errors },
    watch,
    setValue,
    getValues,
  } = useFormContext<CampaignFormData>();

  const contentType = watch('contentType');

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files?.length) return;

    const fileArray = Array.from(files);
    const mediaFiles = fileArray.map((file) => {
      const type = file.type.startsWith('video/') ? 'video' as const : 'image' as const;
      return {
        type,
        url: URL.createObjectURL(file),
        file,
      };
    });

    setValue('mediaFiles', mediaFiles);
  };

  return (
    <div className="space-y-4">
      <div>
        <label
          htmlFor="contentType"
          className="block text-sm font-medium text-gray-700"
        >
          Content Type
        </label>
        <select
          id="contentType"
          {...register("contentType")}
          className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
        >
          <option value="photo">Photo</option>
          <option value="video">Video</option>
          <option value="carousel">Carousel</option>
        </select>
      </div>

      <div>
        <label
          htmlFor="mediaFiles"
          className="block text-sm font-medium text-gray-700"
        >
          Upload Media
        </label>
        <input
          type="file"
          id="mediaFiles"
          accept={
            contentType === 'video'
              ? 'video/*'
              : contentType === 'photo'
              ? 'image/*'
              : 'image/*,video/*'
          }
          multiple={contentType === 'carousel'}
          onChange={handleFileChange}
          className="mt-1 block w-full text-sm text-gray-500
            file:mr-4 file:py-2 file:px-4
            file:rounded-md file:border-0
            file:text-sm file:font-semibold
            file:bg-indigo-50 file:text-indigo-700
            hover:file:bg-indigo-100"
        />
        {errors.mediaFiles && (
          <p className="mt-1 text-sm text-red-600">
            {errors.mediaFiles.message}
          </p>
        )}
      </div>

      {/* Preview uploaded files */}
      <div className="grid grid-cols-3 gap-4 mt-4">
        {watch('mediaFiles')?.map((file, index) => (
          <div key={index} className="relative">
            {file.type === 'image' ? (
              <img
                src={file.url}
                alt={`Preview ${index + 1}`}
                className="w-full h-32 object-cover rounded-lg"
              />
            ) : (
              <video
                src={file.url}
                className="w-full h-32 object-cover rounded-lg"
                controls
              />
            )}
            <button
              type="button"
              onClick={() => {
                const currentFiles = getValues('mediaFiles');
                setValue(
                  'mediaFiles',
                  currentFiles.filter((_, i) => i !== index)
                );
              }}
              className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
            >
              ×
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
