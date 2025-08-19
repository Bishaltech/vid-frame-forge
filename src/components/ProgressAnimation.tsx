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
    <div className={cn("space-y-3", className)}>
      {/* Glowing Title */}
      <div className="text-center">
        <h3 className="text-lg font-bold text-primary animate-pulse tracking-wide">
          GENERATING THUMBNAIL
        </h3>
      </div>

      {/* Slim Progress Bar */}
      <div className="relative">
        <div className="h-2 bg-muted/30 rounded-full overflow-hidden">
          <div 
            className={`h-full rounded-full transition-all duration-300 ease-out ${
              progress === 100 
                ? 'bg-gradient-to-r from-green-500 to-green-400' 
                : 'bg-gradient-to-r from-blue-500 via-purple-500 to-primary'
            }`}
            style={{ width: `${progress}%` }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse"></div>
          </div>
        </div>
        
        {/* Percentage Counter */}
        <div className="absolute -top-0.5 right-0 text-sm font-mono font-bold text-primary tabular-nums">
          {Math.round(progress)}%
        </div>
      </div>

      {/* Status Message */}
      <div className="text-center">
        <div className="text-sm text-muted-foreground animate-pulse">
          {getCurrentMessage()}
        </div>
      </div>
    </div>
  );
};