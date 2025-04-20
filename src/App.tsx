import * as React from 'react';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import Inventory2Icon from '@mui/icons-material/Inventory2';
import NewspaperIcon from '@mui/icons-material/Newspaper';
import ContactsIcon from '@mui/icons-material/Contacts';
import { Outlet, useNavigate } from 'react-router-dom';
import { AppProvider } from '@toolpad/core/react-router-dom';
import { createTheme } from '@mui/material/styles';
import logoMidPng from './assets/it-logo-mid.png';
import { Session, type Navigation } from '@toolpad/core/AppProvider';
import { SessionContext } from './SessionContext';
import * as agentService from "./services/agentService";
import * as productService from "./services/productService";
import * as customerService from "./services/customerService";
import * as orderService from "./services/orderService";

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
    segment: 'customers',
    title: 'Customers',
    icon: <ContactsIcon />,
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
  title: 'React Demo V6',
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
customerService.init();
productService.init();
orderService.init();


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
      <AppProvider theme={theme}
        navigation={NAVIGATION}
        branding={BRANDING}
        session={session}
        authentication={{ signIn, signOut }}
      >
        <Outlet />
      </AppProvider>
    </SessionContext.Provider>
  );
}
