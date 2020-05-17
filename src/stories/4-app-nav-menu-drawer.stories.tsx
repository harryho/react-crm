import React from 'react';

import { storiesOf } from '@storybook/react';

import { linkTo } from '@storybook/addon-links';
import { Welcome } from '@storybook/react/demo';
import AppNavMenu from '../components/AppNavMenu';

storiesOf('Welcome', module).add('AppNavMenu', () => <Welcome showApp={linkTo('AppNavMenu')} />);

storiesOf('AppNavMenu', module).add(
  'with user name ',
  () => (
    <AppNavMenu
      drawerStyle={"drawer"}
      navDrawerOpen={true}
      username={'username'}
      onLogoutClick={()=>{console.log(` onLogoutClick |-> ${!this.props.navDrawerOpen}`)}}
      handleDrawerToggle={()=>{console.log(`onLogoutClick |-> ${!this.props.navDrawerOpen}`)}}
      isSmallScreem={false}
    />
  ),
  {
    drawer: {
      width: '100%',
    },
    username: 'test user',
  }
);
