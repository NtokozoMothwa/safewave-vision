
import React from 'react';
import { motion } from 'framer-motion';

interface AnimatedTransitionProps {
  children: React.ReactNode;
  className?: string;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  delay?: number;
  duration?: number;
}

const variants = {
  up: {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  },
  down: {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0 }
  },
  left: {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 }
  },
  right: {
    hidden: { opacity: 0, x: 20 },
    visible: { opacity: 1, x: 0 }
  },
  none: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
  }
};

const AnimatedTransition: React.FC<AnimatedTransitionProps> = ({
  children,
  className = '',
  direction = 'up',
  delay = 0,
  duration = 0.5
}) => {
  return (
    <motion.div
      className={className}
      initial="hidden"
      animate="visible"
      variants={variants[direction]}
      transition={{ 
        duration: duration, 
        delay: delay,
        ease: [0.22, 1, 0.36, 1]
      }}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedTransition;
