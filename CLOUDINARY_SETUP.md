# Cloudinary Setup for Video Uploads

This guide walks you through setting up Cloudinary for direct video uploads in the Adminting platform.

## Why Cloudinary?

Our application now supports video uploads up to 100MB by using Cloudinary's direct upload capabilities. This bypasses server-side upload size limitations.

## Setup Instructions

1. **Create a Cloudinary Account**
   - Sign up at [cloudinary.com](https://cloudinary.com) if you don't have an account
   - After signing up, navigate to your dashboard

2. **Get Your Cloud Name**
   - In your Cloudinary dashboard, find your cloud name
   - It's displayed in the top right corner or in the Account Details section

3. **Create an Upload Preset**
   - Go to Settings > Upload
   - Scroll down to Upload presets and click "Add upload preset"
   - Create a new preset with the following settings:
     - **Preset name**: `adminting_videos` (or choose your own name)
     - **Signing Mode**: Unsigned
     - **Folder**: Optionally specify a folder where uploads will go (e.g., `adminting/videos`)
     - **Access Mode**: public
   - Save the preset

4. **Configure Environment Variables**
   - Open or create the `.env.local` file in the project root
   - Add the following variables:
   ```
   NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your-cloud-name
   NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=adminting_videos  # Or your chosen preset name
   ```

5. **Security Considerations**
   - The upload preset is unsigned, which is convenient but less secure
   - For production, consider using a signed upload with a server-side signature
   - Add upload restrictions in your preset settings (file types, max size, etc.)

## Monitoring Uploads

You can monitor uploads and manage your media in the Cloudinary Media Library section of your dashboard.

## Troubleshooting

- **Uploads Failing**: Check your browser console for error messages. Verify that your cloud name and upload preset are correct.
- **Videos Not Playing**: Ensure the video format is supported by most browsers (MP4 is recommended).
- **Size Limitations**: Verify that your Cloudinary plan supports your upload size. Free plans have monthly limits.

## Additional Resources

- [Cloudinary Documentation](https://cloudinary.com/documentation)
- [Upload API Reference](https://cloudinary.com/documentation/upload_api_reference)
- [Video Transformations](https://cloudinary.com/documentation/video_transformation_reference) 