import { Typography } from '@mui/material';
import { useQuery } from 'convex/react';
import { api } from '../../convex/_generated/api';

export default function Home() {
  const tasks = useQuery(api.tasks.get);

  return (
    <>
      <Typography variant="h4" gutterBottom>
        Home
      </Typography>
      <ul>
        {tasks?.map((task) => (
          <li key={task._id}>{task.text}</li>
        ))}
      </ul>
    </>
  );
}
