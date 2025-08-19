import React, { useState, useRef, useCallback, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Type, Download, Plus } from "lucide-react";
import { toast } from "sonner";

interface TextElement {
  id: string;
  text: string;
  x: number;
  y: number;
  fontSize: number;
  fontFamily: string;
  color: string;
  shadow: boolean;
  outline: boolean;
}

interface ThumbnailEditorProps {
  imageUrl: string;
  onDownload: (canvasDataUrl: string) => void;
}

const fontFamilies = [
  { value: "Arial, sans-serif", label: "Sans" },
  { value: "Georgia, serif", label: "Serif" },
  { value: "Comic Sans MS, cursive", label: "Handwritten" },
  { value: "Impact, sans-serif", label: "Bold" },
  { value: "Courier New, monospace", label: "Modern" },
];

export const ThumbnailEditor: React.FC<ThumbnailEditorProps> = ({ imageUrl, onDownload }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [textElements, setTextElements] = useState<TextElement[]>([]);
  const [selectedElement, setSelectedElement] = useState<TextElement | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [imageLoaded, setImageLoaded] = useState(false);
  const [canvasSize, setCanvasSize] = useState({ width: 0, height: 0 });

  const addTextElement = useCallback(() => {
    const newElement: TextElement = {
      id: Date.now().toString(),
      text: "Double click to edit",
      x: canvasSize.width / 2,
      y: canvasSize.height / 2,
      fontSize: 32,
      fontFamily: "Arial, sans-serif",
      color: "#ffffff",
      shadow: true,
      outline: false,
    };
    setTextElements(prev => [...prev, newElement]);
    setSelectedElement(newElement);
  }, [canvasSize]);

  const updateSelectedElement = useCallback((updates: Partial<TextElement>) => {
    if (!selectedElement) return;
    
    setTextElements(prev => 
      prev.map(el => el.id === selectedElement.id ? { ...el, ...updates } : el)
    );
    setSelectedElement(prev => prev ? { ...prev, ...updates } : null);
  }, [selectedElement]);

  const drawCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx || !imageLoaded) return;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw background image
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      
      // Draw text elements
      textElements.forEach(element => {
        ctx.save();
        ctx.font = `${element.fontSize}px ${element.fontFamily}`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';

        // Apply shadow
        if (element.shadow) {
          ctx.shadowColor = 'rgba(0, 0, 0, 0.8)';
          ctx.shadowBlur = 4;
          ctx.shadowOffsetX = 2;
          ctx.shadowOffsetY = 2;
        }

        // Apply outline
        if (element.outline) {
          ctx.strokeStyle = 'rgba(0, 0, 0, 0.8)';
          ctx.lineWidth = 3;
          ctx.strokeText(element.text, element.x, element.y);
        }

        // Draw text
        ctx.fillStyle = element.color;
        ctx.fillText(element.text, element.x, element.y);

        // Draw selection border
        if (selectedElement?.id === element.id) {
          ctx.shadowColor = 'transparent';
          ctx.shadowBlur = 0;
          ctx.shadowOffsetX = 0;
          ctx.shadowOffsetY = 0;
          ctx.strokeStyle = '#3b82f6';
          ctx.lineWidth = 2;
          ctx.setLineDash([5, 5]);
          const metrics = ctx.measureText(element.text);
          const width = metrics.width + 20;
          const height = element.fontSize + 20;
          ctx.strokeRect(element.x - width/2, element.y - height/2, width, height);
          ctx.setLineDash([]);
        }

        ctx.restore();
      });
    };
    img.src = imageUrl;
  }, [imageUrl, textElements, selectedElement, imageLoaded]);

  useEffect(() => {
    drawCanvas();
  }, [drawCanvas]);

  useEffect(() => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      const maxWidth = 800;
      const aspectRatio = img.height / img.width;
      const width = Math.min(img.width, maxWidth);
      const height = width * aspectRatio;
      
      setCanvasSize({ width, height });
      setImageLoaded(true);
      
      if (canvasRef.current) {
        canvasRef.current.width = width;
        canvasRef.current.height = height;
      }
    };
    img.src = imageUrl;
  }, [imageUrl]);

  const handleCanvasClick = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Check if clicked on a text element
    const clickedElement = textElements.find(element => {
      const ctx = canvas.getContext('2d');
      if (!ctx) return false;
      
      ctx.font = `${element.fontSize}px ${element.fontFamily}`;
      const metrics = ctx.measureText(element.text);
      const width = metrics.width;
      const height = element.fontSize;
      
      return x >= element.x - width/2 && x <= element.x + width/2 &&
             y >= element.y - height/2 && y <= element.y + height/2;
    });

    setSelectedElement(clickedElement || null);
  }, [textElements]);

  const handleCanvasDoubleClick = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
    if (selectedElement) {
      const newText = prompt("Edit text:", selectedElement.text);
      if (newText !== null) {
        updateSelectedElement({ text: newText });
      }
    }
  }, [selectedElement, updateSelectedElement]);

  const handleMouseDown = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!selectedElement) return;
    
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setIsDragging(true);
    setDragOffset({
      x: x - selectedElement.x,
      y: y - selectedElement.y
    });
  }, [selectedElement]);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDragging || !selectedElement) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left - dragOffset.x;
    const y = e.clientY - rect.top - dragOffset.y;

    updateSelectedElement({ x, y });
  }, [isDragging, selectedElement, dragOffset, updateSelectedElement]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  const exportCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.toBlob((blob) => {
      if (blob) {
        const url = URL.createObjectURL(blob);
        onDownload(url);
        toast.success("Thumbnail with text exported!");
      }
    }, 'image/png');
  }, [onDownload]);

  return (
    <div className="space-y-4">
      {/* Canvas */}
      <div className="relative border rounded-lg overflow-hidden bg-muted">
        <canvas
          ref={canvasRef}
          className="max-w-full cursor-crosshair"
          onClick={handleCanvasClick}
          onDoubleClick={handleCanvasDoubleClick}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        />
        
        <Button
          onClick={addTextElement}
          className="absolute top-3 right-3"
          size="sm"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Text
        </Button>
      </div>

      {/* Text Editing Panel */}
      {selectedElement && (
        <div className="p-4 border rounded-lg bg-background space-y-4">
          <div className="flex items-center gap-2">
            <Type className="w-4 h-4" />
            <h3 className="font-semibold">Text Properties</h3>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="text-content">Text</Label>
              <Input
                id="text-content"
                value={selectedElement.text}
                onChange={(e) => updateSelectedElement({ text: e.target.value })}
                placeholder="Enter text"
              />
            </div>
            
            <div>
              <Label htmlFor="font-family">Font Family</Label>
              <Select
                value={selectedElement.fontFamily}
                onValueChange={(value) => updateSelectedElement({ fontFamily: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {fontFamilies.map((font) => (
                    <SelectItem key={font.value} value={font.value}>
                      {font.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="font-size">Font Size: {selectedElement.fontSize}px</Label>
              <Slider
                id="font-size"
                min={12}
                max={120}
                step={2}
                value={[selectedElement.fontSize]}
                onValueChange={([value]) => updateSelectedElement({ fontSize: value })}
                className="mt-2"
              />
            </div>
            
            <div>
              <Label htmlFor="text-color">Text Color</Label>
              <Input
                id="text-color"
                type="color"
                value={selectedElement.color}
                onChange={(e) => updateSelectedElement({ color: e.target.value })}
                className="h-10"
              />
            </div>
            
            <div className="flex items-center space-x-2">
              <Switch
                id="text-shadow"
                checked={selectedElement.shadow}
                onCheckedChange={(checked) => updateSelectedElement({ shadow: checked })}
              />
              <Label htmlFor="text-shadow">Text Shadow</Label>
            </div>
            
            <div className="flex items-center space-x-2">
              <Switch
                id="text-outline"
                checked={selectedElement.outline}
                onCheckedChange={(checked) => updateSelectedElement({ outline: checked })}
              />
              <Label htmlFor="text-outline">Text Outline</Label>
            </div>
          </div>
        </div>
      )}

      {/* Export Button */}
      <Button onClick={exportCanvas} className="w-full">
        <Download className="w-4 h-4 mr-2" />
        Download with Text
      </Button>
    </div>
  );
};