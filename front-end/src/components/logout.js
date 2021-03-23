import React from "react";
import { Link, useHistory } from "react-router-dom";


const Logout = () => {
    let history = useHistory();
    const logout = () => {
      alert("You have been logged out. Thank you for visiting");
      localStorage.clear();
      history.push("/");
    };
  
    return (
      <div
        className="d-flex flex-column justify-content-between align-items-center"
        style={{
          marginTop: "20rem",
          minHeight: "20vh",
          backgroundColor: "#222",
          color: "white",
        }}
      >
        <Link
          onClick={() => logout()}
          style={{
            margin: "5vh 0",
            fontSize: "5vh",
            color: "white",
            textDecoration: "none",
            border: '.05rem solid white',
            padding: '2rem 3rem'
          }}
        >
          <h4>
           - Logout -</h4>
        </Link>

      </div>
    );
  };
  
  export default Logout;