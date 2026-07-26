import type { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuthActions } from '@convex-dev/auth/react';
import { useLocation } from 'react-router';
import { api } from 'convex/_generated/api';
import {
  AppLayout,
  type AppLayoutNavigationItem,
  type AppLayoutUserNavItem,
} from 'components/AppLayout';
import { AuthGuard } from 'components/AuthGuard';
import { useQueryState } from 'hooks/useQueryState';

const TITLE_BY_PATH: Record<string, string> = {
  '/app/dashboard': 'app.nav.dashboard',
  '/app/team': 'app.nav.team',
  '/app/projects': 'app.nav.projects',
  '/app/calendar': 'app.nav.calendar',
  '/app/reports': 'app.nav.reports',
  '/app/profile': 'profile.title',
};

export default function AppLayoutRoute({ children }: { children: ReactNode }) {
  const { t } = useTranslation();
  const location = useLocation();
  const { signOut } = useAuthActions();
  const me = useQueryState(api.users.getMe);

  const navigation: AppLayoutNavigationItem[] = [
    { name: t('app.nav.dashboard'), href: '/app/dashboard' },
    { name: t('app.nav.team'), href: '/app/team' },
    { name: t('app.nav.projects'), href: '/app/projects' },
    { name: t('app.nav.calendar'), href: '/app/calendar' },
    { name: t('app.nav.reports'), href: '/app/reports' },
  ];

  const userNavigation: AppLayoutUserNavItem[] = [
    { name: t('app.userNav.profile'), href: '/app/profile' },
    { name: t('app.userNav.settings'), href: '/app/settings' },
    { name: t('app.userNav.signOut'), onClick: () => void signOut() },
  ];

  const user = {
    name:
      me.status === 'success'
        ? ((me.data?.name as string | undefined) ?? t('app.userFallback.name'))
        : t('app.userFallback.name'),
    email:
      me.status === 'success'
        ? ((me.data?.email as string | undefined) ?? '')
        : '',
    imageUrl:
      me.status === 'success'
        ? ((me.data?.image as string | undefined) ?? undefined)
        : undefined,
  };

  const titleKey = TITLE_BY_PATH[location.pathname] ?? 'app.title';

  return (
    <AuthGuard>
      <AppLayout
        navigation={navigation}
        userNavigation={userNavigation}
        user={user}
        title={t(titleKey)}
        logoAlt={t('app.brand')}
      >
        {children}
      </AppLayout>
    </AuthGuard>
  );
}
