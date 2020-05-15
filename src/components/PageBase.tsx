import * as React from "react";
import Paper from "@material-ui/core/Paper";
import Divider from "@material-ui/core/Divider";
import { grey } from "@material-ui/core/colors";

const grey600 = grey["600"];


const styles={
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
  }
}

interface PageBaseProps  {
  title: string,
  navigation: string,
  children: React.ReactChild
};



const PageBase: React.FC<PageBaseProps> = ({ title, navigation, children }) => {
// const PageBase = props => {
  // const { title, navigation } = props;

  return (
    <div>
      <span style={styles.navigation}>{navigation}</span>

      <Paper style={styles.paper}>
        <h3 style={styles.title}>{title}</h3>

        <Divider />
        {children}

        {/* <div style={globalStyles.clear} /> */}
      </Paper>
    </div>
  );
};

export default PageBase;
