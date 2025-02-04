import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/use-auth';
import { AnimatePresence, motion } from 'framer-motion';
import { LoadingOverlay } from '../ui/loading-overlay';

interface AuthGuardProps {
  children: React.ReactNode;
}

export function AuthGuard({ children }: AuthGuardProps) {
  const router = useRouter();
  const { user, isLoading } = useAuth();
  const [isRedirecting, setIsRedirecting] = useState(false);

  useEffect(() => {
    if (!isLoading && user) {
      setIsRedirecting(true);
      // If user is already authenticated, redirect them to their appropriate dashboard
      const dashboardPath = user.role === 'advertiser' 
        ? '/advertiser/dashboard'
        : '/promoter/dashboard';
      
      // Add a small delay for the animation
      setTimeout(() => {
        router.replace(dashboardPath);
      }, 500);
    }
  }, [user, isLoading, router]);

  return (
    <AnimatePresence mode="wait">
      {isLoading || isRedirecting ? (
        <LoadingOverlay 
          key="loading" 
          message={isRedirecting ? 'Redirecting to dashboard...' : 'Checking authentication...'} 
        />
      ) : !user ? (
        <motion.div
          key="content"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {children}
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
