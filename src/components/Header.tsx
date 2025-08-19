import { Button } from "@/components/ui/button";
import { Youtube, Sparkles } from "lucide-react";
import { ProFeaturesModal } from "./ProFeaturesModal";
import { ContactModal } from "./ContactModal";
import { AboutModal } from "./AboutModal";
import { HelpModal } from "./HelpModal";
import { useState } from "react";
export const Header = () => {
  const [showProModal, setShowProModal] = useState(false);
  const [showContactModal, setShowContactModal] = useState(false);
  const [showAboutModal, setShowAboutModal] = useState(false);
  const [showHelpModal, setShowHelpModal] = useState(false);
  return <header className="border-b border-border bg-background/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-primary rounded-lg">
              <Youtube className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-sky-500">ELDORADO.AI</h1>
              <p className="text-sm text-purple-100">Professional YouTube Thumbnails</p>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-6">
            <button onClick={() => setShowContactModal(true)} className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
              Contact Us
            </button>
            <button onClick={() => setShowAboutModal(true)} className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
              About Us
            </button>
            <button onClick={() => setShowHelpModal(true)} className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
              Help
            </button>
            <Button variant="outline" size="sm" onClick={() => setShowProModal(true)} className="border-primary/30 text-primary hover:bg-primary/10">
              <Sparkles className="w-4 h-4 mr-1" />
              Pro Features
            </Button>
          </div>
        </div>
      </div>
      
      <ProFeaturesModal open={showProModal} onOpenChange={setShowProModal} />
      <ContactModal open={showContactModal} onOpenChange={setShowContactModal} />
      <AboutModal open={showAboutModal} onOpenChange={setShowAboutModal} />
      <HelpModal open={showHelpModal} onOpenChange={setShowHelpModal} />
    </header>;
};