import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useMutation } from 'convex/react';
import { useAuthActions } from '@convex-dev/auth/react';
import { useLocation } from 'react-router';
import { api } from 'convex/_generated/api';
import {
  AppLayout,
  type AppLayoutLanguage,
  type AppLayoutLanguageSwitcher,
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
  '/app/settings': 'settings.title',
};

const SUPPORTED_LANGUAGES: ReadonlyArray<AppLayoutLanguage> = ['en', 'es'];

function isSupportedLanguage(value: unknown): value is AppLayoutLanguage {
  return (
    typeof value === 'string' &&
    (SUPPORTED_LANGUAGES as ReadonlyArray<string>).includes(value)
  );
}

export default function AppLayoutRoute() {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const { signOut } = useAuthActions();
  const me = useQueryState(api.users.getMe);
  const setLanguage = useMutation(api.users.setLanguage);

  // Resolve the current language from the user record (default US / English).
  const [currentLanguage, setCurrentLanguage] = useState<AppLayoutLanguage>(
    (localStorage.getItem('i18nextLng') as AppLayoutLanguage) ?? 'en',
  );
  useEffect(() => {
    if (me.status === 'success') {
      const fromDoc = me.data?.language;
      if (isSupportedLanguage(fromDoc) && fromDoc !== currentLanguage) {
        setCurrentLanguage(fromDoc);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [me.status, me.status === 'success' ? me.data?.language : undefined]);

  // Sync i18n whenever the resolved current language changes (initial load
  // and any subsequent mutation).
  useEffect(() => {
    if (i18n.language !== currentLanguage) {
      void i18n.changeLanguage(currentLanguage);
    }
  }, [currentLanguage, i18n]);

  async function handleLanguageChange(language: AppLayoutLanguage) {
    setCurrentLanguage(language);
    await i18n.changeLanguage(language);
    if (me.status === 'success' && me.data) {
      try {
        await setLanguage({ language });
      } catch {
        // The UI already reflects the new language; persistence failures are
        // surfaced by the next me refetch.
      }
    }
  }

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

  const languageSwitcher: AppLayoutLanguageSwitcher = {
    current: currentLanguage,
    onChange: handleLanguageChange,
    ariaLabel: t('app.language.aria'),
    options: {
      en: t('app.language.options.en'),
      es: t('app.language.options.es'),
    },
  };

  return (
    <AuthGuard>
      <AppLayout
        navigation={navigation}
        userNavigation={userNavigation}
        user={user}
        title={t(titleKey)}
        logoAlt={t('app.brand')}
        languageSwitcher={languageSwitcher}
      />
    </AuthGuard>
  );
}
