import { Outlet } from "react-router";
import CssBaseline from "@mui/material/CssBaseline";

const RootLayout = () => {
  return (
    <html lang="en">
      <CssBaseline />
      <body>
        <Outlet />
      </body>
    </html>
  );
};

export default RootLayout;