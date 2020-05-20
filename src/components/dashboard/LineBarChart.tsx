import React from "react";
import {
  ResponsiveContainer,
  ComposedChart,
  Line,
  Area,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import Paper from "@material-ui/core/Paper";

interface LineBarChartProps {
  data: TODO;
}

const LineBarChart = (props: LineBarChartProps) => {
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
      <span style={styles.title}>Website Analysis</span>

      <div style={styles.clear} />

      <div className="row">
        <div className="col-xs-12">
          <div style={styles.pieChartDiv}>
            <ResponsiveContainer>
              <ComposedChart
                layout="vertical"
                width={600}
                height={320}
                data={props.data}
                margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
              >
                <XAxis type="number" />
                <YAxis dataKey="name" type="category" />
                <Tooltip />
                <Legend />
                <CartesianGrid stroke="#f5f5f5" />
                <Area dataKey="amt" fill="#8884d8" stroke="#8884d8" />
                <Bar dataKey="pv" barSize={20} fill="#413ea0" />
                <Line dataKey="uv" stroke="#ff7300" />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </Paper>
  );
};

export default LineBarChart;
