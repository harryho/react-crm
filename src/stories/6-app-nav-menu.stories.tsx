import * as React from 'react';

import { storiesOf } from "@storybook/react";

import { linkTo } from "@storybook/addon-links";
import { Welcome } from "@storybook/react/demo";
import AppNavDrawer from "../components/AppNavDrawer";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router";

import configureStore from "../store";
import ReactDOM from 'react-dom';


interface DumpProps {
  name?: string;
  children?: TODO; // & React.React Children
  // story: StoryFnReactReturnType
}

function AppDrawerMenu(props: DumpProps) {
  return(
  <>
    <ul >
      <li> Dump App Menus A</li>
      <li> Dump App Menus B</li>
    </ul>
  </>)
}



const store = configureStore();
storiesOf("Welcome", module).add("AppNavDrawer", () => (
  <Welcome showApp={linkTo("AppNavDrawer")} />
));

storiesOf("AppNavDrawer", module)
  .addDecorator((getStory) => <Provider store={store}>{getStory()}</Provider>)
  .addDecorator((getStory) => <MemoryRouter>{getStory()}</MemoryRouter>)
 .addDecorator((getStory) => <AppDrawerMenu>{getStory()}</AppDrawerMenu>)
  .add(
    "with user menu and nav menus",
    () => (
      <AppNavDrawer
        drawerStyle={"drawer"}
        navDrawerOpen={true}
        username={"username"}
        onLogoutClick={() => {
          // console.log(` onLogoutClick |-> ${!this.props.navDrawerOpen}`);
        }}
        handleDrawerToggle={() => {
          // console.log(`onLogoutClick |-> ${!this.props.navDrawerOpen}`);
        }}
        isSmallScreem={false}
      ></AppNavDrawer>
    )
  );
