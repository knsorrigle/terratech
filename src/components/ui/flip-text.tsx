"use client";

import { cn } from "@/src/lib/utils";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";

interface FlipTextProps {
  children: string;
  className?: string;
  duration?: number;
  loop?: boolean;
  delayBetweenWords?: number;
}

export function FlipText({
  children,
  className,
  duration = 0.5,
  loop = false,
  delayBetweenWords = 0.08,
}: FlipTextProps) {
  const [currentText, setCurrentText] = useState(children);
  const [key, setKey] = useState(0);

  useEffect(() => {
    if (!loop) return;
    const interval = setInterval(() => {
      setKey((k) => k + 1);
    }, duration * 1000 + children.length * delayBetweenWords * 1000 + 1200);
    return () => clearInterval(interval);
  }, [loop, duration, children, delayBetweenWords]);

  return (
    <div
      className={cn(
        "flex items-center justify-center",
        className
      )}
      style={{ perspective: "500px" }}
    >
      <AnimatePresence mode="wait">
        <motion.div key={key} className="flex items-center justify-center">
          {currentText.split("").map((char, i) => (
            <motion.span
              key={i}
              initial={{ rotateX: 90, opacity: 0 }}
              animate={{ rotateX: 0, opacity: 1 }}
              transition={{
                duration: duration * 0.4,
                delay: i * delayBetweenWords,
                ease: "easeOut",
              }}
              style={{ display: "inline-block", transformOrigin: "center" }}
            >
              {char === " " ? "\u00A0" : char}
            </motion.span>
          ))}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
