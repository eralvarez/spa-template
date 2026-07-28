import { useEffect, type ReactNode } from 'react';
import { useConvexAuth } from '@convex-dev/auth/react';
import { useNavigate } from 'router';

export function PublicGuard({ children }: { children: ReactNode }) {
  const { isAuthenticated, isLoading } = useConvexAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      navigate('/', { replace: true });
    }
  }, [isAuthenticated, isLoading, navigate]);

  if (isLoading) return null;
  if (isAuthenticated) return null;
  return <>{children}</>;
}
