import { motion } from 'motion/react';

interface RevealTextProps {
  text: string;
  className?: string;
}

export default function RevealText({ text, className = '' }: RevealTextProps) {
  const words = text.split(' ');

  return (
    <span className={`inline-flex flex-wrap justify-center gap-x-[0.25em] ${className}`}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          initial={{ y: '60%', opacity: 0, filter: 'blur(8px)' }}
          whileInView={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: i * 0.08 }}
          className="inline-block"
        >
          {word}
        </motion.span>
      ))}
    </span>
  );
}
