import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Download, X } from "lucide-react";
import { toast } from "sonner";

interface GeneratedImage {
  url: string;
  title: string;
  prompt: string;
  ratio: string;
  timestamp: number;
}

interface ThumbnailPreviewModalProps {
  image: GeneratedImage | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const ThumbnailPreviewModal = ({ image, open, onOpenChange }: ThumbnailPreviewModalProps) => {
  const downloadImage = (imageUrl: string) => {
    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = `thumbnail-${Date.now()}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success("Image downloaded!");
  };

  if (!image) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] p-0">
        <DialogHeader className="p-6 pb-0">
          <DialogTitle className="flex items-center justify-between">
            <span>Thumbnail Preview</span>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onOpenChange(false)}
              className="h-6 w-6"
            >
              <X className="h-4 w-4" />
            </Button>
          </DialogTitle>
        </DialogHeader>
        
        <div className="p-6 space-y-4">
          <div className="relative">
            <img
              src={image.url}
              alt={`Generated thumbnail: ${image.prompt}`}
              className="w-full h-auto rounded-lg shadow-lg"
            />
            <Badge className="absolute top-3 left-3 bg-primary text-white">
              {image.ratio}
            </Badge>
          </div>
          
          <div className="space-y-3">
            <div>
              <h3 className="font-semibold text-foreground text-lg">{image.title}</h3>
              <p className="text-muted-foreground">{image.prompt}</p>
            </div>
            
            <div className="flex gap-3">
              <Button
                onClick={() => downloadImage(image.url)}
                className="bg-primary hover:bg-primary/90 text-white"
              >
                <Download className="w-4 h-4 mr-2" />
                Download Full Resolution
              </Button>
              <Button
                variant="outline"
                onClick={() => onOpenChange(false)}
              >
                Close
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};