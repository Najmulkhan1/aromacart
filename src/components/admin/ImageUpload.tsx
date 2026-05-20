"use client";

import { useEffect, useState, useRef, useMemo } from "react";
import Image from "next/image";
import { UploadCloud, X, FileImage, CheckCircle2, Loader2, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ImageUploadProps {
  disabled?: boolean;
  onChange: (value: string) => void;
  onRemove: (value: string) => void;
  value: string[];
}

interface PendingUpload {
  id: string;
  fileUrl: string;
  file: File;
  progress: number;
  sizeMb: string;
  status: 'pending' | 'uploading' | 'success' | 'error';
  secureUrl?: string;
  publicId?: string; // Cloudinary public_id রাখার জন্য
  xhrRequest?: XMLHttpRequest;
}

export default function ImageUpload({ disabled, onChange, onRemove, value }: ImageUploadProps) {
  const [isMounted, setIsMounted] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [pendingUploads, setPendingUploads] = useState<PendingUpload[]>([]);
  
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => setIsMounted(true), 0);
    return () => clearTimeout(timer);
  }, []);

  const uploadStats = useMemo(() => {
    const total = pendingUploads.length;
    const completed = pendingUploads.filter(p => p.status === 'success' || p.status === 'error').length;
    return { total, completed };
  }, [pendingUploads]);

  // Cloudinary ইমেজ ইউআরএল থেকে public_id বের করার হেল্পার ফাংশন
  const getPublicIdFromUrl = (url: string) => {
    const parts = url.split('/upload/');
    if (parts.length < 2) return null;
    const publicIdWithExt = parts[1].replace(/^v\d+\//, ''); // v123456/ টাইপের ভার্সন রিমুভ করা
    return publicIdWithExt.split('.').slice(0, -1).join('.'); // এক্সটেনশন (.jpg/.png) বাদ দেওয়া
  };

  // Cloudinary থেকে ইমেজ ডিলিট করার ব্যাকএন্ড এপিআই কল
  const deleteFromCloudinary = async (publicId: string) => {
    try {
      await fetch("/api/cloudinary/delete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ publicId }),
      });
    } catch (err) {
      console.error("Cloudinary deletion failed:", err);
    }
  };

  const handleCancelOrRemove = async (pendingId: string) => {
    setPendingUploads(prev => {
      const uploadItem = prev.find(p => p.id === pendingId);
      if (uploadItem) {
        if (uploadItem.status === 'uploading' && uploadItem.xhrRequest) {
          uploadItem.xhrRequest.abort();
        }
        
        if (uploadItem.status === 'success' && uploadItem.secureUrl) {
          onRemove(uploadItem.secureUrl);
          if (uploadItem.publicId) {
            deleteFromCloudinary(uploadItem.publicId);
          }
        }
        
        URL.revokeObjectURL(uploadItem.fileUrl);
      }
      return prev.filter(p => p.id !== pendingId);
    });
  };

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setIsUploading(true);

    const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
    const uploadPreset = "aromacart_preset"; 

    const newUploadsToStart = Array.from(files).map((file) => ({
      id: Math.random().toString(36).substring(7),
      file: file,
      fileUrl: URL.createObjectURL(file),
      progress: 0,
      sizeMb: (file.size / (1024 * 1024)).toFixed(2),
      status: 'pending' as const,
    }));

    setPendingUploads(prev => [...prev, ...newUploadsToStart]);

    const totalFiles = newUploadsToStart.length;
    let finishedFiles = 0;

    newUploadsToStart.forEach((pendingItem) => {
      const formData = new FormData();
      formData.append("file", pendingItem.file);
      formData.append("upload_preset", uploadPreset);

      const xhr = new XMLHttpRequest();
      xhr.open("POST", `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`);

      setPendingUploads(prev => prev.map(item => item.id === pendingItem.id ? {...item, status: 'uploading', xhrRequest: xhr} : item));

      xhr.upload.onprogress = (event) => {
        if (event.lengthComputable) {
          const percentComplete = Math.round((event.loaded / event.total) * 100);
          setPendingUploads((prev) =>
            prev.map((item) =>
              item.id === pendingItem.id ? { ...item, progress: percentComplete } : item
            )
          );
        }
      };

      xhr.onload = () => {
        finishedFiles++;
        
        if (xhr.status === 200) {
          const response = JSON.parse(xhr.responseText);
          onChange(response.secure_url);
          
          setPendingUploads(prev => prev.map(item => item.id === pendingItem.id ? {
            ...item, 
            status: 'success', 
            progress: 100, 
            secureUrl: response.secure_url,
            publicId: response.public_id // এখানে public_id সেভ করা হলো
          } : item));
        } else {
          setPendingUploads(prev => prev.map(item => item.id === pendingItem.id ? {...item, status: 'error'} : item));
        }

        if (finishedFiles === totalFiles) {
          setIsUploading(false);
          if (inputRef.current) inputRef.current.value = "";
        }
      };

      xhr.onerror = () => {
        finishedFiles++;
        setPendingUploads(prev => prev.map(item => item.id === pendingItem.id ? {...item, status: 'error'} : item));
        if (finishedFiles === totalFiles) {
          setIsUploading(false);
          if (inputRef.current) inputRef.current.value = "";
        }
      };
      
      xhr.onabort = () => {
         finishedFiles++;
         if (finishedFiles === totalFiles) {
          setIsUploading(false);
          if (inputRef.current) inputRef.current.value = "";
        }
      };

      xhr.send(formData);
    });
  };

  const valueToRender = value.filter(url => !pendingUploads.some(p => p.secureUrl === url));

  if (!isMounted) return null;

  return (
    <div className="space-y-4 mb-4">
      {isUploading && (
        <div className="bg-secondary/40 border border-border rounded-xl p-4 flex items-center justify-between shadow-inner">
          <div className="flex items-center gap-3">
            <Loader2 className="w-5 h-5 text-primary animate-spin" />
            <span className="text-sm font-semibold text-foreground">Uploading Images</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold text-primary">{uploadStats.completed}</span>
            <span className="text-sm text-muted-foreground pt-1">/ {uploadStats.total} images added</span>
          </div>
        </div>
      )}

      {(valueToRender.length > 0 || pendingUploads.length > 0) && (
        <div className="flex items-center gap-4 flex-wrap pt-2">
          
          {/* Published ছবিগুলো রিমুভ করার সময়ও ক্লাউডিনারি থেকে ডিলিট হবে */}
          {valueToRender.map((url) => (
            <div key={url} className="relative w-[200px] h-[200px] rounded-2xl overflow-hidden border border-border shadow-sm group">
              <div className="absolute z-20 top-2 right-2 opacity-0 group-hover:opacity-100 transition-all duration-200">
                <Button 
                  type="button" 
                  onClick={() => {
                    onRemove(url);
                    const pid = getPublicIdFromUrl(url);
                    if (pid) deleteFromCloudinary(pid);
                  }} 
                  variant="destructive" size="icon" className="h-8 w-8 rounded-full shadow-lg"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
              <Image fill className="object-cover" alt="Product Image" src={url} unoptimized />
              <div className="absolute bottom-2 right-2 bg-green-500/90 backdrop-blur-sm text-white text-[10px] px-2 py-1 rounded-full flex items-center gap-1 font-medium z-10">
                <CheckCircle2 className="w-3 h-3" /> Published
              </div>
            </div>
          ))}

          {/* সদ্য আপলোড হওয়া বা আপলোডিং ছবিগুলো */}
          {pendingUploads.map((pending) => (
            <div key={pending.id} className="relative w-[200px] h-[200px] rounded-2xl overflow-hidden border border-border shadow-sm group">
              <div className="absolute z-30 top-2 right-2 opacity-0 group-hover:opacity-100 transition-all duration-200">
                <Button type="button" onClick={() => handleCancelOrRemove(pending.id)} variant="destructive" size="icon" className="h-8 w-8 rounded-full shadow-lg">
                  <X className="h-4 w-4" />
                </Button>
              </div>

              <Image fill className="object-cover" alt="Uploading Preview" src={pending.fileUrl} />
              
              <div className="absolute inset-0 z-10 bg-black/60 flex flex-col justify-between p-3 backdrop-blur-[2px]">
                <div className="flex justify-between items-start w-full">
                  <div className="bg-white/20 p-1.5 rounded-lg backdrop-blur-md">
                    <FileImage className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-white text-xs font-semibold bg-black/40 px-2 py-1 rounded-md">{pending.sizeMb} MB</span>
                </div>

                <div className="w-full flex flex-col gap-2">
                  {pending.status === 'uploading' && (
                    <>
                      <div className="flex justify-between text-white text-xs font-medium">
                        <span>Uploading...</span>
                        <span>{pending.progress}%</span>
                      </div>
                      <div className="h-1.5 w-full bg-white/20 rounded-full overflow-hidden">
                        <div className="h-full bg-primary transition-all duration-300 ease-out" style={{ width: `${pending.progress}%` }} />
                      </div>
                    </>
                  )}

                  {pending.status === 'success' && (
                    <div className="flex items-center gap-2 text-green-400 bg-green-950/60 p-2 rounded-lg border border-green-500/50 backdrop-blur-sm shadow-md">
                      <CheckCircle2 className="w-5 h-5 shrink-0" />
                      <span className="text-xs font-bold uppercase tracking-wider">Cloud Sync Done</span>
                    </div>
                  )}

                  {pending.status === 'error' && (
                    <div className="flex items-center gap-2 text-destructive bg-destructive/20 p-2 rounded-lg border border-destructive/50 backdrop-blur-sm">
                      <AlertTriangle className="w-5 h-5 shrink-0" />
                      <span className="text-xs font-bold uppercase tracking-wider">Failed</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}

        </div>
      )}

      <div 
        onClick={() => inputRef.current?.click()}
        className={`relative flex flex-col items-center justify-center gap-4 p-10 border-2 border-dashed border-border/60 rounded-2xl transition-all group ${
          isUploading || disabled ? 'bg-secondary/10 cursor-not-allowed opacity-50' : 'bg-secondary/20 hover:bg-secondary/40 hover:border-primary/50 cursor-pointer'
        }`}
      >
        <input type="file" multiple accept="image/*" className="hidden" ref={inputRef} onChange={handleUpload} disabled={isUploading || disabled} />
        <div className="p-4 bg-background rounded-full shadow-sm group-hover:scale-110 transition-transform">
          <UploadCloud className="w-8 h-8 text-primary" />
        </div>
        <div className="text-center">
          <p className="text-sm font-semibold text-foreground">{isUploading ? "Adding to batch..." : "Click to browse files"}</p>
          <p className="text-xs text-muted-foreground mt-1">SVG, PNG, JPG or GIF</p>
        </div>
      </div>
    </div>
  );
}