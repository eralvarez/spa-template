import { useTranslation } from 'react-i18next';
import { useNavigate } from 'router';
import { Button } from 'components/Button';

export default function NotFound() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <main className="mx-auto mt-16 max-w-sm px-4 text-center">
      <h1 className="mb-2 text-3xl font-semibold">{t('notFound.title')}</h1>
      <p className="mb-6 text-gray-600">{t('notFound.message')}</p>
      <Button variant="solid" onClick={() => navigate('/')}>
        {t('notFound.cta')}
      </Button>
    </main>
  );
}
