import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Zap, Users, Target, Award } from "lucide-react";

interface AboutModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const AboutModal = ({ open, onOpenChange }: AboutModalProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] bg-background border border-border">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center text-foreground">About ThumbnailAI</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          <div className="text-center">
            <p className="text-muted-foreground leading-relaxed">
              ThumbnailAI is the leading AI-powered thumbnail generation platform, helping content creators 
              produce stunning, professional thumbnails that drive clicks and engagement.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 border border-border rounded-lg">
              <div className="flex items-center gap-3 mb-2">
                <Zap className="w-5 h-5 text-primary" />
                <h3 className="font-semibold text-foreground">AI-Powered</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Advanced AI technology creates thumbnails that are optimized for maximum engagement.
              </p>
            </div>

            <div className="p-4 border border-border rounded-lg">
              <div className="flex items-center gap-3 mb-2">
                <Users className="w-5 h-5 text-primary" />
                <h3 className="font-semibold text-foreground">Creator-Focused</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Built by creators, for creators. We understand what makes thumbnails successful.
              </p>
            </div>

            <div className="p-4 border border-border rounded-lg">
              <div className="flex items-center gap-3 mb-2">
                <Target className="w-5 h-5 text-primary" />
                <h3 className="font-semibold text-foreground">Performance</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Generate high-quality thumbnails in seconds, not hours.
              </p>
            </div>

            <div className="p-4 border border-border rounded-lg">
              <div className="flex items-center gap-3 mb-2">
                <Award className="w-5 h-5 text-primary" />
                <h3 className="font-semibold text-foreground">Professional Quality</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Studio-quality results that rival expensive design services.
              </p>
            </div>
          </div>

          <div className="text-center">
            <h3 className="font-semibold text-foreground mb-2">Our Mission</h3>
            <p className="text-muted-foreground">
              To democratize professional thumbnail creation, making it accessible to every content creator 
              regardless of their design skills or budget.
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};