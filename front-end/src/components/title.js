import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { searchValue, getRecipe } from "../actions";
import Recipes from "./recipes";

const Title = (props) => {
  const [searchValues, setSearchValues] = useState("");

  const handleChanges = (e) => {
    //console.log("1. e.target.value from handleChanges", e.target.value);
    setSearchValues(e.target.value);
  };

  const handleClick = (e) => {
    e.preventDefault();
    props.searchValue(searchValues);
    props.getRecipe(searchValues);
    //console.log(props.getRecipe(searchValues));
    //console.log("4. search value from handle click", searchValues);
  };

  useEffect(() => {
    props.getRecipe(props.searchValue);
  }, [props]);

  return (
    <div
      className="d-flex justify-content-center flex-column"
      style={{ marginTop: "2rem", textAlign: "center" }}
    >
      <div className='d-flex justify-content-center flex-column content'>
        <h1 style={{margin: '5vh 0'}}>Welcome to The Vault powered by Spoontacular</h1>
        <h3>
          Search through Spoontacular's extensive database to find just the
          right flavor's you've been craving. With over 5000 recipes available
          at your fingertips, your friends, families, and loved one's will be
          singing your praises for years to come. 
          <br/>
          <br/>
          Get started now by using the search bar
          below and get ready to salivate!
        </h3>
      </div>
      <h3 style={{marginTop: '3vh'}}>Begin your journey here</h3>
      <form onSubmit={handleClick}>
        <div>
          {" "}
          <input
            name="searchBar"
            type="text"
            placeholder="ex: chocolate, beef, asparagus"
            style={{
              width: "20rem",
              alignSelf: "center",
              backgroundColor: "#444",
              color: "lightblue",
              textAlign: "center",
              fontSize: "1.25rem",
              margin: "3vh",
            }}
            value={searchValues}
            onChange={handleChanges}
          />
          <button
            type="submit"
            onClick={handleClick}
          >
            Click
          </button>
        </div>
      </form>
      <Recipes />
    </div>
  );
};

const mapStateToProps = (state) => {
  getRecipe(state.searchValue);
  console.log("state mapped from title", state);
  return {
    searchValue: state.searchValue,
  };
};

const mapDispatchToProps = {
  searchValue,
  getRecipe,
};

export default connect(mapStateToProps, mapDispatchToProps)(Title);
