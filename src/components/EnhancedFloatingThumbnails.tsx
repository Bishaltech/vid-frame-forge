import { useEffect, useState } from 'react';
import mrbeastThumb from '@/assets/thumbnail-mrbeast.jpg';
import gamingThumb from '@/assets/thumbnail-gaming.jpg';
import fitnessThumb from '@/assets/thumbnail-fitness.jpg';
import techThumb from '@/assets/thumbnail-tech.jpg';

interface FloatingThumbnail {
  id: number;
  x: number;
  y: number;
  z: number;
  rotation: number;
  rotationY: number;
  scale: number;
  delay: number;
  image: string;
  speed: number;
}

export const EnhancedFloatingThumbnails = () => {
  const [thumbnails, setThumbnails] = useState<FloatingThumbnail[]>([]);

  const thumbnailImages = [mrbeastThumb, gamingThumb, fitnessThumb, techThumb];

  useEffect(() => {
    const generateThumbnails = () => {
      const newThumbnails: FloatingThumbnail[] = [];
      for (let i = 0; i < 8; i++) {
        newThumbnails.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          z: Math.random() * 100,
          rotation: Math.random() * 360,
          rotationY: Math.random() * 360,
          scale: 0.4 + Math.random() * 0.6,
          delay: Math.random() * 4,
          speed: 0.5 + Math.random() * 1,
          image: thumbnailImages[Math.floor(Math.random() * thumbnailImages.length)],
        });
      }
      setThumbnails(newThumbnails);
    };

    generateThumbnails();
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-40">
      {thumbnails.map((thumb) => (
        <div
          key={thumb.id}
          className="absolute w-48 h-28 animate-pulse"
          style={{
            left: `${thumb.x}%`,
            top: `${thumb.y}%`,
            transform: `
              perspective(1000px) 
              rotateX(${thumb.rotation}deg) 
              rotateY(${thumb.rotationY}deg) 
              scale(${thumb.scale})
              translateZ(${thumb.z}px)
            `,
            animationDelay: `${thumb.delay}s`,
            animationDuration: `${4 + thumb.speed}s`,
          }}
        >
          <div 
            className="relative w-full h-full rounded-xl overflow-hidden shadow-premium animate-bounce border-2 border-primary/20 bg-gradient-to-br from-primary/10 to-accent/10 backdrop-blur-sm"
            style={{ 
              animationDelay: `${thumb.delay + 1}s`, 
              animationDuration: `${6 + thumb.speed}s`,
            }}
          >
            {/* Actual thumbnail image */}
            <img 
              src={thumb.image} 
              alt="YouTube thumbnail" 
              className="w-full h-full object-cover rounded-xl opacity-70"
              style={{
                filter: 'brightness(0.8) contrast(1.2)',
              }}
            />
            
            {/* Glow overlay */}
            <div className="absolute inset-0 bg-gradient-primary opacity-20 rounded-xl animate-pulse"
                 style={{ animationDelay: `${thumb.delay + 2}s`, animationDuration: '3s' }}></div>
            
            {/* Play button indicator */}
            <div className="absolute top-2 right-2 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center opacity-80">
              <div className="w-0 h-0 border-l-2 border-l-white border-y-1 border-y-transparent ml-0.5"></div>
            </div>
            
            {/* View count indicator */}
            <div className="absolute bottom-2 right-2 bg-black/60 text-white text-xs px-2 py-1 rounded opacity-90">
              {Math.floor(Math.random() * 999)}K views
            </div>
            
            {/* Floating particles */}
            <div 
              className="absolute w-2 h-2 bg-primary/60 rounded-full animate-ping" 
              style={{ 
                top: '20%', 
                left: '80%',
                animationDelay: `${thumb.delay + 3}s`, 
                animationDuration: '4s' 
              }}
            ></div>
          </div>
        </div>
      ))}
      
      {/* Additional floating elements */}
      <div className="absolute top-1/4 left-1/4 w-6 h-6 bg-gradient-primary rounded-full opacity-30 animate-bounce"
           style={{ animationDuration: '3s', animationDelay: '1s' }}></div>
      <div className="absolute top-3/4 right-1/4 w-4 h-4 bg-gradient-accent rounded-full opacity-20 animate-pulse"
           style={{ animationDuration: '4s', animationDelay: '2s' }}></div>
      <div className="absolute top-1/2 left-3/4 w-8 h-8 bg-gradient-premium rounded-full opacity-25 animate-bounce"
           style={{ animationDuration: '5s', animationDelay: '0.5s' }}></div>
    </div>
  );
};