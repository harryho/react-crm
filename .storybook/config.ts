import { configure } from '@storybook/react';
import { addDecorator } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import requireContext from 'require-context.macro';

// Globally in your .storybook/config.js, or alternatively, per-chapter
addDecorator(
  withInfo({
    styles: {
      header: {
        h1: {
          marginRight: '20px',
          fontSize: '25px',
          display: 'inline',
        },
        body: {
          paddingTop: 0,
          paddingBottom: 0,
        },
        h2: {
          display: 'inline',
          color: '#999',
        },
      },
      infoBody: {
        backgroundColor: '#eee',
        padding: '0px 5px',
        lineHeight: '2',
      },
    },
    inline: true,
    source: false,
  })
);
// automatically import all files ending in *.stories.tsx
configure(requireContext('../src', true, /\.stories\.tsx?$/), module)
// configure(equire.context'../src', true, /\.stories\.tsx?$/), module)

