import React from "react";
import Paper from "@material-ui/core/Paper";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import Avatar from "@material-ui/core/Avatar";
import List from "@material-ui/core/List/List";
import ListItem from "@material-ui/core/ListItem";
import { ListItemText, ListItemAvatar, Grid } from "@material-ui/core";

interface BrowserUsageProps {
  data: TODO;
}

const BrowserUsage = (props: BrowserUsageProps) => {
  const styles = {
    paper: {
      minHeight: 344,
      padding: 10,
    },
    legend: {
      paddingTop: 20,
    },
    pieChartDiv: {
      height: 290,
      textAlign: "center" as TODO,
    },
    title: {
      fontSize: 24,
      fontWeight: 500, //  TypographyStyle.fontWeightLight,
      marginBottom: 20,
    },
    clear: {
      clear: "both" as TODO,
    },
  };

  return (
    <Paper style={styles.paper}>
      <span style={styles.title}>Browser Usage</span>
      <div style={styles.clear} />

      <Grid container spacing={2}>
        <Grid item xs={12} md={8}>
          <div style={styles.pieChartDiv}>
            <ResponsiveContainer>
              <PieChart>
                <Pie
                  innerRadius={80}
                  outerRadius={130}
                  data={props.data}
                  dataKey="value"
                  fill="#8884d8"
                >
                  {props.data.map((item) => (
                    <Cell key={item.name} fill={item.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
          {/* 
        </div> */}
        </Grid>
        <Grid item xs={12} md={4}>
          {/* <div className="col-xs-12 col-sm-4 col-md-4 col-lg-4"> */}
          <div style={styles.legend}>
            <div style={styles.legend}>
              <List>
                {props.data.map((item, index) => (
                  <ListItem
                    key={item.name}
                  >
                    <ListItemAvatar>
                      <Avatar style={{ backgroundColor: item.color }}>
                        {item.icon}
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText id={"brower" + index} primary={item.name} />
                  </ListItem>
                ))}
              </List>
            </div>
          </div>
        </Grid>
      </Grid>
    </Paper>
  );
};


export default BrowserUsage;
