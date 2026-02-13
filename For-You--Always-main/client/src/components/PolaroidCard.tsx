import { motion } from "framer-motion";
import { type Memory } from "@shared/schema";

interface PolaroidCardProps {
  memory: Memory;
  index: number;
}

export function PolaroidCard({ memory, index }: PolaroidCardProps) {
  // Generate stable random rotation based on ID if not provided
  const rotation = memory.rotation || (memory.id % 10) - 5; 

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, y: 50 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ 
        scale: 1.05, 
        zIndex: 10,
        rotate: 0,
        transition: { duration: 0.2 }
      }}
      className="relative group bg-white p-4 pb-12 shadow-md hover:shadow-xl transition-shadow duration-300 w-full max-w-xs mx-auto"
      style={{ rotate: `${rotation}deg` }}
    >
      <div className="aspect-[4/5] overflow-hidden bg-gray-100 mb-4 border border-gray-100">
        <img 
          src={memory.url} 
          alt={memory.caption} 
          className="w-full h-full object-cover filter sepia-[.2] contrast-105 group-hover:sepia-0 transition-all duration-500"
        />
      </div>
      
      <div className="absolute bottom-4 left-0 right-0 text-center px-4">
        <p className="font-handwriting text-xl text-gray-700 leading-tight">
          {memory.caption}
        </p>
        {memory.date && (
          <p className="font-serif text-xs text-gray-400 mt-1 italic">{memory.date}</p>
        )}
      </div>
      
      {/* Tape effect */}
      <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-24 h-8 bg-white/40 backdrop-blur-[1px] shadow-sm transform -rotate-1 skew-x-12"></div>
    </motion.div>
  );
}
