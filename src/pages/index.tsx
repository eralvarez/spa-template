import { useEffect } from 'react';
import { useQuery } from 'convex/react';
import { api } from 'convex/_generated/api';

export default function Home() {
  const tasks = useQuery(api.tasks.get);

  useEffect(() => {
    console.log('Home page mounted');
  }, []);

  return (
    <div>
      <h1>Home</h1>
      {tasks?.map(({ _id, text }) => (
        <div key={_id}>{text}</div>
      ))}
    </div>
  );
}
