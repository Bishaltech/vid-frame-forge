import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Check, Crown, Sparkles, Zap, Palette, Download, Users, Shield } from "lucide-react";

interface ProFeaturesModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const ProFeaturesModal = ({ open, onOpenChange }: ProFeaturesModalProps) => {
  const features = {
    free: [
      "5 thumbnails per day",
      "Basic AI generation",
      "Standard quality (1080p)",
      "3 aspect ratios",
      "PNG download"
    ],
    pro: [
      "Unlimited thumbnails",
      "Advanced AI models",
      "4K resolution export",
      "10+ aspect ratios",
      "Multiple formats (PNG, JPG, PDF)",
      "Batch generation",
      "Custom brand colors",
      "Priority support"
    ],
    enterprise: [
      "Everything in Pro",
      "API access",
      "Team collaboration",
      "Custom integrations",
      "White-label solution",
      "Dedicated support",
      "Advanced analytics",
      "Custom AI training"
    ]
  };

  const plans = [
    {
      name: "Free",
      price: "$0",
      period: "forever",
      description: "Perfect for getting started",
      features: features.free,
      icon: Sparkles,
      popular: false,
      buttonText: "Current Plan",
      buttonVariant: "outline" as const
    },
    {
      name: "Pro",
      price: "$9",
      period: "month",
      description: "For serious content creators",
      features: features.pro,
      icon: Crown,
      popular: true,
      buttonText: "Upgrade to Pro",
      buttonVariant: "default" as const
    },
    {
      name: "Enterprise",
      price: "$19",
      period: "month",
      description: "For teams and agencies",
      features: features.enterprise,
      icon: Users,
      popular: false,
      buttonText: "Contact Sales",
      buttonVariant: "outline" as const
    }
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader className="text-center pb-6">
          <DialogTitle className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            Unlock Pro Features
          </DialogTitle>
          <DialogDescription className="text-lg text-muted-foreground">
            Take your thumbnail creation to the next level with advanced AI and professional tools
          </DialogDescription>
        </DialogHeader>

        {/* Feature Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card className="border-primary/20 bg-primary/5">
            <CardContent className="p-4 text-center">
              <Zap className="w-8 h-8 text-primary mx-auto mb-2" />
              <h3 className="font-semibold">Lightning Fast</h3>
              <p className="text-sm text-muted-foreground">Generate thumbnails in seconds</p>
            </CardContent>
          </Card>
          <Card className="border-primary/20 bg-primary/5">
            <CardContent className="p-4 text-center">
              <Palette className="w-8 h-8 text-primary mx-auto mb-2" />
              <h3 className="font-semibold">Custom Branding</h3>
              <p className="text-sm text-muted-foreground">Match your brand colors perfectly</p>
            </CardContent>
          </Card>
          <Card className="border-primary/20 bg-primary/5">
            <CardContent className="p-4 text-center">
              <Download className="w-8 h-8 text-primary mx-auto mb-2" />
              <h3 className="font-semibold">Multiple Formats</h3>
              <p className="text-sm text-muted-foreground">Export in any format you need</p>
            </CardContent>
          </Card>
        </div>

        {/* Pricing Plans */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((plan) => {
            const IconComponent = plan.icon;
            return (
              <Card 
                key={plan.name} 
                className={`relative ${plan.popular ? 'border-primary shadow-glow' : 'border-border'}`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-gradient-primary text-white">
                      Most Popular
                    </Badge>
                  </div>
                )}
                <CardHeader className="text-center pb-4">
                  <div className="flex justify-center mb-3">
                    <div className={`p-3 rounded-full ${plan.popular ? 'bg-primary/10' : 'bg-muted'}`}>
                      <IconComponent className={`w-6 h-6 ${plan.popular ? 'text-primary' : 'text-muted-foreground'}`} />
                    </div>
                  </div>
                  <CardTitle className="text-xl">{plan.name}</CardTitle>
                  <div className="flex items-baseline justify-center gap-1">
                    <span className="text-3xl font-bold">{plan.price}</span>
                    <span className="text-muted-foreground">/{plan.period}</span>
                  </div>
                  <CardDescription>{plan.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ul className="space-y-2">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-center gap-2 text-sm">
                        <Check className="w-4 h-4 text-primary flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button 
                    className="w-full" 
                    variant={plan.buttonVariant}
                    disabled={plan.name === "Free"}
                  >
                    {plan.buttonText}
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Additional Features */}
        <div className="mt-8 p-6 bg-muted/50 rounded-lg">
          <div className="flex items-center gap-2 mb-4">
            <Shield className="w-5 h-5 text-primary" />
            <h3 className="font-semibold">Why Choose Pro?</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-muted-foreground">
            <div>• Advanced AI models for better quality</div>
            <div>• Batch processing for multiple thumbnails</div>
            <div>• Custom aspect ratios for any platform</div>
            <div>• Brand kit integration for consistency</div>
            <div>• Priority customer support</div>
            <div>• Regular feature updates</div>
          </div>
        </div>

        {/* Money Back Guarantee */}
        <div className="text-center pt-4 border-t border-border">
          <p className="text-sm text-muted-foreground">
            30-day money-back guarantee • Cancel anytime • No hidden fees
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};