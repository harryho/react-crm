import React from "react";
import Paper from "@material-ui/core/Paper";

import { BarChart, Bar, ResponsiveContainer, XAxis } from "recharts";

import { common, pink } from "@material-ui/core/colors";


const white = common.white;
const pink600 = pink["600"];
const pink500 = pink["500"];


interface MonthlySalesProps {
  data: TODO;
}

const MonthlySales = (props: MonthlySalesProps) => {
  const styles = {
    paper: {
      backgroundColor: pink600,
      height: 150,
    },
    div: {
      marginLeft: "auto",
      marginRight: "auto",
      width: "95%",
      height: 85,
    },
    header: {
      color: white,
      backgroundColor: pink500,
      padding: 10,
    },
    title: {
      fontSize: 24,
      fontWeight: 500, //  TypographyStyle.fontWeightLight,
      marginBottom: 20,
    },
  };

  return (
    <Paper style={styles.paper}>
      <div style={{ ...styles.title, ...styles.header }}>
        Monthly Sales
      </div>
      <div style={styles.div}>
        <ResponsiveContainer>
          <BarChart data={props.data}>
            <Bar dataKey="uv" fill={pink500} />
            <XAxis dataKey="name" stroke="none" tick={{ fill: white }} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Paper>
  );
};

export default MonthlySales;
