
import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, Image, Video, File, X, Check, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface MediaFile {
  id: string;
  file: File;
  preview: string;
  type: 'image' | 'video' | 'document';
  uploadProgress: number;
  status: 'pending' | 'uploading' | 'completed' | 'error';
}

interface MediaUploaderProps {
  onFilesSelected: (files: MediaFile[]) => void;
  maxFiles?: number;
  acceptedTypes?: string[];
  maxFileSize?: number; // in MB
}

const MediaUploader: React.FC<MediaUploaderProps> = ({
  onFilesSelected,
  maxFiles = 5,
  acceptedTypes = ['image/*', 'video/*', 'application/pdf'],
  maxFileSize = 10
}) => {
  const [files, setFiles] = useState<MediaFile[]>([]);
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const getFileType = (file: File): 'image' | 'video' | 'document' => {
    if (file.type.startsWith('image/')) return 'image';
    if (file.type.startsWith('video/')) return 'video';
    return 'document';
  };

  const createFilePreview = (file: File): Promise<string> => {
    return new Promise((resolve) => {
      if (file.type.startsWith('image/') || file.type.startsWith('video/')) {
        const reader = new FileReader();
        reader.onload = (e) => resolve(e.target?.result as string);
        reader.readAsDataURL(file);
      } else {
        resolve(''); // No preview for documents
      }
    });
  };

  const handleFileSelect = async (selectedFiles: FileList | null) => {
    if (!selectedFiles) return;

    const newFiles: MediaFile[] = [];
    for (let i = 0; i < Math.min(selectedFiles.length, maxFiles - files.length); i++) {
      const file = selectedFiles[i];
      
      // Check file size
      if (file.size > maxFileSize * 1024 * 1024) {
        console.warn(`File ${file.name} is too large (max ${maxFileSize}MB)`);
        continue;
      }

      const preview = await createFilePreview(file);
      const mediaFile: MediaFile = {
        id: Math.random().toString(36).substr(2, 9),
        file,
        preview,
        type: getFileType(file),
        uploadProgress: 0,
        status: 'pending'
      };
      newFiles.push(mediaFile);
    }

    const updatedFiles = [...files, ...newFiles];
    setFiles(updatedFiles);
    onFilesSelected(updatedFiles);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    handleFileSelect(e.dataTransfer.files);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const removeFile = (fileId: string) => {
    const updatedFiles = files.filter(f => f.id !== fileId);
    setFiles(updatedFiles);
    onFilesSelected(updatedFiles);
  };

  const getFileIcon = (type: string) => {
    switch (type) {
      case 'image': return Image;
      case 'video': return Video;
      default: return File;
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="space-y-4">
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        className={`relative border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
          isDragOver
            ? 'border-blue-500 bg-blue-500/10'
            : 'border-slate-600 hover:border-slate-500'
        }`}
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept={acceptedTypes.join(',')}
          onChange={(e) => handleFileSelect(e.target.files)}
          className="hidden"
        />
        
        <Upload size={40} className="mx-auto mb-4 text-slate-400" />
        <p className="text-white font-medium mb-2">
          Drop files here or click to browse
        </p>
        <p className="text-slate-400 text-sm mb-4">
          Supports images, videos, and documents up to {maxFileSize}MB
        </p>
        
        <Button
          onClick={() => fileInputRef.current?.click()}
          className="bg-blue-600 hover:bg-blue-700 text-white"
        >
          Choose Files
        </Button>
      </div>

      <AnimatePresence>
        {files.map((file) => {
          const Icon = getFileIcon(file.type);
          return (
            <motion.div
              key={file.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="flex items-center gap-4 p-4 bg-slate-800/50 border border-slate-700 rounded-lg"
            >
              <div className="w-12 h-12 rounded-lg overflow-hidden bg-slate-700 flex items-center justify-center">
                {file.preview ? (
                  <img
                    src={file.preview}
                    alt={file.file.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <Icon size={20} className="text-slate-400" />
                )}
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="text-white font-medium truncate">{file.file.name}</div>
                <div className="text-slate-400 text-sm">
                  {formatFileSize(file.file.size)} • {file.type}
                </div>
                
                {file.status === 'uploading' && (
                  <div className="mt-2">
                    <div className="w-full bg-slate-700 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${file.uploadProgress}%` }}
                      />
                    </div>
                  </div>
                )}
              </div>
              
              <div className="flex items-center gap-2">
                {file.status === 'completed' && (
                  <Check size={16} className="text-green-400" />
                )}
                {file.status === 'error' && (
                  <AlertCircle size={16} className="text-red-400" />
                )}
                <button
                  onClick={() => removeFile(file.id)}
                  className="text-slate-400 hover:text-red-400 transition-colors"
                >
                  <X size={16} />
                </button>
              </div>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
};

export default MediaUploader;
