import React, { useState, useEffect } from "react";
import { Button, LinearProgress, TextField } from "@material-ui/core";
import { useHistory, Link } from "react-router-dom";
import noAuthAxios from "../utils/axios";
import signUpSchema from "./signUpSchema";
import loginSchema from "./loginSchema";
import initialState from "../initialStates/initialCredentials";
import initialFormErrors from "../initialStates/initialFormErrors";
import "bootstrap/dist/css/bootstrap.css";
import * as yup from "yup";
import { postLogIn, createUser } from "../state/actionCreators";
const Login = (props) => {
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
    //console.log("name:", name, "value:", value);
  };

  useEffect(() => {
    loginSchema.isValid(user).then((valid) => setDisabled(!valid));
  }, [user]);

  const onSubmit = async (e) => {
    e.preventDefault();

    setFetching(true);
    if (login) {
      //console.log(user);
      props.postLogIn(user,(isSuccessful)=>{
        if(isSuccessful){
          setUser(user);
          alert(
            "Welcome to your personal recipe box. Manage your recipes using the form below to get started"
          );
          history.push("/user_recipes");
          setFetching(false);
        }
        else{
          console.log("error", err);
          history.push('/user_recipes')
          const backError = err.data.message;
          setBackendError(backError);
          console.log(backError, "sign in error from the api");
        }
      });

      noAuthAxios()
        .post(
          "/users/login",
          user
        )
    } else {
      props.createUser(user,(isSuccessful)=>{
        if(isSuccessful){
          setLogin(login);
          history.push("/user_recipes");
          setFetching(false);
        }
        else{
          alert(
            "Please Provide a Valid Username, Email, and Password (6-15 characters long) to Create an Account"
          );
          const backError = props.error;
          setBackendError(backError);
          console.log(backError, "sign in error from the api");    
        }
      });
    }
  };

  return (
    <>
      <form
        className="login d-flex justify-content center flex-column align-items-center"
        style={{ minHeight: '60vh', marginTop: '30vh'}}
        onSubmit={onSubmit}
      >
        <div
          className="d-flex flex-column justify-content-center align-items-center"
          style={{ padding: "17vh 10vw" }}
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
            type="password"
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
          <Link
            size="small"
            variant="contained"
            onClick={() => setLogin(!login)}
            style={{color: 'black'}}
          >
           <em> {login ? "New User? Sign Up Today" : "Already have an account? Log In Here"} </em>
          </Link>
        </div>
      </form>
    </>
  );
};
const mapStateToProps = (state) => {
  return {
    numberOfSuccessCalls: state.api.postLogIn,
    status: state.api.postLogIn.status,
    error: state.api.postLogIn.errMsg
  }
}

const mapDispatchToProps = {
  postLogIn,
  createUser
}
export default connect(mapStateToProps, mapDispatchToProps)(Login);
