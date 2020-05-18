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
// import globalStyles from "../styles";
import Data from "../data";

import { cyan, pink, purple, orange, grey } from "@material-ui/core/colors";

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
    paddingBottom: 15,
    display: "block",
  },
};

const DashboardPage = () => {
  return (
    <div>
      <h3 style={styles.navigation}>Application / Dashboard</h3>

      <div className="row">
        <div className="col-xs-12 col-sm-6 col-md-3 col-lg-3 m-b-15 ">
          <InfoBox
            Icon={ShoppingCart}
            color={pink600}
            title="Total Profit"
            value="1500k"
          />
        </div>

        <div className="col-xs-12 col-sm-6 col-md-3 col-lg-3 m-b-15 ">
          <InfoBox Icon={ThumbUp} color={cyan600} title="Likes" value="4231" />
        </div>

        <div className="col-xs-12 col-sm-6 col-md-3 col-lg-3 m-b-15 ">
          <InfoBox
            Icon={Assessment}
            color={purple600}
            title="Sales"
            value="460"
          />
        </div>

        <div className="col-xs-12 col-sm-6 col-md-3 col-lg-3 m-b-15 ">
          <InfoBox
            Icon={Face}
            color={orange600}
            title="New Members"
            value="248"
          />
        </div>
      </div>

      <div className="row">
        <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6 col-md m-b-15">
          <NewOrders data={Data.dashBoardPage.newOrders} />
        </div>

        <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6 m-b-15">
          <MonthlySales data={Data.dashBoardPage.monthlySales} />
        </div>
      </div>

      <div className="row">
        <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6 m-b-15 ">
          {/*<RecentlyProducts data={Data.dashBoardPage.recentProducts}/>*/}
          <LineBarChart data={Data.dashBoardPage.lineBarChart} />
        </div>

        <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6 m-b-15 ">
          <BrowserUsage data={Data.dashBoardPage.browserUsage} />
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
