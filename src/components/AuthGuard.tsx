import { useEffect, type ReactNode } from 'react';
import { useConvexAuth } from '@convex-dev/auth/react';
import { useNavigate } from 'router';

// Inverse of useAuthBounce: renders children only when the user is authenticated.
// While loading, renders nothing. If auth resolves to unauthenticated, redirects to `/`.
export function AuthGuard({ children }: { children: ReactNode }) {
  const { isAuthenticated, isLoading } = useConvexAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigate('/', { replace: true });
    }
  }, [isAuthenticated, isLoading, navigate]);

  if (isLoading) return null;
  if (!isAuthenticated) return null;
  return <>{children}</>;
}
