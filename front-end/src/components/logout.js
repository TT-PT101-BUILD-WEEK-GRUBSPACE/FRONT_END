import React from "react";
import { Link, useHistory } from "react-router-dom";
import {connect} from "react-redux";
import { logout } from "../state/actionCreators";
const Logout = (props) => {
  let history = useHistory();
  const logout = () => {
    alert("You have been logged out. Thank you for visiting");
    props.logout();
    history.push("/");
  };

  return (
    <div
      className="d-flex flex-column justify-content-between align-items-center logout"
      style={{
        marginTop: '40vh',
        minHeight: "80vh",
        color: "white",
        textAlign: "center",
        padding: "23vh 3vw",
        opacity: "0.9",
      }}
    >
      <Link
        to="/"
        onClick={() => logout()}
        style={{
          margin: "5vh 0",
          fontSize: "5vh",
          backgroundColor: "#222",
          color: "white",
          textDecoration: "none",
          border: ".05rem solid white",
          padding: "2rem 3rem",
          opacity: "",
        }}
      >
        <h2>Thank you for visiting Grubspace.</h2>
        <h3 style={{ marginTop: "2vh", marginBottom: "5vh" }}>Happy Eating!</h3>
        <h4>- Logout -</h4>
      </Link>
    </div>
  );
};
const mapDispatchToProps={
  logout
};
export default connect(null,mapDispatchToProps)(Logout);
