import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { ThumbnailGenerator } from "@/components/ThumbnailGenerator";
import { ThumbnailGallery } from "@/components/ThumbnailGallery";
import { EnhancedFooter } from "@/components/EnhancedFooter";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Hero />
      <main className="container mx-auto px-4 py-16" id="generator">
        <ThumbnailGenerator />
      </main>
      <div id="gallery">
        <ThumbnailGallery />
      </div>
      <EnhancedFooter />
    </div>
  );
};

export default Index;
