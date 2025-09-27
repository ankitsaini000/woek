"use client";

import { useState } from "react";
import Image from "next/image";
import { Upload, X, Image as ImageIcon, Loader2 } from "lucide-react";
import { CLOUDINARY_CONFIG, UPLOAD_CONFIG } from "@/config/cloudinary";

interface ImageUploadProps {
  onImageUpload: (url: string) => void;
  onGalleryUpload: (urls: string[]) => void;
  existingImage?: string;
  existingGallery?: string[];
}

export function ImageUpload({ onImageUpload, onGalleryUpload, existingImage = "", existingGallery = [] }: ImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");
  const [mainImage, setMainImage] = useState(existingImage);
  const [galleryImages, setGalleryImages] = useState<string[]>(existingGallery);

  const uploadToCloudinary = async (file: File): Promise<string> => {
    if (!CLOUDINARY_CONFIG.CLOUD_NAME || CLOUDINARY_CONFIG.CLOUD_NAME === 'your_cloud_name_here') {
      throw new Error('Cloudinary not configured. Please set NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME in your .env.local file.');
    }

    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', CLOUDINARY_CONFIG.UPLOAD_PRESET);
    
    console.log('Upload parameters:', {
      cloudName: CLOUDINARY_CONFIG.CLOUD_NAME,
      uploadPreset: CLOUDINARY_CONFIG.UPLOAD_PRESET,
      apiUrl: CLOUDINARY_CONFIG.API_URL
    });

    try {
      const response = await fetch(CLOUDINARY_CONFIG.API_URL, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Cloudinary upload error:', errorData);
        throw new Error(errorData.error?.message || `Upload failed with status ${response.status}`);
      }

      const data = await response.json();
      console.log('Upload successful:', data.secure_url);
      return data.secure_url;
    } catch (error) {
      console.error('Upload error:', error);
      throw error;
    }
  };

  const handleMainImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!UPLOAD_CONFIG.ALLOWED_TYPES.includes(file.type)) {
      setUploadError('Please select a valid image file (JPEG, PNG, GIF, WebP)');
      return;
    }

    // Validate file size
    if (file.size > UPLOAD_CONFIG.MAX_FILE_SIZE) {
      setUploadError(`File size must be less than ${UPLOAD_CONFIG.MAX_FILE_SIZE / (1024 * 1024)}MB`);
      return;
    }

    setIsUploading(true);
    setUploadError("");

    try {
      const url = await uploadToCloudinary(file);
      setMainImage(url);
      onImageUpload(url);
    } catch (error: unknown) {
      console.error('Upload error:', error);
      setUploadError(`Upload failed: ${error instanceof Error ? error.message : 'Unknown error'}. You can use the manual URL input below instead.`);
    } finally {
      setIsUploading(false);
    }
  };

  const handleGalleryUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    if (files.length === 0) return;

    // Validate files
    for (const file of files) {
      if (!UPLOAD_CONFIG.ALLOWED_TYPES.includes(file.type)) {
        setUploadError('Please select only valid image files (JPEG, PNG, GIF, WebP)');
        return;
      }
      if (file.size > UPLOAD_CONFIG.MAX_FILE_SIZE) {
        setUploadError(`File size must be less than ${UPLOAD_CONFIG.MAX_FILE_SIZE / (1024 * 1024)}MB`);
        return;
      }
    }

    setIsUploading(true);
    setUploadError("");

    try {
      const uploadPromises = files.map(file => uploadToCloudinary(file));
      const urls = await Promise.all(uploadPromises);
      const newGallery = [...galleryImages, ...urls];
      setGalleryImages(newGallery);
      onGalleryUpload(newGallery);
    } catch (error: unknown) {
      console.error('Upload error:', error);
      setUploadError(`Upload failed: ${error instanceof Error ? error.message : 'Unknown error'}. You can use the manual URL input below instead.`);
    } finally {
      setIsUploading(false);
    }
  };

  const removeGalleryImage = (index: number) => {
    const newGallery = galleryImages.filter((_, i) => i !== index);
    setGalleryImages(newGallery);
    onGalleryUpload(newGallery);
  };

  // Check if Cloudinary is configured
  const isCloudinaryConfigured = CLOUDINARY_CONFIG.CLOUD_NAME && CLOUDINARY_CONFIG.CLOUD_NAME !== 'your_cloud_name_here';

  return (
    <div className="space-y-6">
      {/* Upload Notice */}
      {!isCloudinaryConfigured && (
        <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 px-4 py-3 rounded-md text-sm">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="font-medium">Cloudinary not configured</p>
              <p className="mt-1">Please set up Cloudinary to enable image uploads. See <code className="bg-yellow-100 px-1 rounded">QUICK_CLOUDINARY_SETUP.md</code> for instructions.</p>
            </div>
          </div>
        </div>
      )}

      {/* Main Image Upload */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Main Image *
        </label>
        
        {mainImage ? (
          <div className="relative">
            <Image
              src={mainImage}
              alt="Main destination image"
              width={400}
              height={300}
              className="w-full h-48 object-cover rounded-lg border border-gray-300"
            />
            <button
              type="button"
              onClick={() => {
                setMainImage("");
                onImageUpload("");
              }}
              className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        ) : (
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
            <input
              type="file"
              accept="image/*"
              onChange={handleMainImageUpload}
              className="hidden"
              id="main-image-upload"
              name="main-image-upload"
              disabled={isUploading || !isCloudinaryConfigured}
            />
            <label
              htmlFor="main-image-upload"
              className={`flex flex-col items-center space-y-2 ${
                isCloudinaryConfigured ? 'cursor-pointer' : 'cursor-not-allowed opacity-50'
              }`}
            >
              {isUploading ? (
                <Loader2 className="h-8 w-8 text-gray-400 animate-spin" />
              ) : (
                <Upload className="h-8 w-8 text-gray-400" />
              )}
              <span className="text-sm text-gray-600">
                {isUploading ? 'Uploading...' : isCloudinaryConfigured ? 'Click to upload main image' : 'Cloudinary not configured'}
              </span>
              <span className="text-xs text-gray-500">
                {isCloudinaryConfigured ? 'PNG, JPG, GIF up to 5MB' : 'Use manual URL input below'}
              </span>
            </label>
          </div>
        )}
      </div>

      {/* Gallery Images Upload */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Gallery Images
        </label>
        
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleGalleryUpload}
            className="hidden"
            id="gallery-upload"
            name="gallery-upload"
            disabled={isUploading || !isCloudinaryConfigured}
          />
          <label
            htmlFor="gallery-upload"
            className={`flex flex-col items-center space-y-2 ${
              isCloudinaryConfigured ? 'cursor-pointer' : 'cursor-not-allowed opacity-50'
            }`}
          >
            {isUploading ? (
              <Loader2 className="h-8 w-8 text-gray-400 animate-spin" />
            ) : (
              <ImageIcon className="h-8 w-8 text-gray-400" />
            )}
            <span className="text-sm text-gray-600">
              {isUploading ? 'Uploading...' : isCloudinaryConfigured ? 'Click to upload gallery images' : 'Cloudinary not configured'}
            </span>
            <span className="text-xs text-gray-500">
              {isCloudinaryConfigured ? 'PNG, JPG, GIF up to 5MB each' : 'Use manual URL input below'}
            </span>
          </label>
        </div>

        {/* Gallery Images Display */}
        {galleryImages.length > 0 && (
          <div className="mt-4">
            <h4 className="text-sm font-medium text-gray-700 mb-2">Gallery Images ({galleryImages.length})</h4>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {galleryImages.map((url, index) => (
                <div key={index} className="relative group">
                  <Image
                    src={url}
                    alt={`Gallery image ${index + 1}`}
                    width={150}
                    height={96}
                    className="w-full h-24 object-cover rounded-lg border border-gray-300"
                  />
                  <button
                    type="button"
                    onClick={() => removeGalleryImage(index)}
                    className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Error Message */}
      {uploadError && (
        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md text-sm">
          {uploadError}
        </div>
      )}

      {/* Manual URL Input (Fallback) */}
      <div className={`border-t border-gray-200 pt-4 ${!isCloudinaryConfigured ? 'bg-blue-50 p-4 rounded-lg' : ''}`}>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {isCloudinaryConfigured ? 'Manual URL Input (Fallback)' : 'Manual URL Input (Required - Cloudinary not configured)'}
        </label>
        {!isCloudinaryConfigured && (
          <p className="text-sm text-blue-600 mb-2">
            Since Cloudinary is not configured, you can paste image URLs directly here.
          </p>
        )}
        <input
          type="url"
          id="manual-image-url"
          name="manual-image-url"
          value={mainImage}
          onChange={(e) => {
            setMainImage(e.target.value);
            onImageUpload(e.target.value);
          }}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
          placeholder="https://example.com/image.jpg"
        />
        {!isCloudinaryConfigured && (
          <p className="text-xs text-gray-500 mt-1">
            Tip: You can use any image hosting service like Imgur, Google Drive, or your own server.
          </p>
        )}
      </div>
    </div>
  );
}
