import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { ThumbnailGenerator } from "@/components/ThumbnailGenerator";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Hero />
      <main className="container mx-auto px-4 py-16" id="generator">
        <ThumbnailGenerator />
      </main>
      <footer className="border-t border-border py-8 mt-16">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p>&copy; 2024 ThumbnailAI. Create professional YouTube thumbnails with AI.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
