import Typography from '@mui/material/Typography';
import LinearProgress from '@mui/material/LinearProgress';
import Switch from '@mui/material/Switch';

export default function About() {
  return (
    <>
      <Typography variant="h4" gutterBottom>
        About
      </Typography>
      <LinearProgress />
      <Typography component="div">
        <Switch defaultChecked /> A switch
      </Typography>
    </>
  );
}
