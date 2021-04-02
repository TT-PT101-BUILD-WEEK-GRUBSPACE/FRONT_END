import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Button, TextField } from "@material-ui/core";

class SignUp extends React.Component {
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

  signUp = (e) => {
    console.log("login fired", e);
    e.preventDefault();
    axios
      .post(
        "https://secret-family-recipes-101.herokuapp.com/api/users/register",
        this.state.credentials
      )
      .then((res) => {
        console.log("Resolved Token Value", res.data.payload);
        localStorage.setItem("authToken", res.data.payload);
        //redirect to logged in homepage
        this.props.history.push("/protected");
      })
      .catch((err) => console.log(err));
  };

  render() {
    return (
      <div className="content" style={{ textAlign: "right" }}>
        <form
          onSubmit={this.signUp}
          className="d-flex justify-content-start flex-column"
          style={{ maxWidth: "30vw", textAlign: "center", color: "black" }}
        >
          <h5 style={{ marginBottom: "3vh" }}>
            Start your culinary odyssey today!
            <br />
            Sign up now
          </h5>
          <h5>- SIGN UP -</h5>
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
          <TextField
            type="email"
            name="email"
            value={this.state.credentials.email}
            onChange={this.handleChange}
            variant="outlined"
            label="Email"
            margin="dense"
            color="primary"
            style={{ backgroundColor: "white" }}
          />
          <Button
            onClick={this.signUp}
            style={{ color: "white", border: ".5px solid white" }}
          >
            Login
          </Button>
          <Link to="login">
            <em style={{ color: "black" }}>
              Already have an account? Click Here.
            </em>
          </Link>
        </form>
      </div>
    );
  }
}

export default SignUp;
