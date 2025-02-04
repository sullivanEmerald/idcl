import { cn } from '@/lib/utils';

interface LoadingSpinnerProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'primary' | 'secondary' | 'white';
}

export function LoadingSpinner({ 
  className,
  size = 'md',
  variant = 'primary'
}: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: 'h-4 w-4 border-2',
    md: 'h-8 w-8 border-3',
    lg: 'h-12 w-12 border-4'
  };

  const variantClasses = {
    primary: 'border-indigo-600/30 border-t-indigo-600',
    secondary: 'border-purple-600/30 border-t-purple-600',
    white: 'border-white/30 border-t-white'
  };

  return (
    <div
      className={cn(
        'animate-spin rounded-full',
        sizeClasses[size],
        variantClasses[variant],
        className
      )}
    />
  );
}
