import React from "react";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import Select from "@material-ui/core/Select";
import Switch from "@material-ui/core/Switch";
// import DatePicker from "@material-ui/core/DatePicker";

import Divider from "@material-ui/core/Divider";
import PageBase from "../components/PageBase";
import { grey } from '@material-ui/core/colors';

const grey400 = grey['400'];
// const FormPage = () => {
  const styles = {
    toggleDiv: {
      maxWidth: 300,
      marginTop: 40,
      marginBottom: 5
    },
    toggleLabel: {
      color: grey400,
      fontWeight: 100
    },
    buttons: {
      marginTop: 30,
      float: "right" as TODO
    },
    saveButton: {
      marginLeft: 5
    }
  };

const FormPage:React.FC=()=> {
  return (
    <PageBase title="Form Page" navigation="Application / Form Page">
      <form>
        <TextField
        //  placeholder="Name" 
        //  label="Name" 
         fullWidth={true} />

        {/* <Select
         label="City"
          value="" fullWidth={true}>
          <MenuItem key={0} primaryText="London" />
          <MenuItem key={1} primaryText="Paris" />
          <MenuItem key={2} primaryText="Rome" />
        </Select> */}

        {/* <DatePicker
          placeholder="Expiration Date"
          label="Expiration Date"
          fullWidth={true}
        /> */}

        <div style={styles.toggleDiv}>
          <Switch 
          // label="Disabled" 
          // labelStyle={styles.toggleLabel}
           />
        </div>

        <Divider />

        <div style={styles.buttons}>
          <Link to="/">
            {/* <Button variant="contained" label="Cancel" /> */}
          </Link>

          {/* <Button variant="contained"
            label="Save"
            style={styles.saveButton}
            type="submit"
            primary={true}
          /> */}
        </div>
      </form>
    </PageBase>
  );
};

export default FormPage;
