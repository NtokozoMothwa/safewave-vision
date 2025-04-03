
import { Loader } from "lucide-react";
import { cn } from "@/lib/utils";

export interface LoadingProps {
  size?: "sm" | "md" | "lg";
  className?: string;
  text?: string;
  fullscreen?: boolean;
}

export function Loading({ 
  size = "md", 
  className, 
  text,
  fullscreen = false
}: LoadingProps) {
  const sizeClasses = {
    sm: "h-4 w-4",
    md: "h-6 w-6",
    lg: "h-8 w-8"
  };

  const component = (
    <div className={cn(
      "flex flex-col items-center justify-center gap-2", 
      fullscreen && "fixed inset-0 bg-safesphere-dark/80 z-50",
      className
    )}>
      <Loader className={cn("animate-spin text-safesphere-red", sizeClasses[size])} />
      {text && <p className="text-xs text-safesphere-white-muted/60">{text}</p>}
    </div>
  );

  return component;
}
