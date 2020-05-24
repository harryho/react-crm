import React from 'react';

import { storiesOf } from '@storybook/react';

import { linkTo } from '@storybook/addon-links';
import AppNavBar from '../components/AppNavBar';
import { Welcome } from '@storybook/react/demo';
import { withConsole } from '@storybook/addon-console';

storiesOf('Welcome', module).add('AppNavBar', () => <Welcome showApp={linkTo('AppNavBar')} />);

storiesOf('AppNavBar', module)
  .addDecorator((storyFn, context) => withConsole()(storyFn)(context))
  .add(
    'with styles',
    () => (
      <AppNavBar
        styles={'appStlyes'}
        handleDrawerToggle={() => {
          console.log(`handleDrawerToggle |-> handleDrawerToggle`);
        }}
      />
    ),
    {
      appStlyes: {
        appBar: {
          position: 'fixed',
          top: 0,
          maxHeight: 58,
          minHeight: 0,
          width: `100%`,
          marginLeft: 0,
        },
      },
    }
  );
