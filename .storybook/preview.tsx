import * as React from 'react';
import '../src/index.css';
import { initialize, mswLoader } from 'msw-storybook-addon';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { DialogsProvider } from '@toolpad/core/useDialogs';
import { handlers } from '../src/mocks/handlers';

initialize();

// ponytail: must mirror src/App.tsx's createTheme({ cssVariables: ... }) - any component touching theme.vars.* renders blank without it.
const theme = createTheme({
  cssVariables: {
    colorSchemeSelector: 'data-toolpad-color-scheme',
  },
  colorSchemes: { light: true, dark: true },
});

/** @type { import('@storybook/react').Preview } */
const preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
       expanded: true ,
    },
    // ponytail: default to the app's real MSW handlers so pages that fetch on mount just work; stories can override via parameters.msw.handlers to exercise empty/error states.
    msw: {
      handlers,
    },
  },
  decorators: [
    (Story: React.ComponentType) => (
      <ThemeProvider theme={theme}>
        <DialogsProvider>
          <Story />
        </DialogsProvider>
      </ThemeProvider>
    ),
  ],
  loaders: [mswLoader],
};

export default preview;
