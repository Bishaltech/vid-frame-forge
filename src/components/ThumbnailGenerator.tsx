import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { ImageIcon, Download, Sparkles, Wand2, Crown, Eye } from "lucide-react";
import { toast } from "sonner";
import { ProFeaturesModal } from "./ProFeaturesModal";
import { ThumbnailPreviewModal } from "./ThumbnailPreviewModal";
import { ProgressAnimation } from "./ProgressAnimation";
import { supabase } from "@/integrations/supabase/client";
interface AspectRatio {
  label: string;
  value: string;
  width: number;
  height: number;
  description: string;
  isPro?: boolean;
}
const aspectRatios: AspectRatio[] = [{
  label: "16:9",
  value: "16:9",
  width: 1280,
  height: 720,
  description: "YouTube Thumbnail",
  isPro: false
}, {
  label: "9:16",
  value: "9:16",
  width: 720,
  height: 1280,
  description: "YouTube Shorts",
  isPro: false
}, {
  label: "1:1",
  value: "1:1",
  width: 1024,
  height: 1024,
  description: "Square Format",
  isPro: false
}, {
  label: "4:3",
  value: "4:3",
  width: 1440,
  height: 1080,
  description: "Classic TV",
  isPro: true
}, {
  label: "21:9",
  value: "21:9",
  width: 2560,
  height: 1080,
  description: "Ultrawide",
  isPro: true
}, {
  label: "3:4",
  value: "3:4",
  width: 1080,
  height: 1440,
  description: "Portrait",
  isPro: true
}, {
  label: "2:1",
  value: "2:1",
  width: 2048,
  height: 1024,
  description: "Cinema",
  isPro: true
}];
interface GeneratedImage {
  url: string;
  title: string;
  prompt: string;
  ratio: string;
  timestamp: number;
}
export const ThumbnailGenerator = () => {
  const [title, setTitle] = useState("");
  const [prompt, setPrompt] = useState("");
  const [selectedRatio, setSelectedRatio] = useState<AspectRatio>(aspectRatios[0]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImages, setGeneratedImages] = useState<GeneratedImage[]>([]);
  const [showProModal, setShowProModal] = useState(false);
  const [previewImage, setPreviewImage] = useState<GeneratedImage | null>(null);
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [showProgress, setShowProgress] = useState(false);
  const generateThumbnail = async () => {
    if (!title.trim() || !prompt.trim()) {
      toast.error("Please enter both title and description for your thumbnail");
      return;
    }
    setIsGenerating(true);
    setShowProgress(true);
    toast.info("Generating 3 professional thumbnails with AI...");
    try {
      const {
        data,
        error
      } = await supabase.functions.invoke('generate-thumbnail', {
        body: {
          title,
          prompt,
          aspectRatio: selectedRatio.value,
          numberResults: 3
        }
      });
      if (error) {
        console.error('Supabase function error:', error);
        throw new Error(`Failed to generate thumbnails: ${error.message}`);
      }
      if (!data || !data.images) {
        throw new Error('No images returned from the API');
      }
      setGeneratedImages(prev => [...data.images, ...prev]);
      toast.success("3 AI-generated thumbnails created successfully!");
    } catch (error) {
      console.error('Error generating thumbnails:', error);
      toast.error("Failed to generate thumbnails. Please try again.");
    } finally {
      setIsGenerating(false);
      setShowProgress(false);
    }
  };
  const downloadImage = (imageUrl: string) => {
    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = `thumbnail-${Date.now()}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success("Image downloaded!");
  };
  const previewImageHandler = (image: GeneratedImage) => {
    setPreviewImage(image);
    setShowPreviewModal(true);
  };
  return <div className="space-y-8">
      {/* Generation Form */}
      <Card className="p-8 bg-gradient-secondary border-border shadow-card">
        <div className="space-y-6">
          <div className="text-center space-y-2">
            <div className="flex items-center justify-center gap-2 text-primary">
              <Sparkles className="w-6 h-6" />
              <h2 className="text-2xl font-bold">Create Your Thumbnail</h2>
            </div>
            <p className="text-muted-foreground">
              Describe your vision and our AI will create a professional thumbnail
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-4">
              <div>
                <Label htmlFor="title" className="text-foreground font-medium">
                  Thumbnail Title
                </Label>
                <Input id="title" placeholder="Enter your thumbnail title (e.g., EPIC WIN, AMAZING TRICK, etc.)" value={title} onChange={e => setTitle(e.target.value)} className="mt-2" />
              </div>

              <div>
                <Label htmlFor="prompt" className="text-foreground font-medium">
                  Thumbnail Description
                </Label>
                <Textarea id="prompt" placeholder="A gaming thumbnail with epic background, bold text saying 'EPIC WIN', vibrant colors, dramatic lighting..." value={prompt} onChange={e => setPrompt(e.target.value)} className="min-h-32 mt-2" />
              </div>

              <div>
                <Label className="text-foreground font-medium">Aspect Ratio</Label>
                <div className="grid grid-cols-3 gap-3 mt-2">
                  {aspectRatios.map(ratio => <Button key={ratio.value} variant={selectedRatio.value === ratio.value ? "default" : "outline"} onClick={() => {
                  if (ratio.isPro) {
                    setShowProModal(true);
                  } else {
                    setSelectedRatio(ratio);
                  }
                }} className={`h-auto p-3 flex-col gap-1 ${ratio.isPro ? 'opacity-60' : ''}`} disabled={ratio.isPro}>
                      <div className="flex items-center gap-1">
                        <span className="font-semibold">{ratio.label}</span>
                        {ratio.isPro && <Crown className="w-3 h-3 text-primary" />}
                      </div>
                      <span className="text-xs opacity-75">{ratio.description}</span>
                      {ratio.isPro && <Badge variant="secondary" className="text-xs mt-1">
                          Pro
                        </Badge>}
                    </Button>)}
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="aspect-video bg-muted rounded-lg border-2 border-dashed border-border flex items-center justify-center">
                <div className="text-center text-muted-foreground">
                  <ImageIcon className="w-12 h-12 mx-auto mb-2 opacity-50" />
                  <p className="text-sm">Preview will appear here</p>
                  <Badge variant="secondary" className="mt-2">
                    {selectedRatio.width} × {selectedRatio.height}px
                  </Badge>
                </div>
              </div>

              <div className="space-y-3">
                <Button onClick={generateThumbnail} disabled={isGenerating || !title.trim() || !prompt.trim()} className="w-full bg-gradient-primary hover:bg-gradient-primary/90 text-white font-semibold py-6">
                  {isGenerating ? <>
                      <Wand2 className="w-5 h-5 mr-2 animate-spin" />
                      Generating Thumbnails...
                    </> : <>
                      <Sparkles className="w-5 h-5 mr-2" />
                      Generate Thumbnails
                    </>}
                </Button>
                
                <div className="text-center">
                  <Button variant="ghost" size="sm" onClick={() => setShowProModal(true)} className="text-primary hover:text-primary/80 font-semibold text-base">
                    <Crown className="w-4 h-4 mr-1" />
                    Unlock Pro Features
                  </Button>
                </div>
                
                {/* Progress Animation - positioned below buttons */}
                {showProgress && (
                  <ProgressAnimation 
                    isActive={isGenerating} 
                    onComplete={() => setShowProgress(false)} 
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Generated Images Gallery */}
      {generatedImages.length > 0 && <div className="space-y-6">
          <div className="text-center">
            <h3 className="text-xl font-bold text-foreground">Your Generated Thumbnails</h3>
            <p className="text-muted-foreground">Preview or download your thumbnails</p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {generatedImages.map((image, index) => <Card key={index} className="overflow-hidden group hover:shadow-glow transition-all duration-300">
                <div className="aspect-video relative">
                  <img src={image.url} alt={`Generated thumbnail: ${image.prompt}`} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2">
                    <Button onClick={() => previewImageHandler(image)} size="sm" className="bg-white/10 hover:bg-white/20 text-white border border-white/30">
                      <Eye className="w-4 h-4 mr-2" />
                      Preview
                    </Button>
                    <Button onClick={() => downloadImage(image.url)} size="sm" className="bg-primary hover:bg-primary/90 text-white">
                      <Download className="w-4 h-4 mr-2" />
                      Download
                    </Button>
                  </div>
                  <Badge className="absolute top-3 left-3 bg-primary text-white">
                    {image.ratio}
                  </Badge>
                </div>
                <div className="p-4">
                  <h4 className="font-semibold text-foreground mb-1">{image.title}</h4>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {image.prompt}
                  </p>
                </div>
              </Card>)}
          </div>
        </div>}
      
      <ProFeaturesModal open={showProModal} onOpenChange={setShowProModal} />
      
      <ThumbnailPreviewModal image={previewImage} open={showPreviewModal} onOpenChange={setShowPreviewModal} />
    </div>;
};