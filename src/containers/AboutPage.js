import React from "react";

class AboutPage extends React.Component {

  render() {
    const styles = {
      about: {
        display: "grid",
        justifyContent: "center",
      },
      title: {
        paddingTop: "50px",
        paddingBottom: "30px",
        textAlign: "center",
        fontSize: "36px"
      },
      version: {
        fontSize: "24px"
      }
    }
    return (
      <div style={styles.about}>
        <div style={styles.title}><b>About</b></div>

        <div style={styles.version}>React CRM Version 1.2.0</div>
      </div>
    );
  }
}

export default AboutPage;
