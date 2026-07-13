import * as React from 'react';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import Inventory2Icon from '@mui/icons-material/Inventory2';
import WarehouseIcon from '@mui/icons-material/Warehouse';
import NewspaperIcon from '@mui/icons-material/Newspaper';
import ContactsIcon from '@mui/icons-material/Contacts';
import { Outlet, useNavigate } from 'react-router';
import { ReactRouterAppProvider } from '@toolpad/core/react-router';
import { createTheme } from '@mui/material/styles';
import logoMidPng from './assets/it-logo-mid.png';
import { Session, type Navigation } from '@toolpad/core/AppProvider';
import { SessionContext } from './SessionContext';
import * as agentService from "./services/agentService";

const NAVIGATION: Navigation = [
  {
    title: 'Dashboard',
    icon: <DashboardIcon />,
  },
  {
    segment: 'orders',
    title: 'Orders',
    icon: <ShoppingCartIcon />,
  },
  {
    segment: 'products',
    title: 'Products',
    icon: <Inventory2Icon />,
  },
  {
    segment: 'users',
    title: 'Users',
    icon: <ContactsIcon />,
  },
  {
    segment: 'inventory',
    title: 'Inventory',
    icon: <WarehouseIcon />,
  },

  // {
  //   kind: 'divider',

  // },
  {
    kind: 'header',
    title: 'Market & Sales',
    // icon: <StorefrontIcon />,
  },
  {
    kind: 'divider',
  },

  {
    segment: 'blogs',
    title: 'Blogs',
    icon: <NewspaperIcon />,
  },
  {
    segment: 'agents',
    title: 'Agents',
    icon: <PeopleAltIcon />,
  }
];
const logo = <img src={logoMidPng} className="logo" alt="" />
const BRANDING = {
  title: 'React Ecom Demo',
  logo
};

const theme = createTheme({
  cssVariables: {
    colorSchemeSelector: 'data-toolpad-color-scheme',
  },
  colorSchemes: { light: true, dark: true },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 600,
      lg: 1408,
      xl: 1530,
    },
  },
});

agentService.init();


export default function App() {

  const [session, setSession] = React.useState<Session | null>(null);
  const navigate = useNavigate();

  const signIn = React.useCallback(() => {
    navigate('/sign-in');
  }, [navigate]);

  const signOut = React.useCallback(() => {
    // setSession(null);
    navigate('/sign-in');
  }, [navigate]);

  const sessionContextValue = React.useMemo(() => ({ session, setSession }), [session, setSession]);
 


  return (
    <SessionContext.Provider value={sessionContextValue}>
      <ReactRouterAppProvider theme={theme}
        navigation={NAVIGATION}
        branding={BRANDING}
        session={session}
        authentication={{ signIn, signOut }}
      >
        <Outlet />
      </ReactRouterAppProvider>
    </SessionContext.Provider>
  );
}
