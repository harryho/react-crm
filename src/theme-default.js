import {createMuiTheme} from '@material-ui/core/styles';
import { blue, grey } from '@material-ui/core/colors';
// import React from 'react';
// import { ThemeProvider, useTheme } from '@material-ui/styles';
// import { unstable_useMediaQuery as useMediaQuery } from '@material-ui/core/useMediaQuery';


const blue600 = blue['600'];
const grey900 = grey['900'];

const themeDefault = createMuiTheme({
  palette: {
  },
  appBar: {
    height: 57,
    color: blue600
  },
  drawer: {
    width: 230,
    color: grey900
  },
  Button: {
    primaryColor: blue600,
  },

});

// themeDefault.breakpoints


export default themeDefault;