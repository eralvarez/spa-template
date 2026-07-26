import { api } from 'convex/_generated/api';
import { Link } from 'router';
import { useQueryState } from 'hooks/useQueryState';

export default function Home() {
  const tasksResponse = useQueryState(api.tasks.get);

  return (
    <div>
      <h1>Home</h1>
      {tasksResponse.status === 'success' &&
        tasksResponse.data.map(({ _id, text }) => <div key={_id}>{text}</div>)}

      <div className="flex flex-col gap-4 mt-4">
        <Link to="/login" className="text-blue-600 hover:underline">
          Login
        </Link>
        <Link to="/signup" className="text-blue-600 hover:underline">
          Sign up
        </Link>
        <Link to="/app" className="text-blue-600 hover:underline">
          App
        </Link>
      </div>
    </div>
  );
}
