import React, { useState, useEffect } from "react";
import { Button, LinearProgress, TextField } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import axios from "axios";
import signUpSchema from "./signUpSchema";
import loginSchema from "./loginSchema";
import initialState from "../initialStates/initialCredentials";
import initialFormErrors from "../initialStates/initialFormErrors";
import "bootstrap/dist/css/bootstrap.css";
import * as yup from "yup";

const Login = () => {
  const history = useHistory();

  const [login, setLogin] = useState(true);
  const [user, setUser] = useState(initialState);
  const [formErrors, setErrors] = useState(initialFormErrors);
  const [fetching, setFetching] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [backendError, setBackendError] = useState();

  const validateChange = (e) => {
    e.persist();
    if (login) {
      //console.log(loginSchema, "login");
      yup
        .reach(loginSchema, e.target.name)
        .validate(e.target.name)
        .then((valid) => {
          //console.log(valid);
          setErrors({
            ...formErrors,
            [e.target.name]: "",
          });
        })
        .catch((error) => {
          setErrors({ ...formErrors, [e.target.name]: error.errors[0] });
          console.log({ error });
        });
    } else {
      // console.log(signUpSchema, "signup");
      yup
        .reach(signUpSchema, e.target.name)

        .validate(e.target.name)
        .then((valid) => {
          //console.log(valid);
          setErrors({
            ...formErrors,
            [e.target.name]: "",
          });
        })
        .catch((error) => {
          setErrors({ ...formErrors, [e.target.name]: error.errors[0] });
          console.log({ error });
        });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    validateChange(e);
    setUser((user) => ({
      ...user,
      [name]: value,
    }));
    console.log("name:", name, "value:", value);
  };

  useEffect(() => {
    loginSchema.isValid(user).then((valid) => setDisabled(!valid));
  }, [user]);

  const onSubmit = async (e) => {
    e.preventDefault();

    setFetching(true);
    if (login) {
      console.log(user);
      axios
        .post(
          "https://secret-family-recipes-101.herokuapp.com/api/users/login",
          user
        )
        .then((res) => {
          localStorage.setItem("token", res.data.payload);
          setUser(initialState);
          alert(
            "Welcome to your personal recipe box. Manage your recipes using the form below to get started"
          );
          history.push("/user_recipes");
          setFetching(false);
          const token = localStorage.getItem("token");
          console.log(token);
        })
        .catch((err) => {
          console.log("error", err);
          alert(
            "Please Provide a Valid Username, and Password Combination or Start A New Account By Clicking The Sign-up Button"
          );
          const backError = err.response.data.message;
          setBackendError(backError);
          console.log(backError, "sign in error from the api");
        });
    } else {
      console.log(user);
      axios
        .post(
          "https://secret-family-recipes-101.herokuapp.com/api/users/register",
          initialState
        )
        .then(({ res }) => {
          //dispatch(userLogin(data));
          console.log("Resolved Token Value", res.data.payload);
          localStorage.setItem("authToken", res.data.payload);
          setLogin(login);
          history.push("/user_recipes");
          setFetching(false);
        })
        .catch((err) => {
          alert(
            "Please Provide a Valid Username, Email, and Password (6-15 characters long) to Create an Account"
          );
          const backError = err.response.data.message;
          setBackendError(backError);
          console.log(backError, "sign in error from the api");
        });
    }
  };

  return (
    <>
      <form
        className="login d-flex justify-content center flex-column align-items-center"
        onSubmit={onSubmit}
      >
        <div
          className="d-flex flex-column justify-content-center align-items-center"
          style={{ margin: "auto", padding: "10vh 10vw" }}
        >
          <h2
            className="display-4"
            style={{ color: "black", textShadow: "0 0 1.5rem black" }}
          >
            {login ? "Log in" : "Sign Up"}
          </h2>
          <TextField
            type="text"
            name="user_username"
            value={user.user_username}
            onChange={handleChange}
            variant="outlined"
            label="username"
            margin="dense"
            style={{
              backgroundColor: "#AAA",
            }}
          />
          {!login ? (
            <TextField
              name="user_email"
              type="email"
              value={user.user_email}
              onChange={handleChange}
              variant="outlined"
              label="email"
              margin="dense"
              style={{
                backgroundColor: "#AAA",
              }}
            />
          ) : (
            <></>
          )}
          <TextField
            name="user_password"
            type="text"
            value={user.user_password}
            onChange={handleChange}
            variant="outlined"
            label="password"
            margin="dense"
            style={{
              backgroundColor: "#AAA",
            }}
          />
          <h6 style={{ textAlign: "center", color: "red" }}>{backendError}</h6>
          <Button
            disabled={disabled}
            type="submit"
            variant="contained"
            style={{ margin: "3vh auto", boxShadow: "0 0 2vh black" }}
            className="btn btn-one"
          >
            {login ? "Login" : "Sign Up"}
          </Button>
          {fetching ? <LinearProgress color="secondary" /> : <></>}
          <Button
            size="small"
            variant="contained"
            onClick={() => setLogin(!login)}
            className="btn btn-one"
            style={{ boxShadow: "0 0 2vh black" }}
          >
            {login ? "Sign Up" : "Log In"}
          </Button>
        </div>
      </form>
    </>
  );
};

export default Login;
