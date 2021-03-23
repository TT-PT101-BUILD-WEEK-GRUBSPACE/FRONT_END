import React from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import Title from "./components/title";
import Recipes from "./components/recipes";
import Home from './components/home'
import { AppBar } from '@material-ui/core'
import Login from './components/login'
import Logout from './components/logout'
import "bootstrap/dist/css/bootstrap.css";
import "./App.css";
import PrivateRoute from "./components/PrivateRoute";
import UserRecipes from './components/userRecipes';

function App() {
  return (
    <Router>
      <div className="parallax-bg jumbotron" style={{ minHeight: "100vh" }}>
      <div className="d-flex bg-light header flex-column justify-content-center">
        <h1 style={{ fontSize: "20vh" }}>GRUBSPACE</h1>
        <h3>Find your next favorite dish today!</h3>
        <h5 style={{color: 'white'}}>Choose from over 5000 delicious recipes</h5>
      </div>
        <div className="container d-flex justify-content-center flex-column">
      
          <Link to='home'>Home</Link>
          <Link to='recipes'>Recipes</Link>
          <Link to='login'>Login</Link>
          <Link to='logout'>Logout</Link>
          <Link to='user_recipes'>Your Recipes</Link>

          <Switch>
            <Route path='/home' component={Home}/>
            <Route path='/recipes' component={Title}/>
            <Route path='/login' component={Login} />
            <Route path='/logout' component={Logout} />
            <PrivateRoute exact path='/user_recipes' component={UserRecipes} />

          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
