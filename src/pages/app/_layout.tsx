import type { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuthActions } from '@convex-dev/auth/react';
import { useLocation } from 'react-router';
import {
  AppLayout,
  type AppLayoutNavigationItem,
  type AppLayoutUserNavItem,
} from 'components/AppLayout';
import { AuthGuard } from 'components/AuthGuard';

const TITLE_BY_PATH: Record<string, string> = {
  '/app/dashboard': 'app.nav.dashboard',
  '/app/team': 'app.nav.team',
  '/app/projects': 'app.nav.projects',
  '/app/calendar': 'app.nav.calendar',
  '/app/reports': 'app.nav.reports',
};

export default function AppLayoutRoute({ children }: { children: ReactNode }) {
  const { t } = useTranslation();
  const location = useLocation();
  const { signOut } = useAuthActions();

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
    name: t('app.userFallback.name'),
    email: t('app.userFallback.email'),
    imageUrl:
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
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
