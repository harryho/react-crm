import React from 'react';	

import { storiesOf } from '@storybook/react';	

import { linkTo } from '@storybook/addon-links';	
import { Welcome } from '@storybook/react/demo';	
import AppUserMenu from '../components/AppUserMenu';	
import { action } from '@storybook/addon-actions';
	

storiesOf('Welcome', module).add('AppUserMenu', () => <Welcome showApp={linkTo('AppUserMenu')} />);	

storiesOf('AppUserMenu', module)	
.add(	
  'with user name ',	
  () => (	
    <AppUserMenu 	
      username={"test user"}	
      onSignoutClick={action('Sign Out click')}
      onChangePassClick={action('Change Password click')}
    />
  )
);