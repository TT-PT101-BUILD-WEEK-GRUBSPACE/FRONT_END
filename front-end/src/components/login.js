import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Button, TextField } from "@material-ui/core";

class Login extends React.Component {
  state = {
    credentials: {
      username: "",
      password: "",
      email: "",
    },
  };

  handleChange = (e) => {
    //console.log("handle change is working", e);
    this.setState({
      credentials: {
        ...this.state.credentials,
        [e.target.name]: e.target.value,
      },
    });
  };

  login = (e) => {
    //console.log("login fired", e);
    e.preventDefault();
    axios
      .post("http://localhost:5000/api/login", this.state.credentials)
      .then((res) => {
        //console.log("Resolved Token Value", res.data.payload);
        localStorage.setItem("authToken", res.data.payload);
        // redirect to logged in homepage
        alert(
          "Welcome to your personal recipe box. Manage your recipes using the form below to get started"
        );
        this.props.history.push("/user_recipes");
      })
      .catch((err) => console.log(err));
  };

  render() {
    return (
      <div className="content" style={{ textAlign: "right" }}>
        <form
          onSubmit={this.login}
          className="d-flex justify-content-start flex-column"
          style={{ maxWidth: "30vw", textAlign: "center" }}
        >
          <h5>- L O G I N -</h5>
          <TextField
            type="text"
            name="username"
            value={this.state.credentials.username}
            onChange={this.handleChange}
            variant="outlined"
            label="Username"
            margin="dense"
            color="primary"
            style={{ backgroundColor: "white" }}
          />
          <TextField
            type="password"
            name="password"
            value={this.state.credentials.password}
            onChange={this.handleChange}
            variant="outlined"
            label="Password"
            margin="dense"
            color="primary"
            style={{ backgroundColor: "white" }}
          />
          <Button
            onClick={this.login}
            style={{ color: "white", border: ".5px solid white" }}
          >
            Login
          </Button>
          <Link to="signup">
            <em style={{ color: "white" }}>New User?</em>
          </Link>
        </form>
      </div>
    );
  }
}

export default Login;
