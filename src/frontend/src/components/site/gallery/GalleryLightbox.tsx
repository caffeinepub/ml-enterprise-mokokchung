import { useEffect } from 'react';
import { X } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogClose,
} from '@/components/ui/dialog';

interface GalleryLightboxProps {
  imageSrc: string | null;
  onClose: () => void;
}

export function GalleryLightbox({ imageSrc, onClose }: GalleryLightboxProps) {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && imageSrc) {
        onClose();
      }
    };

    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [imageSrc, onClose]);

  return (
    <Dialog open={!!imageSrc} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-[95vw] max-h-[95vh] p-0 border-0 bg-black/95">
        <DialogClose className="absolute right-4 top-4 z-50 rounded-full bg-white/10 p-2 hover:bg-white/20 transition-colors">
          <X className="h-5 w-5 text-white" />
          <span className="sr-only">Close</span>
        </DialogClose>
        
        {imageSrc && (
          <div className="flex items-center justify-center w-full h-full p-8">
            <img
              src={imageSrc}
              alt="Gallery image preview"
              className="max-w-full max-h-[85vh] object-contain rounded-lg"
            />
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
