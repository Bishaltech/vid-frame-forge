import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { MessageCircle, Book, Video } from "lucide-react";

interface HelpModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const HelpModal = ({ open, onOpenChange }: HelpModalProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] bg-background border border-border max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center text-foreground">Help & Support</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2">
              <MessageCircle className="w-6 h-6 text-primary" />
              <span className="text-sm font-medium">Live Chat</span>
            </Button>
            <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2">
              <Book className="w-6 h-6 text-primary" />
              <span className="text-sm font-medium">Documentation</span>
            </Button>
            <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2">
              <Video className="w-6 h-6 text-primary" />
              <span className="text-sm font-medium">Video Tutorials</span>
            </Button>
          </div>

          <div>
            <h3 className="font-semibold text-foreground mb-4">Frequently Asked Questions</h3>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>How do I generate a thumbnail?</AccordionTrigger>
                <AccordionContent>
                  Simply enter a description of your video content, select your preferred aspect ratio, 
                  and click "Generate Thumbnail". Our AI will create a professional thumbnail in seconds.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-2">
                <AccordionTrigger>What aspect ratios are supported?</AccordionTrigger>
                <AccordionContent>
                  We support 16:9 (standard YouTube), 9:16 (YouTube Shorts), and 1:1 (square) formats. 
                  Pro users get access to custom dimensions and additional formats.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-3">
                <AccordionTrigger>Can I download my thumbnails?</AccordionTrigger>
                <AccordionContent>
                  Yes! All generated thumbnails can be downloaded in high resolution. Pro users get 
                  access to multiple formats and higher resolution options.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-4">
                <AccordionTrigger>What's included in the Pro plan?</AccordionTrigger>
                <AccordionContent>
                  Pro features include unlimited generations, all aspect ratios, batch processing, 
                  priority support, and commercial usage rights. See our pricing page for full details.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-5">
                <AccordionTrigger>How accurate is the AI generation?</AccordionTrigger>
                <AccordionContent>
                  Our AI is trained on millions of high-performing thumbnails and understands what 
                  drives engagement. You can regenerate thumbnails until you find the perfect one.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-6">
                <AccordionTrigger>Can I use thumbnails commercially?</AccordionTrigger>
                <AccordionContent>
                  Yes, all thumbnails generated can be used for commercial purposes. Pro users get 
                  extended commercial rights and usage guarantees.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>

          <div className="text-center p-4 bg-muted/30 rounded-lg">
            <h4 className="font-semibold text-foreground mb-2">Still need help?</h4>
            <p className="text-sm text-muted-foreground mb-3">
              Our support team is here to help you succeed with your thumbnail creation.
            </p>
            <Button size="sm">Contact Support</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};