
import { motion, MotionProps, AnimationControls, TargetAndTransition, VariantLabels } from "framer-motion";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface AnimatedContainerProps extends MotionProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  animateOnMount?: boolean;
  animationType?: "fadeIn" | "slideUp" | "scale" | "fadeInSlideUp";
}

type AnimationVariants = {
  initial: TargetAndTransition | VariantLabels;
  animate: TargetAndTransition | VariantLabels;
  exit: TargetAndTransition | VariantLabels;
};

export function AnimatedContainer({
  children,
  className,
  delay = 0,
  animateOnMount = true,
  animationType = "fadeIn",
  ...motionProps
}: AnimatedContainerProps) {
  const animations: Record<string, AnimationVariants> = {
    fadeIn: {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 }
    },
    slideUp: {
      initial: { y: 20, opacity: 0 },
      animate: { y: 0, opacity: 1 },
      exit: { y: -20, opacity: 0 }
    },
    scale: {
      initial: { scale: 0.95, opacity: 0 },
      animate: { scale: 1, opacity: 1 },
      exit: { scale: 0.95, opacity: 0 }
    },
    fadeInSlideUp: {
      initial: { y: 20, opacity: 0 },
      animate: { y: 0, opacity: 1 },
      exit: { y: -20, opacity: 0 }
    }
  };

  const selectedAnimation = animations[animationType];
  
  const transitionProps = {
    duration: animationType === 'scale' ? 0.3 : 0.4,
    delay,
    type: animationType === 'fadeIn' ? 'tween' : 'spring',
    stiffness: animationType === 'scale' ? 400 : 300,
    damping: 25
  };

  return (
    <motion.div
      className={cn(className)}
      initial={animateOnMount ? selectedAnimation.initial : undefined}
      animate={animateOnMount ? selectedAnimation.animate : undefined}
      exit={selectedAnimation.exit}
      transition={transitionProps}
      {...motionProps}
    >
      {children}
    </motion.div>
  );
}
