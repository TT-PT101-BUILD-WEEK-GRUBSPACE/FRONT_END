import React from "react";
import axios from "axios";
import { Button, TextField } from "@material-ui/core";

class Login extends React.Component {
  state = {
    credentials: {
      username: "",
      password: "",
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
        this.props.history.push("/protected");
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
        </form>
      </div>
    );
  }
}

export default Login;
