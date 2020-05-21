import React from 'react';

import { storiesOf } from '@storybook/react';

import { linkTo } from '@storybook/addon-links';
import { Welcome } from '@storybook/react/demo';
import AppUserMenu from '../components/AppUserMenu';

storiesOf('Welcome', module).add('AppUserMenu', () => <Welcome showApp={linkTo('AppUserMenu')} />);

storiesOf('AppUserMenu', module).add(
  'with user name ',
  () => (
    <AppUserMenu
      username={"test user"}
      onLogoutClick={()=>{console.log(` onLogoutClick |-> ${!this.props.navDrawerOpen}`)}}
    />
  ),
  {
    drawer: {
      width: '100%',
    },
    username: 'test user',
  }
);
