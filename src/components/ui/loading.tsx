
import React from "react";
import { Loader } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

export interface LoadingProps {
  size?: "sm" | "md" | "lg";
  className?: string;
  text?: string;
  fullscreen?: boolean;
  progress?: number;
  delayedAppearance?: boolean;
}

export function Loading({ 
  size = "md", 
  className, 
  text,
  fullscreen = false,
  progress,
  delayedAppearance = false
}: LoadingProps) {
  const sizeClasses = {
    sm: "h-4 w-4",
    md: "h-6 w-6",
    lg: "h-8 w-8"
  };

  return (
    <motion.div 
      className={cn(
        "flex flex-col items-center justify-center gap-3", 
        fullscreen && "fixed inset-0 bg-safesphere-dark/80 backdrop-blur-sm z-50",
        className
      )}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      // Reduced transition time for faster appearance
      transition={{ duration: delayedAppearance ? 0.2 : 0.05, delay: delayedAppearance ? 0.1 : 0 }}
    >
      <div className="relative">
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className={cn("text-safesphere-red", sizeClasses[size])}
        >
          <Loader className="w-full h-full" />
        </motion.div>
        
        {progress !== undefined && (
          <div className="absolute -bottom-6 w-full flex flex-col items-center">
            <div className="h-1 w-16 bg-safesphere-dark-hover rounded-full overflow-hidden">
              <motion.div 
                className="h-full bg-safesphere-red rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.2 }}
              />
            </div>
            <span className="text-[10px] text-safesphere-white-muted/60 mt-1">
              {Math.round(progress)}%
            </span>
          </div>
        )}
      </div>
      
      {text && (
        <motion.p 
          className="text-xs text-safesphere-white-muted/80"
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
        >
          {text}
        </motion.p>
      )}
    </motion.div>
  );
}
