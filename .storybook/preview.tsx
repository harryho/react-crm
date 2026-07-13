import * as React from 'react';
import '../src/index.css';
import { initialize, mswLoader } from 'msw-storybook-addon';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { DialogsProvider } from '@toolpad/core/useDialogs';
import { handlers } from '../src/mocks/handlers';

initialize();

// Mirrors the theme built in src/App.tsx - components that touch
// theme.vars.palette (e.g. Label) render blank/crash without cssVariables
// enabled here the same way the real app enables it.
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
    // Default every story to the app's real handlers/seed data so pages that
    // fetch on mount just work. Stories can override per-story via
    // `parameters.msw.handlers` to exercise empty/error states.
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
