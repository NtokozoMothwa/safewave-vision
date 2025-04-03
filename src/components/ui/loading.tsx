
import { Loader } from "lucide-react";
import { cn } from "@/lib/utils";

export interface LoadingProps {
  size?: "sm" | "md" | "lg";
  className?: string;
  text?: string;
}

export function Loading({ 
  size = "md", 
  className, 
  text 
}: LoadingProps) {
  const sizeClasses = {
    sm: "h-4 w-4",
    md: "h-6 w-6",
    lg: "h-8 w-8"
  };

  return (
    <div className={cn("flex flex-col items-center justify-center gap-2", className)}>
      <Loader className={cn("animate-spin text-safesphere-red", sizeClasses[size])} />
      {text && <p className="text-xs text-safesphere-white-muted/60">{text}</p>}
    </div>
  );
}
