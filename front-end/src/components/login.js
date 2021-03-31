import React, { useState, useContext, useEffect } from "react";
import { Button, LinearProgress, TextField } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../utils/Auth";
import { userLogin } from "../actions/login";
import signUpSchema from "./signUpSchema";
import loginSchema from "./loginSchema";
import initialFormErrors from "../initialStates/initialFormErrors";
import "bootstrap/dist/css/bootstrap.css";
import * as yup from "yup";

const Login = () => {
  const history = useHistory();

  //const { dispatch } = useContext(AuthContext);

  const initialState = {
    username: "",
    password: "",
    email: "",
  };

  const [user, setUser] = useState(initialState);
  const [login, setLogin] = useState(true);
  const [formErrors, setErrors] = useState(initialFormErrors);
  const [fetching, setFetching] = useState(false)
  const [disabled, setDisabled] = useState(true);
  const [backendError, setBackendError] = useState()


  const validateChange = (e) => {
    e.persist();
    if (login) {
      console.log(loginSchema, "login");
      yup
        .reach(loginSchema, e.target.name)
        .validate(e.target.name)
        .then((valid) => {
          console.log(valid);
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
      console.log(signUpSchema, "signup");
      yup
        .reach(signUpSchema, e.target.name)

        .validate(e.target.name)
        .then((valid) => {
          console.log(valid);
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
  };

  useEffect(() => {
    loginSchema.isValid(user).then((valid) => setDisabled(!valid));
  }, [user]);

  const onSubmit = async (e) => {
    e.preventDefault();

    setFetching(true);
    if (login) {
      axios
        .post("https://secret-family-recipes-101.herokuapp.com/api/users/login", user)
        .then(({ data }) => {
          //dispatch(userLogin(data));
          setUser(initialState);
          alert(
            "Welcome to your personal recipe box. Manage your recipes using the form below to get started"
          );
          history.push("/user_recipes");
          setFetching(false);
        })
        .catch((err) => {
          alert('Please Provide a Valid Username, and Password Combination or Start A New Account By Clicking The Sign-up Button')
          const backError = err.response.data.message;
          setBackendError(backError)
          console.log(backError, "sign in error from the api");
        });
    } else {
      axios
        .post(
          "https://secret-family-recipes-101.herokuapp.com/api/users/register",
          user
        )
        .then(({ data }) => {
          //dispatch(userLogin(data));
          setLogin(!login);
          history.push("/dashboard");
          setFetching(false);
        })
        .catch((err) => {
          alert('Please Provide a Valid Username, Email, and Password (6-15 characters long) to Create an Account')
          const backError = err.response.data.message;
          setBackendError(backError)
          console.log(backError, "sign in error from the api");
        });
    }
  };



  return (
    <>
      <form className='flexible-stretch-boxes' onSubmit={onSubmit}>
        <h2>{login ? "Log in" : "Sign Up"}</h2>
        <TextField
          type="text"
          name="username"
          value={user.username}
          onChange={handleChange}
          variant="outlined"
          label="username"
          margin="dense"
        />
        {!login ? (
          <TextField
            name="email"
            type="email"
            value={user.email}
            onChange={handleChange}
            variant="outlined"
            label="email"
            margin="dense"
          />
        ) : (
          <></>
        )}
        <TextField
          name="password"
          type="password"
          value={user.password}
          onChange={handleChange}
          variant="outlined"
          label="password"
          margin="dense"
        />
        <h6 style={{textAlign: 'center', color: 'red'}}>{backendError}</h6>
        <Button
          disabled={disabled}
          type="submit"
          variant="contained"
          style={{ color: "white" }}
        >
          {login ? "Sign Up" : "Log In"}
        </Button>
        {fetching ? <LinearProgress color="secondary" /> : <></>} 
        <Button
        size="small"
        variant="contained"
        onClick={() => setLogin(!login)}
      >
        {login ? "Sign Up" : "Log In"}
      </Button>
      </form>
     
    </>
  );
  
}

export default Login;
