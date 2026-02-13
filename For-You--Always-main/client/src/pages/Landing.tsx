import { motion, useMotionValue, useTransform } from "framer-motion";
import { Heart, Sparkles } from "lucide-react";
import { useLocation } from "wouter";
import { useAudio } from "@/hooks/use-audio";
import { useConfig } from "@/hooks/use-config";
import { usePartner } from "@/hooks/use-partner";
import { useState, useEffect, useCallback, memo } from "react";

// Memoized decorative components
const FloatingHeart = memo(({ delay, index }: { delay: number; index: number }) => (
  <motion.div
    className="absolute will-change-transform"
    initial={{
      x: typeof window !== 'undefined' ? Math.random() * window.innerWidth : 0,
      y: typeof window !== 'undefined' ? window.innerHeight + 100 : 0,
      opacity: 0,
    }}
    animate={{
      y: -200,
      opacity: [0, 0.5, 0.5, 0],
    }}
    transition={{
      duration: 10 + Math.random() * 5,
      repeat: Infinity,
      delay,
      ease: "linear",
    }}
  >
    <Heart className="w-3 h-3 sm:w-4 sm:h-4 text-pink-400/40 fill-pink-300/40" />
  </motion.div>
));

FloatingHeart.displayName = "FloatingHeart";

const Sparkle = memo(({ delay, left, top }: { delay: number; left: string; top: string }) => (
  <motion.div
    className="absolute will-change-transform"
    style={{ left, top }}
    animate={{
      opacity: [0, 1, 0],
      scale: [0, 1, 0],
    }}
    transition={{
      duration: 3,
      repeat: Infinity,
      delay,
      ease: "easeInOut",
    }}
  >
    <Sparkles className="w-2 h-2 sm:w-3 sm:h-3 text-pink-400/50" />
  </motion.div>
));

Sparkle.displayName = "Sparkle";

const DecorativeLine = memo(() => (
  <div className="h-px w-8 sm:w-12 bg-gradient-to-r from-transparent via-pink-400/50 to-transparent" />
));

DecorativeLine.displayName = "DecorativeLine";

