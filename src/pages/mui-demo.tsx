import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';

export default function MuiDemo() {
  return (
    <Stack spacing={2} sx={{ p: 4 }}>
      <Alert severity="success">MUI is wired up and working.</Alert>
      <div>
        <Button variant="contained">Contained</Button> <Button variant="outlined">Outlined</Button>{' '}
        <Button variant="text">Text</Button>
      </div>
      <div>
        <Chip label="Primary" color="primary" /> <Chip label="Secondary" color="secondary" />
      </div>
    </Stack>
  );
}
