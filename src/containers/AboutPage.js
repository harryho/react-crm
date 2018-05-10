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
      },
      desc: {
        fontSize: "18px"
      }
    }
    return (
      <div style={styles.about}>
        <div style={styles.title}><b>About</b></div>

        <div style={styles.version}>React CRM App Demo</div>

        <div style={styles.desc}>
          <p>This demo app does not have fake API as back-end service. Its advanced search doesn't work properly. Any data update will not be stored after hard refresh or logout.
           </p>
        </div>
      </div>
    );
  }
}

export default AboutPage;
