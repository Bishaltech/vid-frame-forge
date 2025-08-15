import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowDown, Sparkles, Zap, Palette } from "lucide-react";

export const Hero = () => {
  const scrollToGenerator = () => {
    const element = document.getElementById("generator");
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative py-20 overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-hero opacity-10"></div>
      
      <div className="container mx-auto px-4 text-center relative">
        <div className="max-w-4xl mx-auto space-y-8">
          <Badge className="bg-primary/10 text-primary border-primary/20">
            <Sparkles className="w-3 h-3 mr-1" />
            AI-Powered Thumbnail Generation
          </Badge>

          <h1 className="text-4xl md:text-6xl font-bold text-foreground leading-tight">
            Create <span className="bg-gradient-primary bg-clip-text text-transparent">Professional</span><br />
            YouTube Thumbnails in Seconds
          </h1>

          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Transform your ideas into stunning, click-worthy thumbnails that boost your video views. 
            Choose your aspect ratio and let our AI create the perfect design.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-6 text-sm">
            <div className="flex items-center gap-2 text-primary">
              <Zap className="w-4 h-4" />
              <span>Lightning Fast</span>
            </div>
            <div className="flex items-center gap-2 text-primary">
              <Palette className="w-4 h-4" />
              <span>Multiple Ratios</span>
            </div>
            <div className="flex items-center gap-2 text-primary">
              <Sparkles className="w-4 h-4" />
              <span>AI-Enhanced</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              onClick={scrollToGenerator}
              size="lg"
              className="bg-gradient-primary hover:bg-gradient-primary/90 text-white font-semibold px-8 py-6 text-lg shadow-glow"
            >
              <Sparkles className="w-5 h-5 mr-2" />
              Start Creating Now
            </Button>
            <Button variant="outline" size="lg" className="px-8 py-6 text-lg">
              View Examples
            </Button>
          </div>

          <div className="pt-8">
            <Button
              variant="ghost"
              onClick={scrollToGenerator}
              className="animate-bounce"
            >
              <ArrowDown className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};