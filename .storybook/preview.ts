import '../src/index.css';
import { initialize, mswLoader } from 'msw-storybook-addon';

initialize();
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
  },
  loaders: [mswLoader],
};

export default preview;
