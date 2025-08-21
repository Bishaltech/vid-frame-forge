import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Zap, Download, Users, Play } from "lucide-react";
import { FloatingThumbnails3D } from "./FloatingThumbnails3D";
import { AnimatedCounter } from "./AnimatedCounter";

export const Hero = () => {
  const scrollToGenerator = () => {
    document.getElementById('generator')?.scrollIntoView({
      behavior: 'smooth'
    });
  };

  return (
    <section className="relative py-20 lg:py-32 overflow-hidden">
      {/* Enhanced Background with multiple layers */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background/95 to-background/90" />
      <div className="absolute inset-0 bg-gradient-hero opacity-20" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_hsl(262_90%_65%_/_0.15)_0%,_transparent_50%)]" />
      
      {/* 3D Floating Thumbnails Background */}
      <FloatingThumbnails3D />
      
      {/* Text readability overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/20 to-transparent pointer-events-none" />
      
      <div className="container mx-auto px-4 relative z-20">
        <div className="text-center max-w-5xl mx-auto">
          {/* Badge */}
          <Badge variant="outline" className="mb-6 border-primary/30 text-primary bg-primary/10 animate-bounce">
            <Sparkles className="w-3 h-3 mr-1" />
            AI-Powered Thumbnail Generator
          </Badge>

          {/* Main headline with animation */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 animate-fade-in">
            Create Stunning{" "}
            <span className="bg-gradient-primary bg-clip-text text-transparent animate-pulse">
              YouTube Thumbnails
            </span>{" "}
            in Seconds
          </h1>

          {/* Description */}
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto animate-fade-in">
            Generate professional, click-worthy thumbnails that drive views and engagement. 
            No design skills required. Trusted by{" "}
            <AnimatedCounter target={10000000} suffix="+" /> creators worldwide.
          </p>

          {/* Stats Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10 max-w-2xl mx-auto">
            <div className="text-center p-4 bg-card/50 backdrop-blur-sm rounded-lg border border-border/50">
              <div className="text-2xl font-bold text-primary">
                <AnimatedCounter target={25000000} />+
              </div>
              <div className="text-sm text-muted-foreground">Thumbnails Generated</div>
            </div>
            <div className="text-center p-4 bg-card/50 backdrop-blur-sm rounded-lg border border-border/50">
              <div className="text-2xl font-bold text-primary">
                <AnimatedCounter target={500000} />+
              </div>
              <div className="text-sm text-muted-foreground">Happy Creators</div>
            </div>
            <div className="text-center p-4 bg-card/50 backdrop-blur-sm rounded-lg border border-border/50">
              <div className="text-2xl font-bold text-primary">4.9★</div>
              <div className="text-sm text-muted-foreground">Average Rating</div>
            </div>
          </div>

          {/* Feature highlights */}
          <div className="flex flex-wrap justify-center gap-6 mb-10">
            <div className="flex items-center gap-2 text-muted-foreground bg-muted/20 px-4 py-2 rounded-full">
              <Zap className="w-5 h-5 text-primary" />
              <span>Lightning Fast AI</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground bg-muted/20 px-4 py-2 rounded-full">
              <Download className="w-5 h-5 text-primary" />
              <span>4K Quality Export</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground bg-muted/20 px-4 py-2 rounded-full">
              <Users className="w-5 h-5 text-primary" />
              <span>Creator Approved</span>
            </div>
          </div>

          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-gradient-primary hover:shadow-glow transition-all duration-300 hover:scale-105 animate-bounce"
              onClick={scrollToGenerator}
            >
              <Play className="w-5 h-5 mr-2" />
              Start Creating Free
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-primary/30 text-primary hover:bg-primary/10 hover:scale-105 transition-all duration-300"
              onClick={() => document.getElementById('gallery')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <Sparkles className="w-5 h-5 mr-2" />
              View Examples
            </Button>
          </div>

          {/* Trust badges */}
          <div className="mt-12 pt-8 border-t border-border/20">
            <p className="text-muted-foreground mb-4">Trusted by creators from:</p>
            <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
              <div className="font-semibold">YouTube</div>
              <div className="font-semibold">TikTok</div>
              <div className="font-semibold">Instagram</div>
              <div className="font-semibold">Twitch</div>
              <div className="font-semibold">Twitter</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};