
import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "success" | "warning" | "outline";
  className?: string;
}

export function Badge({ 
  children, 
  variant = "default", 
  className 
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium transition-all duration-200",
        variant === "default" && "bg-primary text-primary-foreground shadow-sm",
        variant === "success" && "bg-success/90 text-success-foreground shadow-sm",
        variant === "warning" && "bg-warning/90 text-warning-foreground shadow-sm",
        variant === "outline" && "border-2 border-border bg-transparent text-foreground hover:border-primary/20",
        className
      )}
    >
      {children}
    </span>
  );
}
