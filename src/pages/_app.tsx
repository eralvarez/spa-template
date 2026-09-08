import { Outlet } from 'react-router';
import CssBaseline from '@mui/material/CssBaseline';

const RootLayout = () => {
  return (
    <>
      <CssBaseline />
      <Outlet />
    </>
  );
};

export default RootLayout;
