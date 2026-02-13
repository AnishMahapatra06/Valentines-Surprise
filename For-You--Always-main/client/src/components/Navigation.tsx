import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

export function Navigation() {
  const [location] = useLocation();

  const links = [
    { href: "/story", label: "Our Story" },
    { href: "/memories", label: "Memories" },
    { href: "/surprise", label: "Surprise" },
    { href: "/final", label: "For You" },
  ];

  if (location === "/") return null;

  return (
    <nav className="fixed top-0 left-0 right-0 z-40 flex justify-center py-6 pointer-events-none">
      <div className="bg-white/80 backdrop-blur-md px-6 py-3 rounded-full shadow-sm border border-pink-100 pointer-events-auto flex gap-6">
        {links.map((link) => {
          const isActive = location === link.href;
          return (
            <Link 
              key={link.href} 
              href={link.href}
              className={cn(
                "relative text-sm font-medium transition-colors duration-200",
                isActive ? "text-accent" : "text-gray-500 hover:text-accent/70"
              )}
            >
              {link.label}
              {isActive && (
                <motion.div
                  layoutId="active-dot"
                  className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-accent"
                />
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
