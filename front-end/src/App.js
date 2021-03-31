import React from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import Title from "./components/title";
import Home from "./components/home";
import { AppBar } from "@material-ui/core";
import Login from "./components/login";
import Logout from "./components/logout";
import SignUp from './components/signup'
import "bootstrap/dist/css/bootstrap.css";
import "./App.css";
import PrivateRoute from "./components/PrivateRoute";
import UserRecipes from './components/userRecipes'


function App() {
  return (
    <Router>
      <div className="parallax-bg jumbotron" style={{ minHeight: "100vh" }}>
        <div className="d-flex bg-light header flex-column justify-content-center"style={{textAlign: 'center'}}>
          <h1 style={{ fontSize: "5vw" }}>GRUBSPACE</h1>
          <h3>Find your next favorite dish today!</h3>
          <h5 style={{ color: "white" }}>
            Choose from over 5000 delicious recipes
          </h5>
        </div>
        <div className="container d-flex justify-content-center flex-column">
          <AppBar
            className="d-flex justify-content-center flex-row"
            color="inherit"
            position='sticky'
            style={{
              marginBottom: '10vh'
            }}
          >
            <Link to="home">Home</Link>
            <Link to="recipes">The Vault</Link>
            <Link to="login">Sign Up/ Login</Link>
            <Link to="logout">Logout</Link>
            <Link to="user_recipes">Recipe Box</Link>
          </AppBar>
          <Switch>
            <Route path="/home" component={Home} />
            <Route path="/recipes" component={Title} />
            <Route path="/login" component={Login} />
            <Route path="/logout" component={Logout} />
            <Route path='/signup' component={SignUp}/>
            <PrivateRoute exact path="/user_recipes" component={UserRecipes} />
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
