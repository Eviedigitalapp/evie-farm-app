import { useState, useRef } from 'react';
import { Camera, X, Upload, Loader2, Image as ImageIcon } from 'lucide-react';
import { uploadPhoto, deletePhoto, compressImage, isStorageConfigured } from '../../utils/photoService';

interface PhotoUploadProps {
  category: 'crops' | 'livestock' | 'farm' | 'general';
  itemId?: string;
  existingPhotos?: string[];
  onPhotosChange?: (photos: string[]) => void;
  maxPhotos?: number;
}

export function PhotoUpload({
  category,
  itemId,
  existingPhotos = [],
  onPhotosChange,
  maxPhotos = 5
}: PhotoUploadProps) {
  const [photos, setPhotos] = useState<string[]>(existingPhotos);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    // Check max photos limit
    if (photos.length + files.length > maxPhotos) {
      setError(`Maximum ${maxPhotos} photos allowed`);
      return;
    }

    setUploading(true);
    setError(null);

    try {
      const newPhotoUrls: string[] = [];

      for (const file of files) {
        // Compress image first
        const compressedFile = await compressImage(file);

        // Upload compressed image
        const result = await uploadPhoto(compressedFile, category, itemId);

        if (result.success && result.url) {
          newPhotoUrls.push(result.url);
        } else {
          console.error('Upload failed:', result.error);
          setError(result.error || 'Upload failed');
        }
      }

      const updatedPhotos = [...photos, ...newPhotoUrls];
      setPhotos(updatedPhotos);
      onPhotosChange?.(updatedPhotos);
    } catch (err) {
      console.error('Photo upload error:', err);
      setError('Failed to upload photos');
    } finally {
      setUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleDelete = async (photoUrl: string) => {
    if (!confirm('Delete this photo?')) return;

    const success = await deletePhoto(photoUrl);
    if (success) {
      const updatedPhotos = photos.filter(url => url !== photoUrl);
      setPhotos(updatedPhotos);
      onPhotosChange?.(updatedPhotos);
    } else {
      setError('Failed to delete photo');
    }
  };

  if (!isStorageConfigured()) {
    return (
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
        <p className="text-xs text-yellow-800">
          Photo uploads require Supabase Storage configuration.
        </p>
      </div>
    );
  }

  return (
    <div>
      {/* Photo Grid */}
      {photos.length > 0 && (
        <div className="grid grid-cols-3 gap-3 mb-3">
          {photos.map((photoUrl, index) => (
            <div key={index} className="relative aspect-square rounded-lg overflow-hidden bg-gray-100 group">
              <img
                src={photoUrl}
                alt={`Photo ${index + 1}`}
                className="w-full h-full object-cover"
              />
              <button
                onClick={() => handleDelete(photoUrl)}
                className="absolute top-2 right-2 p-1.5 bg-red-600 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-700"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Upload Button */}
      {photos.length < maxPhotos && (
        <div>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            multiple
            onChange={handleFileSelect}
            className="hidden"
          />
          <button
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading}
            className="w-full py-3 border-2 border-dashed border-gray-300 rounded-lg hover:border-green-500 hover:bg-green-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <div className="flex items-center justify-center gap-2 text-gray-600">
              {uploading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span className="text-sm">Uploading...</span>
                </>
              ) : (
                <>
                  <Camera className="w-5 h-5" />
                  <span className="text-sm font-medium">
                    Add Photos ({photos.length}/{maxPhotos})
                  </span>
                </>
              )}
            </div>
          </button>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <p className="text-xs text-red-600 mt-2">{error}</p>
      )}

      {/* Info */}
      <p className="text-xs text-gray-500 mt-2">
        Max {maxPhotos} photos, up to 5MB each. Images will be compressed automatically.
      </p>
    </div>
  );
}

// Simple photo viewer/gallery component
interface PhotoGalleryProps {
  photos: string[];
  title?: string;
}

export function PhotoGallery({ photos, title }: PhotoGalleryProps) {
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);

  if (photos.length === 0) {
    return (
      <div className="text-center py-8 text-gray-400">
        <ImageIcon className="w-12 h-12 mx-auto mb-2 opacity-50" />
        <p className="text-sm">No photos yet</p>
      </div>
    );
  }

  return (
    <div>
      {title && <h4 className="text-sm font-medium text-gray-700 mb-3">{title}</h4>}

      <div className="grid grid-cols-4 gap-2">
        {photos.map((photo, index) => (
          <button
            key={index}
            onClick={() => setSelectedPhoto(photo)}
            className="aspect-square rounded-lg overflow-hidden bg-gray-100 hover:opacity-75 transition-opacity"
          >
            <img
              src={photo}
              alt={`Photo ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </button>
        ))}
      </div>

      {/* Lightbox */}
      {selectedPhoto && (
        <div
          className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedPhoto(null)}
        >
          <button
            onClick={() => setSelectedPhoto(null)}
            className="absolute top-4 right-4 p-2 bg-white rounded-full hover:bg-gray-100"
          >
            <X className="w-6 h-6" />
          </button>
          <img
            src={selectedPhoto}
            alt="Full size"
            className="max-w-full max-h-full object-contain"
          />
        </div>
      )}
    </div>
  );
}
