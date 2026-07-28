import { Outlet } from 'react-router';
import { PublicGuard } from 'components/PublicGuard';

export default function AppLayoutRoute() {
  return (
    <PublicGuard>
      <Outlet />
    </PublicGuard>
  );
}
