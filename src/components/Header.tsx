import { Button } from "@/components/ui/button";
import { Youtube, Sparkles, Zap } from "lucide-react";

export const Header = () => {
  return (
    <header className="border-b border-border bg-background/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-primary rounded-lg">
              <Youtube className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">ThumbnailAI</h1>
              <p className="text-sm text-muted-foreground">Professional YouTube Thumbnails</p>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-6">
            <div className="flex items-center gap-2 text-primary">
              <Sparkles className="w-4 h-4" />
              <span className="text-sm font-medium">AI-Powered</span>
            </div>
            <div className="flex items-center gap-2 text-primary">
              <Zap className="w-4 h-4" />
              <span className="text-sm font-medium">Instant Generation</span>
            </div>
            <Button variant="outline" size="sm">
              Pro Features
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};