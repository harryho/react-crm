import * as React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';
import { RoundedButton } from '../components/RoundedButton';
import { Welcome } from '@storybook/react/demo';
// import Welcome from '@storybook/react';

storiesOf('Welcome', module).add('RoundedButton', () => <Welcome showApp={linkTo('RoundedButton')} />);

storiesOf('RoundedButton', module)
  .add(
    'with text',
    () => (
      <RoundedButton color="hotpink" onClick={action('clicked')}>
        Hello Button
      </RoundedButton>
    ),
    { info: { inline: true } }
  )
  .add(
    'with some emoji',
    () => (
      <RoundedButton color="papayawhip" onClick={action('clicked')}>
        <span role="img" aria-label="so cool">
          😀 😎 👍 💯
        </span>
      </RoundedButton>
    ),
    { info: { 
      text: 
      `
        RoundButton with emojies

        ~~~js  
        <RoundedButton color="papayawhip" onClick={action('clicked')}>
        <span role="img" aria-label="so cool">
          😀 😎 👍 💯
        </span>
        </RoundedButton>
        ~~~
      `
    } }
  );
