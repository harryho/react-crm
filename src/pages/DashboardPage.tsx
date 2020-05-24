import React from "react";
import Assessment from "@material-ui/icons/Assessment";
import Face from "@material-ui/icons/Face";
import ThumbUp from "@material-ui/icons/ThumbUp";
import ShoppingCart from "@material-ui/icons/ShoppingCart";
import InfoBox from "../components/dashboard/InfoBox";
import NewOrders from "../components/dashboard/NewOrders";
import MonthlySales from "../components/dashboard/MonthlySales";
import BrowserUsage from "../components/dashboard/BrowserUsage";
import LineBarChart from "../components/dashboard/LineBarChart";
import Data from "../data";

import { cyan, pink, purple, orange, grey } from "@material-ui/core/colors";
import { Grid } from "@material-ui/core";

const cyan600 = cyan["600"];
const pink600 = pink["600"];
const purple600 = purple["600"];
const orange600 = orange["600"];
const grey600 = grey["600"];

const styles = {
  navigation: {
    fontSize: 15,
    fontWeight: 400, //TypographyStyle.fontWeightLight,
    color: grey600,
    // paddingBottom: 15,
    display: "block",
  },
  container: {
    marginTop: "3em",
  },
  cell: {
    padding: "1em",
  },
  content:{
    paddingTop:60,
    padding:20,
  }
};

const DashboardPage = () => {
  return (
    <div style={styles.content}>
      <Grid container style={styles.container} spacing={3}>
        <Grid item style={styles.cell} xs={12} md={3}>
          <InfoBox
            Icon={ShoppingCart}
            spanBgColor={pink600}
            title="Total Profit"
            value="1500k"
          />
        </Grid>
        <Grid item style={styles.cell} xs={12} md={3}>
          <InfoBox Icon={ThumbUp} spanBgColor={cyan600} title="Likes" value="4231" />
        </Grid>
        <Grid item style={styles.cell} xs={12} md={3}>
          <InfoBox
            Icon={Assessment}
            spanBgColor={purple600}
            title="Sales"
            value="460"
          />
        </Grid>
        <Grid item style={styles.cell} xs={12} md={3}>
          <InfoBox
            Icon={Face}
            spanBgColor={orange600}
            title="New Members"
            value="248"
          />
        </Grid>
        <Grid item style={styles.cell} xs={12} md={6}>
          <NewOrders data={Data.dashBoardPage.newOrders} />
        </Grid>
        <Grid item style={styles.cell} xs={12} md={6}>
          <MonthlySales data={Data.dashBoardPage.monthlySales} />
        </Grid>
        <Grid item style={styles.cell} xs={12} md={6}>
          <LineBarChart data={Data.dashBoardPage.lineBarChart} />
        </Grid>
        <Grid item style={styles.cell} xs={12} md={6}>
          <BrowserUsage data={Data.dashBoardPage.browserUsage} />
        </Grid>
      </Grid>
    </div>
  );
};

export default DashboardPage;
