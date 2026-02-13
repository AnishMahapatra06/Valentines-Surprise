import { useAudio } from "@/hooks/use-audio";
import { Pause, Play } from "lucide-react";
import { cn } from "@/lib/utils";

export function MusicPlayer() {
  const { isPlaying, toggle } = useAudio();

  return (
    <button
      onClick={toggle} // 👈 bas itna hi
      className={cn(
        "fixed bottom-6 right-6 z-50 p-3 rounded-full shadow-lg border border-pink-200 transition-all duration-300",
        "bg-white/80 backdrop-blur-sm hover:scale-105 active:scale-95 hover:shadow-pink-200/50",
        isPlaying ? "text-pink-500 animate-pulse-slow" : "text-gray-400"
      )}
      aria-label={isPlaying ? "Pause Music" : "Play Music"}
    >
      {isPlaying ? (
        <Pause className="w-6 h-6" />
      ) : (
        <Play className="w-6 h-6 pl-1" />
      )}
    </button>
  );
}
