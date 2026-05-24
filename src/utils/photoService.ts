// Photo upload service using Supabase Storage
import { supabase } from './supabaseClient';

export interface PhotoUploadResult {
  success: boolean;
  url?: string;
  error?: string;
}

// Upload photo to Supabase Storage
export async function uploadPhoto(
  file: File,
  category: 'crops' | 'livestock' | 'farm' | 'general',
  itemId?: string
): Promise<PhotoUploadResult> {
  try {
    // Validate file
    if (!file.type.startsWith('image/')) {
      return {
        success: false,
        error: 'File must be an image'
      };
    }

    // Check file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      return {
        success: false,
        error: 'Image must be less than 5MB'
      };
    }

    // Generate unique filename
    const timestamp = Date.now();
    const randomString = Math.random().toString(36).substring(7);
    const extension = file.name.split('.').pop();
    const filename = itemId
      ? `${category}/${itemId}_${timestamp}.${extension}`
      : `${category}/${timestamp}_${randomString}.${extension}`;

    // Upload to Supabase Storage
    const { data, error } = await supabase.storage
      .from('evie-farm-photos')
      .upload(filename, file, {
        cacheControl: '3600',
        upsert: false
      });

    if (error) {
      console.error('Upload error:', error);
      return {
        success: false,
        error: error.message
      };
    }

    // Get public URL
    const { data: { publicUrl } } = supabase.storage
      .from('evie-farm-photos')
      .getPublicUrl(filename);

    return {
      success: true,
      url: publicUrl
    };
  } catch (error) {
    console.error('Photo upload error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Upload failed'
    };
  }
}

// Delete photo from Supabase Storage
export async function deletePhoto(photoUrl: string): Promise<boolean> {
  try {
    // Extract filename from URL
    const url = new URL(photoUrl);
    const pathname = url.pathname;
    const filename = pathname.split('/').slice(-2).join('/'); // Get 'category/filename'

    const { error } = await supabase.storage
      .from('evie-farm-photos')
      .remove([filename]);

    if (error) {
      console.error('Delete error:', error);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Photo delete error:', error);
    return false;
  }
}

// Compress image before upload
export async function compressImage(file: File, maxWidth: number = 1200): Promise<File> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target?.result as string;

      img.onload = () => {
        const canvas = document.createElement('canvas');
        let width = img.width;
        let height = img.height;

        // Resize if needed
        if (width > maxWidth) {
          height = (height * maxWidth) / width;
          width = maxWidth;
        }

        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext('2d');
        ctx?.drawImage(img, 0, 0, width, height);

        canvas.toBlob(
          (blob) => {
            if (blob) {
              const compressedFile = new File([blob], file.name, {
                type: 'image/jpeg',
                lastModified: Date.now()
              });
              resolve(compressedFile);
            } else {
              reject(new Error('Compression failed'));
            }
          },
          'image/jpeg',
          0.85
        );
      };

      img.onerror = () => reject(new Error('Image load failed'));
    };

    reader.onerror = () => reject(new Error('File read failed'));
  });
}

// Upload multiple photos
export async function uploadMultiplePhotos(
  files: File[],
  category: 'crops' | 'livestock' | 'farm' | 'general',
  itemId?: string
): Promise<PhotoUploadResult[]> {
  const uploadPromises = files.map(file => uploadPhoto(file, category, itemId));
  return Promise.all(uploadPromises);
}

// Check if storage is configured
export function isStorageConfigured(): boolean {
  return true; // Supabase is always configured in this app
}
