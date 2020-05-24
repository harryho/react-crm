import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@material-ui/core";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";

const NotFoundPage = () => {
  console.log('NotFoundPage')
  return (
    <div>
      <div style={{ paddingTop: 200, margin: "auto", width: "50%" }}>
        <h1> Page Not Found</h1>
        <br />

        <Link to="/dashboard">
          <Button variant="contained" color="primary">
            <ArrowBackIosIcon /> Home{" "}
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
