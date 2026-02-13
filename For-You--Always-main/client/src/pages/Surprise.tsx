import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { Link } from "wouter";
import { usePartner } from "@/hooks/use-partner";
import { Gift, Heart, Sparkles, Star } from "lucide-react";

export default function Surprise() {
  const [isOpen, setIsOpen] = useState(false);
  const [isEnvelopeHovered, setIsEnvelopeHovered] = useState(false);
  const { signature } = usePartner();

  const handleOpen = () => {
    if (isOpen) return;
    setIsOpen(true);
    
    // Enhanced confetti celebration
    const duration = 4000;
    const end = Date.now() + duration;
    const colors = ['#ffc0cb', '#ff69b4', '#ff1493', '#ff85a1', '#ffb3c6'];

    (function frame() {
      // Left side confetti
      confetti({
        particleCount: 7,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: 0.6 },
        colors: colors,
        shapes: ['circle', 'square'],
        scalar: 1.2,
      });
      
      // Right side confetti
      confetti({
        particleCount: 7,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: 0.6 },
        colors: colors,
        shapes: ['circle', 'square'],
        scalar: 1.2,
      });
      
      // Center burst
      confetti({
        particleCount: 3,
        angle: 90,
        spread: 100,
        origin: { x: 0.5, y: 0.5 },
        colors: colors,
        shapes: ['star'],
        scalar: 1.5,
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    })();
  };

  const surpriseText = "I don’t always say it out loud, but you mean more to me than you’ll ever know. In every little moment, every smile, every memory we’re building something beautiful. And I’m so grateful it’s with you.";
  

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden bg-gradient-to-br from-rose-50 via-pink-50 to-purple-50">
      {/* Background decorative elements */}
      <div className="fixed inset-0 pointer-events-none">
        {/* Soft gradient orbs */}
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.05, 0.1, 0.05],
            rotate: [0, 90, 0],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-pink-400 rounded-full blur-[150px]"
        />
        <motion.div
          animate={{
            scale: [1.3, 1, 1.3],
            opacity: [0.05, 0.1, 0.05],
            rotate: [90, 0, 90],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-400 rounded-full blur-[150px]"
        />

        {/* Floating sparkles */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0, 0.6, 0],
              scale: [0, 1, 0],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: i * 0.3,
              ease: "easeInOut",
            }}
          >
            <Sparkles className="w-3 h-3 text-pink-400/30" />
          </motion.div>
        ))}

        {/* Floating hearts */}
        {!isOpen && [...Array(8)].map((_, i) => (
          <motion.div
            key={`heart-${i}`}
            className="absolute"
            initial={{
              x: Math.random() * window.innerWidth,
              y: window.innerHeight + 100,
            }}
            animate={{
              y: -200,
              opacity: [0, 0.4, 0.4, 0],
              rotate: [0, 360],
            }}
            transition={{
              duration: 12 + Math.random() * 6,
              repeat: Infinity,
              delay: i * 1.5,
              ease: "linear",
            }}
          >
            <Heart className="w-5 h-5 text-pink-300/40 fill-pink-200/40" />
          </motion.div>
        ))}
      </div>

      <div className="w-full max-w-lg relative z-10" style={{ perspective: "1000px" }}>
        <AnimatePresence mode="wait">
          {!isOpen ? (
            <motion.div
              key="envelope"
              initial={{ scale: 0.8, opacity: 0, rotateY: -20 }}
              animate={{ scale: 1, opacity: 1, rotateY: 0 }}
              exit={{ scale: 1.2, opacity: 0, rotateY: 20 }}
              transition={{ duration: 0.6 }}
              onClick={handleOpen}
              onHoverStart={() => setIsEnvelopeHovered(true)}
              onHoverEnd={() => setIsEnvelopeHovered(false)}
              className="cursor-pointer group mx-auto relative"
            >
              {/* Glow effect */}
              <motion.div
                animate={{
                  opacity: isEnvelopeHovered ? [0.3, 0.6, 0.3] : 0.2,
                  scale: isEnvelopeHovered ? [1, 1.2, 1] : 1,
                }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute inset-0 -z-10 bg-gradient-to-br from-pink-400/30 to-rose-400/30 rounded-3xl blur-3xl"
              />

              {/* Envelope container */}
              <div className="relative w-full max-w-sm mx-auto">
                <motion.div
                  animate={{
                    y: isEnvelopeHovered ? -10 : 0,
                    rotateZ: isEnvelopeHovered ? -3 : 0,
                  }}
                  transition={{ duration: 0.3 }}
                  className="relative w-full aspect-[4/3] bg-gradient-to-br from-pink-200 to-rose-200 rounded-2xl shadow-2xl overflow-hidden"
                  style={{ transformStyle: "preserve-3d" }}
                >
                  {/* Envelope pattern */}
                  <div className="absolute inset-0 opacity-10">
                    <div className="absolute inset-0" style={{
                      backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,0.1) 10px, rgba(255,255,255,0.1) 20px)`
                    }} />
                  </div>

                  {/* Top Flap */}
                  <motion.div
                    animate={{
                      rotateX: isEnvelopeHovered ? -15 : 0,
                    }}
                    transition={{ duration: 0.4 }}
                    className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-br from-pink-300 to-rose-300 origin-bottom shadow-lg"
                    style={{
                      clipPath: "polygon(0 0, 100% 0, 50% 100%)",
                      transformStyle: "preserve-3d",
                    }}
                  >
                    {/* Flap decoration */}
                    <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent" />
                  </motion.div>

                  {/* Envelope Body */}
                  <div className="absolute inset-0 bg-gradient-to-br from-pink-100 to-rose-100" />
                  
                  {/* Bottom decorative triangle */}
                  <div
                    className="absolute bottom-0 left-0 w-full h-full bg-gradient-to-t from-pink-200/50 to-transparent"
                    style={{ clipPath: "polygon(0 100%, 50% 50%, 100% 100%)" }}
                  />

                  {/* Center content area */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    {/* Seal */}
                    <motion.div
                      animate={{
                        scale: isEnvelopeHovered ? [1, 1.15, 1] : 1,
                        rotate: isEnvelopeHovered ? [0, -5, 5, 0] : 0,
                      }}
                      transition={{ duration: 0.6 }}
                      className="relative z-40 w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-rose-500 to-pink-600 rounded-full flex items-center justify-center shadow-2xl border-4 border-white/40"
                    >
                      {/* Inner glow */}
                      <motion.div
                        animate={{
                          opacity: [0.5, 1, 0.5],
                          scale: [0.8, 1, 0.8],
                        }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="absolute inset-2 bg-white/20 rounded-full"
                      />
                      
                      <Heart className="w-8 h-8 md:w-10 md:h-10 text-white fill-white relative z-10" />

                      {/* Sparkles around seal */}
                      {isEnvelopeHovered && [...Array(6)].map((_, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{
                            opacity: [0, 1, 0],
                            scale: [0, 1, 0],
                            x: Math.cos((i * Math.PI) / 3) * 35,
                            y: Math.sin((i * Math.PI) / 3) * 35,
                          }}
                          transition={{
                            duration: 1.5,
                            repeat: Infinity,
                            delay: i * 0.1,
                          }}
                          className="absolute"
                        >
                          <Star className="w-3 h-3 text-yellow-300 fill-yellow-300" />
                        </motion.div>
                      ))}
                    </motion.div>
                  </div>

                  {/* Corner decorations */}
                  <div className="absolute top-3 right-3 opacity-20">
                    <Sparkles className="w-5 h-5 text-rose-600" />
                  </div>
                  <div className="absolute bottom-3 left-3 opacity-20">
                    <Sparkles className="w-5 h-5 text-pink-600" />
                  </div>
                </motion.div>

                {/* Tap to open text */}
                <motion.div
                  animate={{
                    y: [0, -10, 0],
                    opacity: isEnvelopeHovered ? 1 : 0.7,
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="mt-8 text-center"
                >
                  <p className="font-handwriting text-xl md:text-2xl text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-rose-600">
                    Tap to reveal your surprise
                  </p>
                  <motion.div
                    animate={{
                      scale: [1, 1.2, 1],
                    }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="mt-2 flex justify-center"
                  >
                    <Heart className="w-4 h-4 text-pink-500 fill-pink-400" />
                  </motion.div>
                </motion.div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="content"
              initial={{ opacity: 0, scale: 0.5, y: 50, rotateY: -30 }}
              animate={{ opacity: 1, scale: 1, y: 0, rotateY: 0 }}
              transition={{ type: "spring", bounce: 0.4, duration: 0.8 }}
              className="bg-white/95 backdrop-blur-xl p-6 md:p-12 rounded-3xl shadow-2xl border-2 border-pink-200/50 text-center relative overflow-hidden mx-4"
            >
              {/* Top gradient border */}
              <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-pink-400 via-rose-500 to-purple-400" />

              {/* Animated background pattern */}
              <motion.div
                animate={{
                  backgroundPosition: ["0% 0%", "100% 100%"],
                }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 opacity-5"
                style={{
                  backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 30m-20 0a20 20 0 1 0 40 0a20 20 0 1 0 -40 0' fill='%23ff69b4' fill-opacity='0.4'/%3E%3C/svg%3E\")",
                  backgroundSize: "60px 60px",
                }}
              />

              {/* Floating particles inside card */}
              {[...Array(10)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute"
                  initial={{
                    x: Math.random() * 100 - 50,
                    y: 100,
                    opacity: 0,
                  }}
                  animate={{
                    y: -100,
                    opacity: [0, 0.6, 0],
                  }}
                  transition={{
                    duration: 3 + Math.random() * 2,
                    repeat: Infinity,
                    delay: i * 0.3,
                  }}
                  style={{
                    left: `${Math.random() * 100}%`,
                  }}
                >
                  <Heart className="w-3 h-3 text-pink-400/40 fill-pink-300/40" />
                </motion.div>
              ))}

              {/* Gift icon */}
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
                className="mb-8 flex justify-center relative"
              >
                <motion.div
                  animate={{
                    rotate: [0, -10, 10, -10, 0],
                  }}
                  transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                  className="p-6 bg-gradient-to-br from-pink-100 to-rose-100 rounded-full shadow-lg relative"
                >
                  <Gift className="w-14 h-14 md:w-16 md:h-16 text-rose-500" />
                  
                  {/* Sparkles around gift */}
                  {[...Array(4)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute"
                      animate={{
                        opacity: [0, 1, 0],
                        scale: [0, 1, 0],
                        rotate: [0, 180],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: i * 0.5,
                      }}
                      style={{
                        left: `${50 + Math.cos((i * Math.PI) / 2) * 60}%`,
                        top: `${50 + Math.sin((i * Math.PI) / 2) * 60}%`,
                      }}
                    >
                      <Sparkles className="w-4 h-4 text-pink-400" />
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>

              {/* Title */}
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="font-serif text-3xl md:text-5xl text-transparent bg-clip-text bg-gradient-to-r from-rose-600 via-pink-600 to-purple-600 mb-6"
              >
                Surprise!
              </motion.h2>

              {/* Decorative line */}
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "4rem" }}
                transition={{ delay: 0.7, duration: 0.6 }}
                className="h-1 bg-gradient-to-r from-pink-400 to-rose-400 rounded-full mx-auto mb-8"
              />

              {/* Content */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="space-y-6 mb-10 relative z-10"
              >
                <p className="text-lg md:text-xl text-gray-700 leading-relaxed font-body px-4">
                  {surpriseText}
                </p>
                <p className="text-sm text-gray-400 italic px-4">
                  ({signature || "With love"})
                </p>
              </motion.div>

              {/* CTA Button */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 }}
              >
                <Link href="/final">
                  <motion.button
                    whileHover={{ scale: 1.05, y: -3 }}
                    whileTap={{ scale: 0.95 }}
                    className="group relative w-full px-6 py-4 bg-gradient-to-r from-pink-100 via-rose-100 to-purple-100 text-rose-700 rounded-2xl font-semibold text-base md:text-lg shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
                  >
                    {/* Shimmer effect */}
                    <motion.div
                      animate={{
                        x: ["-100%", "100%"],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                    />

                    <span className="relative flex items-center justify-center gap-2">
                      One last thing...
                      <motion.div
                        animate={{ x: [0, 5, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      >
                        <Heart className="w-5 h-5 fill-rose-500" />
                      </motion.div>
                    </span>
                  </motion.button>
                </Link>
              </motion.div>

              {/* Bottom decoration */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2 }}
                className="mt-8 flex items-center justify-center gap-2"
              >
                {[...Array(3)].map((_, i) => (
                  <motion.div
                    key={i}
                    animate={{
                      scale: [1, 1.3, 1],
                      opacity: [0.3, 0.6, 0.3],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: i * 0.3,
                    }}
                  >
                    <Heart className="w-3 h-3 text-pink-400/60 fill-pink-300/50" />
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}