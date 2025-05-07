import React from 'react';

interface LoadingOverlayProps {
  isLoading: boolean;
}

export function LoadingOverlay({ isLoading }: LoadingOverlayProps) {
  if (!isLoading) return null;
  
  return (
    <div className="absolute inset-0 bg-white/70 flex items-center justify-center z-50">
      <div className="relative flex items-center justify-center">
        <div className="absolute animate-ping h-8 w-8 rounded-full bg-primary opacity-75"></div>
        <div className="relative h-6 w-6 rounded-full bg-primary"></div>
      </div>
    </div>
  );
}