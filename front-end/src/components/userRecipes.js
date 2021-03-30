import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { recipeFormValues, addRecipe } from "../actions/index";
import { Button, TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { axiosWithAuth } from "../utils/axiosWithAuth";
import RecipeCard from "./recipeCard";

const initialFormState = {
  user_id: "",
  recipe_name: "",
  recipe_source: "",
  image_source: "",
  category: "",
  recipe_description: "",
  ingredients: [],
  instructions: [],
};

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: "50vw",
    alignSelf: "left",
    padding: "3vh 5vw",
    backgroundColor: "#222",
    opacity: "0.9",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
  input: {
    color: "white",
    backgroundColor: "#AAA",
    boxShadow: "0 0 2vh #333"
  },
  button: {
    color: "black",
    backgroundColor: "#FFF",
    margin: "2vh 2vw",
    maxWidth: "10rem",
  },
  outerDiv: {
    marginTop: '10vh',
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'row'
  },
  h4: {
  marginTop: "3vh"
  },
  label: {
    margin: "3vh 0", 
    color: 'white'
  },
  select: {
    backgroundColor: "#444",
    color: "#FFF",
    boxShadow: "0 0 2vh #333",
    margin: '2vh 0'
  },

}));

const UserRecipes = (props) => {
  const classes = useStyles();
  let history = useHistory();
  const [formStateData, setFormStateData] = useState(initialFormState);

  const addIngredientInputs = () => {
    return formStateData.ingredients.map((item, idx) => {
      return (
        <TextField
          value={item}
          key={idx}
          placeholder={`Ingredient ${idx + 1}`}
          onChange={(e) => updateIngredients(e, idx)}
          margin="dense"
 
          className={classes.input}
        />
      );
    });
  };

  const updateIngredients = (e, idx) => {
    const formCopy = { ...formStateData };
    formCopy.ingredients[idx] = e.target.value;
    setFormStateData(formCopy);
  };

  const addIngredient = (e) => {
    e.preventDefault();
    setFormStateData(() => {
      return {
        ...formStateData,
        ingredients: [...formStateData.ingredients, ""],
      };
    });
  };

  const createInstructionsInputs = () => {
    return formStateData.instructions.map((item, idx) => {
      return (
        <TextField
          value={item}
          key={idx}
          placeholder={`Step ${idx + 1}`}
          onChange={(e) => updateInstructions(e, idx)}
          margin="dense"
          className={classes.input}
        />
      );
    });
  };

  const updateInstructions = (e, idx) => {
    const formCopyInstructions = { ...formStateData };
    formCopyInstructions.instructions[idx] = e.target.value;
    setFormStateData(formCopyInstructions);
  };

  const addStep = (e) => {
    e.preventDefault();
    setFormStateData(() => {
      return {
        ...formStateData,
        instructions: [...formStateData.instructions, ""],
      };
    });
  };

  const handleChange = (e) => {
    e.persist();
    const newPopulatedForm = {
      ...formStateData,
      [e.target.name]: e.target.value,
    };
    setFormStateData(newPopulatedForm);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axiosWithAuth.post().then((res) => {
      console.log(res.data);
      setFormStateData(initialFormState);
      history.push("/");
    });
  };

  useEffect(() => {
    props.addRecipe(props.formStateData);
  }, [props]);

  return (
    <div
      className={classes.outerDiv}
      name="outerDivContainer"
    >
      <div
        className="recipe-form"
      >
        <div
          className="flexible-stretch-boxes d-flex justify-content-center flex-column"
          style={{margin: '2vh auto'}}
        >
          <h4 className={classes.h4}>
            Welcome to your recipe box! <br /> <br />
            Add your favorite recipes and get started collecting today.
          </h4>
        </div>
        <form
          className="d-flex align-items-center flex-column flex-wrap form"
          id="recipeForm"
          onSubmit={handleSubmit}
        >
          <TextField
            type="text"
            name="recipe_name"
            id="recipe_name"
            value={formStateData.recipe_name}
            onChange={handleChange}
            label="Recipe Name"
            placeholder="Recipe Name"
            margin="dense"
            variant="outlined"
            className={classes.input}
          />
          <TextField
            type="text"
            name="recipe_description"
            id="recipe_description"
            value={formStateData.recipe_description}
            onChange={handleChange}
            label="Description"
            placeholder="Description"
            margin="dense"

            variant="outlined"
            className={classes.input}
          />
          <TextField
            type="text"
            name="image_source"
            id="image_source"
            value={formStateData.image_source}
            onChange={handleChange}
            label="Image Source"
            placeholder="Image Source"
            margin="dense"

            variant="outlined"
            className={classes.input}
          />
          <TextField
            type="text"
            name="recipe_source"
            id="recipe_source"
            value={formStateData.recipe_source}
            onChange={handleChange}
            label="Recipe Source"
            placeholder="Recipe Name"
            margin="dense"

            variant="outlined"
            className={classes.input}
          />
          <div  
            className="flexible-stretch-boxes d-flex justify-content-center flex-column"
            style={{
            padding: '2vh auto',
            color: 'white',
            fontSize: '3vh',
            margin: "2vh auto",
            }}>
            <label
              htmlFor="category"
            >
              Meal Type
            </label>
          </div>
          <select
            onChange={handleChange}
            value={formStateData.category}
            name="category"
          >
            <option id="">---Select category---</option>
            <option id="">--Meal Period--</option>
            <option id="1">Breakfast</option>
            <option id="2">Lunch</option>
            <option id="3">Dinner</option>
            <option id="4">Desserts</option>
            <option id="">--Dishes--</option>
            <option id="5">Soup</option>
            <option id="6">Salad</option>
            <option id="7">Appetizers</option>
            <option id="8">Main Dishes: Beef</option>
            <option id="9">Main Dishes: Poultry</option>
            <option id="10">Main Dishes: Pork</option>
            <option id="11">Main Dishes: Seafood</option>
            <option id="12">Main Dishes: Vegetarian/ Vegan</option>
            <option id="13">Side Dishes: Vegetables</option>
            <option id="14">Side Dishes: Other</option>
            <option id="">--Other/ Misc--</option>
            <option id="15">Canning and Freezing</option>
            <option id="16">Breads</option>
            <option id="17">Holidays/ Events</option>
            <option id="18">Get Togethers</option>
            <option id="19">Beverages</option>
          </select>
          <div
            className="d-flex flex-row flex-wrap justify-content-center"
            style={{
              margin: "5vh 1vw",
              border: "1px solid white",
              boxShadow: "0 0 2vh #333",
            }}
          >
            <div
              className="d-flex flex-column justify-content-start flexible-stretch-boxes"
              style={{border: '.5px solid white'}}
            >
              <label htmlFor="ingredients" style={{ color: "white", margin: '3vh 0'}}>
                -Ingredients-
              </label>
              {addIngredientInputs()}
              <Button
                onClick={addIngredient}
                className={classes.button}
                size="medium"
                variant="outlined"
              >
                + Ingredient
              </Button>
            </div>
            <div
              className="d-flex flex-column justify-content-start flexible-stretch-boxes"
              style={{border: '.5px solid white'}}
            >
              <label htmlFor="directions" style={{ color: "white", margin: '3vh 0'}}>
                -Instructions-
              </label>
              {createInstructionsInputs()}
              <Button
                onClick={addStep}
                className={classes.button}
                size="medium"
                color='default'
                variant="outlined"
              >
                + Instruction
              </Button>
            </div>
          </div>
          <Button
            className={classes.button}
            size="medium"
            variant="outlined"
            style={{ boxShadow: "0 0 2vh #333" }}
          >
            Add Recipe
          </Button>
        </form>
      </div>
      <div
        className="recipe-form"
        style={{
          width: "50vw",
          minHeight: "50vh",
          color: "white",
          backgroundColor: "#222",
          textAlign: "center",
        }}
      >
        <div
          className="flexible-stretch-boxes d-flex justify-content-center flex-column"
          style={{
            opacity: "0.8",
            maxWidth: "95%",
            margin: "2vh auto",
            boxShadow: "0 0 2vh #333",
          }}
        >
          <h5 className="display-4" style={{ fontSize: "5vh", margin: "" }}>
            Recipe Box
          </h5>
        </div>

        <RecipeCard recipes={props} />
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  addRecipe(state.recipeFormValues);
  console.log("state mapped from title", state);
  return {
    user_id: state.user_id,
    recipe_name: state.recipe_name,
    recipe_description: state.recipe_description,
    recipe_source: state.recipe_source,
    image_source: state.image_source,
    ingredients: state.ingredients,
    category_id: state.category_id,
    instructions: state.instructions,
  };
};

const mapDispatchToProps = {
  recipeFormValues,
  addRecipe,
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRecipes);
