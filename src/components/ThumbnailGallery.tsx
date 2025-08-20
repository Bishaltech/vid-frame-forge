import { useState } from 'react';

const sampleThumbnails = [
  {
    id: 1,
    title: "How to Code Faster",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&h=225&fit=crop",
    category: "Tech"
  },
  {
    id: 2,
    title: "Best Travel Destinations",
    image: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400&h=225&fit=crop",
    category: "Travel"
  },
  {
    id: 3,
    title: "Cooking Masterclass",
    image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=225&fit=crop",
    category: "Food"
  },
  {
    id: 4,
    title: "Fitness Motivation",
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=225&fit=crop",
    category: "Fitness"
  },
  {
    id: 5,
    title: "Business Growth Tips",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=225&fit=crop",
    category: "Business"
  },
  {
    id: 6,
    title: "Music Production Guide",
    image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=225&fit=crop",
    category: "Music"
  },
  {
    id: 7,
    title: "Gaming Setup Tour",
    image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400&h=225&fit=crop",
    category: "Gaming"
  },
  {
    id: 8,
    title: "Art Tutorial",
    image: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400&h=225&fit=crop",
    category: "Art"
  },
  {
    id: 9,
    title: "Photography Tips",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=225&fit=crop",
    category: "Photography"
  },
  {
    id: 10,
    title: "Science Explained",
    image: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=400&h=225&fit=crop",
    category: "Science"
  },
  {
    id: 11,
    title: "DIY Home Decor",
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=225&fit=crop",
    category: "DIY"
  },
  {
    id: 12,
    title: "Crypto Explained",
    image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=400&h=225&fit=crop",
    category: "Finance"
  }
];

export const ThumbnailGallery = () => {
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  return (
    <section className="py-20 bg-gradient-secondary">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">
            Professional <span className="bg-gradient-primary bg-clip-text text-transparent">Thumbnail Examples</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            See the quality and variety of thumbnails created by our AI technology
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {sampleThumbnails.map((thumbnail) => (
            <div
              key={thumbnail.id}
              className="group relative overflow-hidden rounded-xl bg-card border border-border transition-all duration-300 hover:scale-105 hover:shadow-premium cursor-pointer"
              onMouseEnter={() => setHoveredId(thumbnail.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              <div className="aspect-video overflow-hidden">
                <img
                  src={thumbnail.image}
                  alt={thumbnail.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              
              <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                <div className="bg-background/90 backdrop-blur-sm rounded-lg p-3 border border-border/50">
                  <h3 className="font-semibold text-foreground mb-1">{thumbnail.title}</h3>
                  <span className="text-xs bg-primary/20 text-primary px-2 py-1 rounded-full">
                    {thumbnail.category}
                  </span>
                </div>
              </div>

              {hoveredId === thumbnail.id && (
                <div className="absolute top-4 right-4">
                  <div className="bg-primary/90 text-white px-3 py-1 rounded-full text-xs font-medium animate-bounce">
                    AI Generated
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-muted-foreground mb-4">Ready to create thumbnails like these?</p>
          <button
            onClick={() => document.getElementById('generator')?.scrollIntoView({ behavior: 'smooth' })}
            className="bg-gradient-primary text-white px-8 py-3 rounded-lg font-semibold hover:shadow-glow transition-all duration-300 hover:scale-105"
          >
            Start Creating Now
          </button>
        </div>
      </div>
    </section>
  );
};