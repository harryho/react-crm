import type {} from '@mui/lab/themeAugmentation';
import type {} from '@mui/material/themeCssVarsAugmentation';

import CssBaseline from '@mui/material/CssBaseline';
import {  CssVarsProvider } from '@mui/material/styles';

import { createTheme2 } from './create-theme';

// ----------------------------------------------------------------------

type Props = {
  children: React.ReactNode;
};

export function ThemeProvider({ children }: Props) {
  const theme = createTheme2();

  return (
    <>
     <CssVarsProvider theme={theme}>
      <CssBaseline />
      {children}
     </CssVarsProvider>
    </>
  );
}
