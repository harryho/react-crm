import React from "react";
import Paper from "@material-ui/core/Paper";
import { common, grey } from '@material-ui/core/colors';


const white = common.white;
const grey800 = grey['800'];

interface InfoBoxProps  {
  Icon?: any, // eslint-disable-line
  spanBgColor: string,
  title: string,
  value: string
};

const InfoBox = (props:InfoBoxProps) =>{
    const { spanBgColor, title, value, Icon } = props;

    const styles = {
      content: {
        padding: "5px 10px",
        marginLeft: 90,
        height: 80
      },
      number: {
        display: "block",
        fontWeight: 500, 
        fontSize: 18,
        color: grey800
      },
      text: {
        fontSize: 20,
        fontWeight:500, 
        color: grey800
      },
      iconSpan: {
        float: "left" as TODO,
        height: 90,
        width: 90,
        textAlign: "center" as TODO,
        backgroundColor: spanBgColor as TODO
      },
      icon: {
        height: 48,
        width: 48,
        marginTop: 20,
        maxWidth: "100%",
        color: white
      }
    };

    return (
      <Paper>
        <span style={styles.iconSpan}>
          <Icon  style={styles.icon}  />
        </span>

        <div style={styles.content}>
          <span style={styles.text}>{title}</span>
          <span style={styles.number}>{value}</span>
        </div>
      </Paper>
    );
  // }
}

export default InfoBox;
