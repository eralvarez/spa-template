import { useNavigate } from 'router';
import { Button } from 'components/Button';

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <main className="mx-auto mt-16 max-w-sm px-4 text-center">
      <h1 className="mb-2 text-3xl font-semibold">404</h1>
      <p className="mb-6 text-gray-600">Page not found.</p>
      <Button variant="solid" onClick={() => navigate('/')}>
        Go to home
      </Button>
    </main>
  );
}
