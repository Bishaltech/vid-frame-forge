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
          className="absolute w-32 h-18 bg-gradient-accent rounded-lg opacity-10 animate-pulse"
          style={{
            left: `${thumb.x}%`,
            top: `${thumb.y}%`,
            transform: `rotate(${thumb.rotation}deg) scale(${thumb.scale})`,
            animationDelay: `${thumb.delay}s`,
            animationDuration: '4s',
          }}
        >
          <div className="w-full h-full bg-gradient-primary rounded-lg shadow-float animate-bounce" 
               style={{ animationDelay: `${thumb.delay + 1}s`, animationDuration: '6s' }}>
            <div className="absolute inset-2 bg-muted/20 rounded flex items-center justify-center">
              <div className="w-8 h-1 bg-primary/40 rounded"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};