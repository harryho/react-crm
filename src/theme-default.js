import {createMuiTheme} from '@material-ui/core/styles';
import { blue, grey } from '@material-ui/core/colors';

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




export default themeDefault;