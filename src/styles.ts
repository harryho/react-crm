// import { TypographyStyle } from "@material-ui/core/styles";
import { grey } from "@material-ui/core/colors";
import { fontFamily } from "@material-ui/system";
import {
  createMuiTheme,
  withStyles,
  createStyles,
  Theme,
  WithStyles,
  StyleRules,
} from "@material-ui/core/styles";
const grey600 = grey["600"];

// const styles = {
//   navigation: {
//     fontSize: 15,
//     // fontWeight: TypographyStyle.fontWeightLight,
//     color: grey600,
//     paddingBottom: 15,
//     display: "block"
//   },
//   title: {
//     fontSize: 24,
//     // fontWeight: TypographyStyle.fontWeightLight,
//     marginBottom: 20
//   },
//   paper: {
//     padding: 30
//   },
//   clear: {
//     clear: "both" as TODO
//   }
// };

const styles: (theme: Theme) => StyleRules<string> = (theme) =>
  createStyles({
    root: {},
    app: {
      textAlign: "center",
    },
    appLogo: {
      height: "40vmin",
      pointerEvents: "none",
      "@media (prefers-reduced-motion: no-preference) ": {
        animation: "App-logo-float infinite 3s ease-in-out",
      },
    },
    appHeader: {
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "calc(10px + 2vmin)",
    },
    appLink: {
      color: "rgb(112, 76, 182)",
    },
    navigation: {
      fontSize: 15,
      // fontWeight: TypographyStyle.fontWeightLight,
      color: grey600,
      paddingBottom: 15,
      display: "block",
    },
    title: {
      fontSize: 24,
      // fontWeight: TypographyStyle.fontWeightLight,
      marginBottom: 20,
    },
    paper: {
      padding: 30,
    },
    clear: {
      clear: "both" as TODO,
    },
  });

export default styles;
