import { useEffect, useState } from "react";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

interface ProgressAnimationProps {
  isActive: boolean;
  onComplete?: () => void;
  className?: string;
}

const progressMessages = [
  { range: [0, 30], message: "Analyzing trends..." },
  { range: [31, 70], message: "Rendering 4K details..." },
  { range: [71, 99], message: "Applying viral effects..." },
  { range: [100, 100], message: "Ready!" },
];

export const ProgressAnimation = ({ isActive, onComplete, className }: ProgressAnimationProps) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!isActive) {
      setProgress(0);
      return;
    }

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          onComplete?.();
          return 100;
        }
        
        // Simulate realistic API progress with varying speeds
        const increment = prev < 30 ? 2 : prev < 70 ? 1.5 : prev < 95 ? 1 : 0.5;
        return Math.min(prev + increment, 100);
      });
    }, 150);

    return () => clearInterval(interval);
  }, [isActive, onComplete]);

  const getCurrentMessage = () => {
    return progressMessages.find(
      ({ range }) => progress >= range[0] && progress <= range[1]
    )?.message || "Processing...";
  };

  if (!isActive) return null;

  return (
    <div className={cn("space-y-6 p-8 rounded-lg bg-card border border-border", className)}>
      {/* Main Title with Glow Effect */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-primary animate-pulse tracking-wide">
          GENERATING THUMBNAIL
        </h2>
        <div className="w-24 h-0.5 bg-gradient-to-r from-primary to-primary/50 mx-auto mt-2 animate-pulse"></div>
      </div>

      {/* Progress Bar Container */}
      <div className="space-y-4">
        <div className="relative">
          <Progress 
            value={progress} 
            className="h-3 bg-muted/50 overflow-hidden"
          />
          <div 
            className="absolute top-0 left-0 h-full bg-gradient-to-r from-blue-500 via-purple-500 to-primary rounded-full transition-all duration-300 ease-out shadow-lg"
            style={{ width: `${progress}%` }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse"></div>
          </div>
        </div>

        {/* Percentage and Status */}
        <div className="flex items-center justify-between">
          <div className="text-lg font-mono font-bold text-primary tabular-nums">
            {Math.round(progress)}%
          </div>
          <div className="text-sm text-muted-foreground animate-fade-in">
            {getCurrentMessage()}
          </div>
        </div>
      </div>

      {/* Visual Enhancement */}
      <div className="flex justify-center space-x-2">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="w-2 h-2 bg-primary rounded-full animate-pulse"
            style={{ animationDelay: `${i * 0.2}s` }}
          ></div>
        ))}
      </div>
    </div>
  );
};