export default function Landing() {
  const [, setLocation] = useLocation();
  const { toggle } = useAudio();
  const { isLoading } = useConfig();
  const { name } = usePartner();
  const [isHovering, setIsHovering] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [isNavigating, setIsNavigating] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left - rect.width / 2);
    mouseY.set(e.clientY - rect.top - rect.height / 2);
  }, [mouseX, mouseY]);

  // Reduced rotation for better performance
  const rotateX = useTransform(mouseY, [-300, 300], [4, -4]);
  const rotateY = useTransform(mouseX, [-300, 300], [-4, 4]);

  useEffect(() => {
    const timer = setTimeout(() => setShowMessage(true), 2500);
    return () => clearTimeout(timer);
  }, []);

  // Debounced navigation to prevent double-clicks
  const handleStart = useCallback(async () => {
    if (isNavigating) return;
    setIsNavigating(true);
    toggle();
    await new Promise((r) => setTimeout(r, 500));
    setLocation("/story");
  }, [isNavigating, toggle, setLocation]);

  return (
    <div 
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-rose-50 via-pink-50 to-purple-50 px-4"
      onMouseMove={handleMouseMove}
    >
      {/* Simplified background - single gradient layer */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-pink-200/20 via-transparent to-transparent" />
      
      {/* Optimized glowing aura - reduced to 1 layer with lower blur */}
      <motion.div
        animate={{ 
          scale: [1, 1.15, 1],
          opacity: [0.15, 0.25, 0.15],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute w-[500px] h-[500px] sm:w-[700px] sm:h-[700px] bg-gradient-to-r from-pink-300/30 to-purple-300/30 rounded-full blur-[80px] will-change-transform"
      />

      {/* Reduced floating hearts - only 5 instead of 8 */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(5)].map((_, i) => (
          <FloatingHeart key={`heart-${i}`} delay={i * 1.5} index={i} />
        ))}
      </div>

      {/* Reduced sparkles - only 10 instead of 20 */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(10)].map((_, i) => (
          <Sparkle 
            key={`sparkle-${i}`} 
            delay={i * 0.3}
            left={`${Math.random() * 100}%`}
            top={`${Math.random() * 100}%`}
          />
        ))}
      </div>

      {/* Main content container with optimized 3D transforms */}
      <motion.div 
        className="z-10 flex flex-col items-center text-center space-y-8 sm:space-y-12 md:space-y-14 max-w-2xl will-change-transform"
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
      >
        {/* Top decorative element */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="flex items-center gap-2 sm:gap-3"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="will-change-transform"
          >
            <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-pink-400/70" />
          </motion.div>
          <DecorativeLine />
          <Heart className="w-3 h-3 sm:w-4 sm:h-4 text-rose-400 fill-rose-300/50" />
          <DecorativeLine />
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="will-change-transform"
          >
            <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-pink-400/70" />
          </motion.div>
        </motion.div>

        {/* Heading section - mobile-first responsive */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="space-y-4 sm:space-y-6"
        >
          <motion.span 
            className="font-handwriting text-lg sm:text-2xl md:text-3xl text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-rose-500 to-purple-500 block leading-relaxed px-4"
            animate={{ opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          >
            I've been carrying this in my heart for so long…
          </motion.span>

          <motion.div
            animate={{ 
              textShadow: [
                "0 0 15px rgba(244, 114, 182, 0.1)",
                "0 0 20px rgba(244, 114, 182, 0.15)",
                "0 0 15px rgba(244, 114, 182, 0.1)",
              ]
            }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-transparent bg-clip-text bg-gradient-to-br from-rose-600 via-pink-600 to-purple-600 tracking-tight leading-tight px-2">
              {isLoading ? (
                <motion.span
                  animate={{ opacity: [0.3, 1, 0.3] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  …
                </motion.span>
              ) : (
                name
              )}
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
            className="space-y-2"
          >
            <p className="text-sm sm:text-base md:text-lg text-rose-700/80 font-light italic leading-relaxed px-4">
              Every moment since you walked into my life,
              <br />
              <span className="text-pink-600/90">the universe feels a little more magical.</span>
            </p>
          </motion.div>
        </motion.div>

        {/* Interactive heart button - touch-friendly sizing */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.3, duration: 0.7, type: "spring", stiffness: 200 }}
          className="relative"
        >
          <motion.button
            onClick={handleStart}
            onHoverStart={() => setIsHovering(true)}
            onHoverEnd={() => setIsHovering(false)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.92 }}
            disabled={isNavigating}
            className="relative group cursor-pointer will-change-transform touch-manipulation"
            aria-label="Start the journey"
          >
            {/* Simplified glow rings */}
            {isHovering && (
              <motion.div
                className="absolute inset-0 rounded-full bg-gradient-to-r from-pink-400/30 to-rose-400/30 will-change-transform"
                animate={{ 
                  scale: [1, 1.4, 1],
                  opacity: [0.5, 0, 0.5]
                }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
            )}

            {/* Main button - larger touch target for mobile */}
            <div className="relative z-10 bg-gradient-to-br from-white via-pink-50 to-white p-8 sm:p-10 rounded-full shadow-xl shadow-pink-300/40 border-3 sm:border-4 border-pink-200 group-hover:border-rose-300 transition-all duration-500">
              <motion.div
                animate={{ 
                  scale: isHovering ? [1, 1.12, 1] : [1, 1.04, 1]
                }}
                transition={{
                  duration: isHovering ? 0.6 : 1.3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="will-change-transform"
              >
                <Heart
                  className="w-16 h-16 sm:w-20 sm:h-20 text-rose-500 fill-pink-200 group-hover:fill-rose-400 transition-all duration-500"
                  strokeWidth={1.8}
                />
              </motion.div>
            </div>

            {/* Single pulse ring for performance */}
            <motion.span 
              className="absolute inset-0 rounded-full bg-gradient-to-r from-pink-400/20 to-rose-400/20 will-change-transform"
              animate={{ scale: [1, 1.4], opacity: [0.4, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
            />
          </motion.button>

          {/* Hover message */}
          {isHovering && (
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute -bottom-12 sm:-bottom-16 left-1/2 -translate-x-1/2 text-rose-600 font-handwriting text-lg sm:text-xl whitespace-nowrap"
            >
              Yes, this is for you ♡
            </motion.p>
          )}
        </motion.div>

        {/* Bottom whisper text */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: showMessage ? 1 : 0 }}
          transition={{ duration: 1.5 }}
          className="space-y-2 sm:space-y-3"
        >
          <motion.p
            animate={{ opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            className="text-rose-600/80 font-handwriting text-base sm:text-lg"
          >
            Click the heart when you're ready…
          </motion.p>
          
          <p className="text-pink-500/60 text-xs sm:text-sm italic">
            (Some feelings are too precious to rush)
          </p>
        </motion.div>

        {/* Bottom decorative element */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 0.5, y: 0 }}
          transition={{ duration: 1, delay: 1.8 }}
          className="flex items-center gap-2"
        >
          <div className="h-px w-6 sm:w-8 bg-gradient-to-r from-transparent to-pink-300/50" />
          <Heart className="w-2 h-2 sm:w-3 sm:h-3 text-pink-400/60 fill-pink-300/40" />
          <div className="h-px w-12 sm:w-16 bg-gradient-to-r from-pink-300/50 via-rose-300/50 to-pink-300/50" />
          <Heart className="w-2 h-2 sm:w-3 sm:h-3 text-rose-400/60 fill-rose-300/40" />
          <div className="h-px w-6 sm:w-8 bg-gradient-to-l from-transparent to-pink-300/50" />
        </motion.div>
      </motion.div>
    </div>
  );
}