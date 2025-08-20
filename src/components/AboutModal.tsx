import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Zap, Users, Target, Award, Sparkles, Globe, Rocket, Heart } from "lucide-react";

interface AboutModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const AboutModal = ({ open, onOpenChange }: AboutModalProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[700px] bg-gradient-secondary border border-primary/20 shadow-premium max-h-[90vh] overflow-y-auto">
        <DialogHeader className="text-center space-y-4">
          <div className="mx-auto w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center">
            <Sparkles className="w-8 h-8 text-white" />
          </div>
          <DialogTitle className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            About Bishal.AI
          </DialogTitle>
          <p className="text-muted-foreground max-w-md mx-auto">
            Empowering creators worldwide with AI-powered thumbnail generation that drives engagement and growth.
          </p>
        </DialogHeader>
        
        <div className="space-y-8">
          {/* Stats Section */}
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center p-4 bg-card/30 rounded-lg border border-primary/10">
              <div className="text-2xl font-bold text-primary">10M+</div>
              <div className="text-sm text-muted-foreground">Creators</div>
            </div>
            <div className="text-center p-4 bg-card/30 rounded-lg border border-primary/10">
              <div className="text-2xl font-bold text-primary">25M+</div>
              <div className="text-sm text-muted-foreground">Thumbnails</div>
            </div>
            <div className="text-center p-4 bg-card/30 rounded-lg border border-primary/10">
              <div className="text-2xl font-bold text-primary">99.9%</div>
              <div className="text-sm text-muted-foreground">Uptime</div>
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="bg-card/30 backdrop-blur-sm border-primary/10 hover:border-primary/30 transition-all duration-300 hover:shadow-glow/20">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                    <Zap className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="font-semibold text-foreground">AI-Powered Technology</h3>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Our cutting-edge AI algorithms analyze millions of high-performing thumbnails to create 
                  designs that maximize click-through rates and engagement.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-card/30 backdrop-blur-sm border-primary/10 hover:border-primary/30 transition-all duration-300 hover:shadow-glow/20">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                    <Users className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="font-semibold text-foreground">Creator-Focused Design</h3>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Built by creators who understand the challenges of content creation. Every feature is 
                  designed to solve real problems faced by YouTubers and content creators.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-card/30 backdrop-blur-sm border-primary/10 hover:border-primary/30 transition-all duration-300 hover:shadow-glow/20">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                    <Rocket className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="font-semibold text-foreground">Lightning Performance</h3>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Generate professional-quality thumbnails in seconds, not hours. Our optimized 
                  infrastructure ensures rapid processing without compromising quality.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-card/30 backdrop-blur-sm border-primary/10 hover:border-primary/30 transition-all duration-300 hover:shadow-glow/20">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                    <Award className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="font-semibold text-foreground">Professional Quality</h3>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Studio-quality results that rival expensive design services, accessible to creators 
                  of all sizes and budgets worldwide.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Mission Section */}
          <Card className="bg-gradient-accent/10 border-primary/20">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">Our Mission</h3>
              <p className="text-muted-foreground leading-relaxed max-w-2xl mx-auto">
                To democratize professional thumbnail creation, making it accessible to every content creator 
                regardless of their design skills, experience, or budget. We believe great content deserves 
                great presentation.
              </p>
            </CardContent>
          </Card>

          {/* Team Values */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-primary/5 rounded-lg border border-primary/10">
              <Globe className="w-8 h-8 text-primary mx-auto mb-2" />
              <h4 className="font-semibold text-foreground mb-1">Global Reach</h4>
              <p className="text-sm text-muted-foreground">Supporting creators in 150+ countries</p>
            </div>
            <div className="text-center p-4 bg-primary/5 rounded-lg border border-primary/10">
              <Target className="w-8 h-8 text-primary mx-auto mb-2" />
              <h4 className="font-semibold text-foreground mb-1">Innovation</h4>
              <p className="text-sm text-muted-foreground">Constantly improving our AI technology</p>
            </div>
            <div className="text-center p-4 bg-primary/5 rounded-lg border border-primary/10">
              <Users className="w-8 h-8 text-primary mx-auto mb-2" />
              <h4 className="font-semibold text-foreground mb-1">Community</h4>
              <p className="text-sm text-muted-foreground">Building a supportive creator ecosystem</p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};