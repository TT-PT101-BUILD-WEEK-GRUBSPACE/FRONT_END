import React from "react";
import { connect } from "react-redux";
import { getRecipes } from "../state/actionCreators";
import { makeStyles } from "@material-ui/core/styles";
import LinearProgress from "@material-ui/core/LinearProgress";

const baseUri = "https://spoonacular.com/recipeImages/";

const Recipe = (props) => {
  const data = props.recipe;

  const useStyles = makeStyles((theme) => ({
    root: {
      maxWidth: "50vw",
      alignSelf: "center",
      padding: "3vh 5vw",
      backgroundColor: "#222",
      opacity: "0.9",
      "& > * + *": {
        marginTop: theme.spacing(2),
      },
    },
  }));

  const classes = useStyles();

  if (props.loading) {
    return (
      <div className={classes.root}>
        <h5 style={{ color: "white" }}>
          Your delicious results are on their way...
        </h5>
        <LinearProgress />
      </div>
    );
  }
  return (
    <div className="d-flex container flex-row justify-content-center align-items-lg-center flex-wrap">
      {data &&
        data.map((item, idx) => {
          return (
            <div
              className="d-flex cards flex-column container justify-content-center align-items-lg-center"
              key={idx}
              style={{
                width: "35%",
                margin: "3rem 2rem",
                border: "2px solid black",
                textAlign: "center",
                color: "white",
              }}
            >
              {" "}
              <h3 style={{ margin: "3rem 0", justifySelf: "center" }}>
                <a href={data[idx].sourceUrl} style={{ color: "white" }}>
                  {data[idx].title}
                </a>
              </h3>
              <img
                src={baseUri + data[idx].image}
                alt={data[idx].title}
                style={{
                  maxWidth: "80%",
                  minWidth: "80%",
                  marginBottom: "3rem",
                }}
              />
              <h5>Ready in: {data[idx].readyInMinutes} mins</h5>
              <h5 style={{ marginBottom: "2rem" }}>
                Serves: {data[idx].servings}
              </h5>
            </div>
          );
        })}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    apiStatus:state.api.getRecipes.status,
    error: state.api.getRecipes.errMsg,
    recipes: state.recipes,
  };
};

const mapDispatchToProps = { getRecipes };

export default connect(mapStateToProps, mapDispatchToProps)(Recipe);
