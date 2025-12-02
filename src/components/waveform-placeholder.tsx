"use client";

import { useMemo } from "react";
import { cn } from "@/lib/utils";

interface WaveformPlaceholderProps {
  isActive?: boolean;
  isLoading?: boolean;
}

export function WaveformPlaceholder({ isActive, isLoading }: WaveformPlaceholderProps) {
  const bars = useMemo(
    () =>
      Array.from({ length: 64 }, (_, index) => {
        const pseudoRandom = Math.abs(Math.sin(index * 12.9898 + 78.233));
        return 0.2 + (pseudoRandom % 1) * 0.8 + index * 0.01;
      }),
    [],
  );

  return (
    <div className="w-full rounded-3xl border border-white/10 bg-white/5/10 p-4 backdrop-blur-xl">
      <div className={cn("flex h-32 items-end gap-1 overflow-hidden", isLoading && "animate-pulse opacity-70")}>
        {bars.map((scale, idx) => {
          const barHeight = Math.max(8, scale * (isActive ? 42 : 24));
          return (
            <div
              key={idx}
              className={cn(
                "w-1 rounded-full bg-gradient-to-t from-white/20 via-emerald-300/70 to-emerald-400/80 transition-all duration-200",
                isActive ? "opacity-100" : "opacity-70",
              )}
              style={{
                height: `${barHeight}px`,
                animationDelay: `${idx * 20}ms`,
                animationDuration: `${800 + (idx % 5) * 120}ms`,
                animationName: isActive ? "audiogen-bounce" : undefined,
              }}
            />
          );
        })}
      </div>
    </div>
  );
}
