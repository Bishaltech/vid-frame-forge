import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Mail, Phone, MapPin } from "lucide-react";

interface ContactModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const ContactModal = ({ open, onOpenChange }: ContactModalProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] bg-background border border-border">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center text-foreground">Contact Us</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex flex-col items-center text-center p-4 border border-border rounded-lg">
              <Mail className="w-6 h-6 text-primary mb-2" />
              <h3 className="font-semibold text-foreground">Email</h3>
              <p className="text-sm text-muted-foreground">support@thumbnailai.com</p>
            </div>
            <div className="flex flex-col items-center text-center p-4 border border-border rounded-lg">
              <Phone className="w-6 h-6 text-primary mb-2" />
              <h3 className="font-semibold text-foreground">Phone</h3>
              <p className="text-sm text-muted-foreground">+1 (555) 123-4567</p>
            </div>
            <div className="flex flex-col items-center text-center p-4 border border-border rounded-lg">
              <MapPin className="w-6 h-6 text-primary mb-2" />
              <h3 className="font-semibold text-foreground">Address</h3>
              <p className="text-sm text-muted-foreground">San Francisco, CA</p>
            </div>
          </div>

          <form className="space-y-4">
            <div>
              <Label htmlFor="name">Name</Label>
              <Input id="name" placeholder="Your name" />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="your@email.com" />
            </div>
            <div>
              <Label htmlFor="subject">Subject</Label>
              <Input id="subject" placeholder="How can we help?" />
            </div>
            <div>
              <Label htmlFor="message">Message</Label>
              <Textarea id="message" placeholder="Tell us more about your inquiry..." rows={4} />
            </div>
            <Button className="w-full">Send Message</Button>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};