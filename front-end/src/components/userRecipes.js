import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Button, TextField } from "@material-ui/core";
import useStyles from "../styles/styles";
import axiosWithAuth from "../utils/axiosWithAuth";
import RecipeBox from "./recipeBox";
import { initialFormState } from "../initialStates/initialStates";

const UserRecipes = (props) => {
  const classes = useStyles();
  let history = useHistory();
  const [formStateData, setFormStateData] = useState(initialFormState);

  //FORM CONSTRUCTORS
  
  const addIngredientInputs = () => {
    return formStateData.ingredients.map((item, idx) => {
      return (
        <TextField
          value={formStateData.ingredient}
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
          value={formStateData.instruction}
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

  //CHANGE HANDLERS
  const handleChange = (e) => {
    setFormStateData({
      ...formStateData,
      [e.target.name]: e.target.value,
    });
    console.log(formStateData)
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formStateData)
    axiosWithAuth()
      .post(
        "https://secret-famiily-recipes-101.herokuapp.com/api/recipes", formStateData
      )
      .then((res) => {
        console.log(res.data);
        setFormStateData(initialFormState);
        history.push("/user_recipes");
      })
      .catch((error) => {
        console.log(error)
      })
  };


  return (
    <div className={classes.outerDiv} name="outerDivContainer">
      <div className="recipe-form">
        <div
          className="flexible-stretch-boxes d-flex justify-content-center flex-column"
          style={{ margin: "2vh auto" }}
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
              padding: "2vh 4vw",
              color: "white",
              fontSize: "3.5vh",
              margin: "2vh auto",
            }}
          >
            <label htmlFor="category">Meal Type</label>
          </div>
          <select
            onChange={handleChange}
            name="category"
          >
            <option value="">---Select category---</option>
            <option value="">--Meal Period--</option>
            <option value="breakfast">Breakfast</option>
            <option value="lunch">Lunch</option>
            <option value="dinner">Dinner</option>
            <option value="desserts">Desserts</option>
            <option value="">--Dishes--</option>
            <option value="soup">Soup</option>
            <option value="salad">Salad</option>
            <option value="appetizers">Appetizers</option>
            <option value="Mains: Beef">Main Dishes: Beef</option>
            <option value='Mains: Poultry'>Main Dishes: Poultry</option>
            <option value="Mains: Pork">Main Dishes: Pork</option>
            <option value="Mains: Seafood">Main Dishes: Seafood</option>
            <option value="vegetarian/ vegan">Main Dishes: Vegetarian/ Vegan</option>
            <option value="Sides: Vegetables">Side Dishes: Vegetables</option>
            <option value="Sides: Other">Side Dishes: Other</option>
            <option value="">--Other/ Misc--</option>
            <option value='Canning and Freezing'>Canning and Freezing</option>
            <option value="16">Breads</option>
            <option value="17">Holidays/ Events</option>
            <option value="18">Get Togethers</option>
            <option value="19">Beverages</option>
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
              style={{ border: ".5px solid white" }}
            >
              <label
                htmlFor="ingredients"
                style={{ color: "white", margin: "3vh 0" }}
              >
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
              style={{ border: ".5px solid white" }}
            >
              <label
                htmlFor="directions"
                style={{ color: "white", margin: "3vh 0" }}
              >
                -Instructions-
              </label>
              {createInstructionsInputs()}
              <Button
                onClick={addStep}
                className={classes.button}
                size="medium"
                color="default"
                variant="outlined"
              >
                + Instruction
              </Button>
            </div>
          </div>
          <Button
            className={classes.button}
            type='submit'
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

        <RecipeBox />
      </div>
    </div>
  );
};

export default UserRecipes;
