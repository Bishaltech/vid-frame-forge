import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Mail, Phone, MapPin, Send, Clock, Globe } from "lucide-react";

interface ContactModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const ContactModal = ({ open, onOpenChange }: ContactModalProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] bg-gradient-secondary border border-primary/20 shadow-premium">
        <DialogHeader className="text-center space-y-4">
          <div className="mx-auto w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center">
            <Mail className="w-8 h-8 text-white" />
          </div>
          <DialogTitle className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            Get in Touch
          </DialogTitle>
          <p className="text-muted-foreground">
            We'd love to hear from you. Send us a message and we'll respond as soon as possible.
          </p>
        </DialogHeader>
        
        <div className="space-y-8">
          {/* Contact Info Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="bg-card/50 backdrop-blur-sm border-primary/10 hover:border-primary/30 transition-colors">
              <CardContent className="p-4 text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Mail className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mb-1">Email</h3>
                <p className="text-sm text-muted-foreground">support@bishal.ai</p>
              </CardContent>
            </Card>
            
            <Card className="bg-card/50 backdrop-blur-sm border-primary/10 hover:border-primary/30 transition-colors">
              <CardContent className="p-4 text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Clock className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mb-1">Response Time</h3>
                <p className="text-sm text-muted-foreground">Within 24 hours</p>
              </CardContent>
            </Card>
            
            <Card className="bg-card/50 backdrop-blur-sm border-primary/10 hover:border-primary/30 transition-colors">
              <CardContent className="p-4 text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Globe className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mb-1">Support</h3>
                <p className="text-sm text-muted-foreground">24/7 Available</p>
              </CardContent>
            </Card>
          </div>

          {/* Contact Form */}
          <Card className="bg-card/30 backdrop-blur-sm border-primary/10">
            <CardContent className="p-6">
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name" className="text-foreground font-medium">Full Name</Label>
                    <Input 
                      id="name" 
                      placeholder="Your full name" 
                      className="mt-2 bg-background/50 border-primary/20 focus:border-primary/50"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email" className="text-foreground font-medium">Email Address</Label>
                    <Input 
                      id="email" 
                      type="email" 
                      placeholder="your@email.com" 
                      className="mt-2 bg-background/50 border-primary/20 focus:border-primary/50"
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="subject" className="text-foreground font-medium">Subject</Label>
                  <Input 
                    id="subject" 
                    placeholder="What can we help you with?" 
                    className="mt-2 bg-background/50 border-primary/20 focus:border-primary/50"
                  />
                </div>
                
                <div>
                  <Label htmlFor="message" className="text-foreground font-medium">Message</Label>
                  <Textarea 
                    id="message" 
                    placeholder="Tell us more about your inquiry..." 
                    rows={5} 
                    className="mt-2 bg-background/50 border-primary/20 focus:border-primary/50 resize-none"
                  />
                </div>
                
                <Button className="w-full bg-gradient-primary hover:shadow-glow transition-all duration-300 group">
                  <Send className="w-4 h-4 mr-2 group-hover:translate-x-1 transition-transform" />
                  Send Message
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Additional Info */}
          <div className="text-center p-4 bg-primary/5 rounded-lg border border-primary/10">
            <p className="text-sm text-muted-foreground">
              Need immediate assistance? Join our{" "}
              <span className="text-primary font-medium cursor-pointer hover:underline">Discord community</span>{" "}
              for real-time support from our team and fellow creators.
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};