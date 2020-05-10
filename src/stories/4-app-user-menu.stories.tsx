import React from 'react';

import { storiesOf } from '@storybook/react';

import { linkTo } from '@storybook/addon-links';
import { Welcome } from '@storybook/react/demo';
import AppUserMenu from '../components/AppUserMenu';

const reactTransitionGroup = jest.requireActual('react-transition-group');
reactTransitionGroup.CSSTransition = ({ children }) => {
  return <>
    {children}
  </>;
};

jest.setMock('react-transition-group', reactTransitionGroup);

storiesOf('Welcome', module).add('AppUserMenu', () => <Welcome showApp={linkTo('AppUserMenu')} />);

storiesOf('AppUserMenu', module)
// .addDecorator(getStory => <Provider store={store}>{getStory()}</Provider>)
// .addDecorator(getStory => <MemoryRouter>{getStory()}</MemoryRouter>)
.add(
  'with user name ',
  () => (
    <AppUserMenu 
     
      username={"test user"}
      // onLogoutClick={()=>{console.log(` onLogoutClick |-> ${!this.props.navDrawerOpen}`)}}
      onLogoutClick={()=>{}}
    
    />
  )
);
