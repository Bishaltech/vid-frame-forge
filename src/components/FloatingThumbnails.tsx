import { useEffect, useState } from 'react';

interface FloatingThumbnail {
  id: number;
  x: number;
  y: number;
  rotation: number;
  scale: number;
  delay: number;
}

export const FloatingThumbnails = () => {
  const [thumbnails, setThumbnails] = useState<FloatingThumbnail[]>([]);

  useEffect(() => {
    const generateThumbnails = () => {
      const newThumbnails: FloatingThumbnail[] = [];
      for (let i = 0; i < 8; i++) {
        newThumbnails.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          rotation: Math.random() * 360,
          scale: 0.3 + Math.random() * 0.4,
          delay: Math.random() * 2,
        });
      }
      setThumbnails(newThumbnails);
    };

    generateThumbnails();
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {thumbnails.map((thumb) => (
        <div
          key={thumb.id}
          className="absolute w-40 h-24 rounded-xl opacity-20 animate-pulse backdrop-blur-sm"
          style={{
            left: `${thumb.x}%`,
            top: `${thumb.y}%`,
            transform: `rotate(${thumb.rotation}deg) scale(${thumb.scale}) translateZ(0)`,
            animationDelay: `${thumb.delay}s`,
            animationDuration: '6s',
          }}
        >
          <div 
            className="w-full h-full bg-gradient-primary rounded-xl shadow-premium animate-bounce border border-white/10" 
            style={{ 
              animationDelay: `${thumb.delay + 1}s`, 
              animationDuration: '8s',
              transform: 'perspective(1000px) rotateX(5deg) rotateY(5deg)',
            }}
          >
            <div className="absolute inset-3 bg-muted/30 rounded-lg flex items-center justify-center">
              <div className="w-10 h-2 bg-primary/60 rounded-full"></div>
            </div>
            <div className="absolute inset-x-3 bottom-2 h-1 bg-gradient-to-r from-primary/40 to-accent/40 rounded-full"></div>
            <div className="absolute top-2 right-2 w-3 h-3 bg-primary/50 rounded-full animate-ping" 
                 style={{ animationDelay: `${thumb.delay + 2}s`, animationDuration: '3s' }}></div>
          </div>
        </div>
      ))}
    </div>
  );
};