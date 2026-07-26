import { useEffect } from 'react';
import { useConvexAuth } from '@convex-dev/auth/react';
import { type Path, useNavigate } from 'router';

// Redirects already-authenticated visitors away from a guest-only page.
// Defaults to `/`; pass any `Path` to land elsewhere.
export function useAuthBounce(to: Path = '/') {
  const { isAuthenticated, isLoading } = useConvexAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      navigate(to, { replace: true });
    }
  }, [isAuthenticated, isLoading, navigate, to]);
}
