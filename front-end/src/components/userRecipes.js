import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Button, TextField } from "@material-ui/core";
import useStyles from "../styles/styles";
import axiosWithAuth from "../utils/axiosWithAuth";
import RecipeBox from "./recipeBox";
import { initialFormValues } from "../initialStates/initialStates";

const UserRecipes = (props) => {
  const classes = useStyles();
  let history = useHistory();
  //const isDisabled = false;

  const [recipe, setRecipe] = useState({});
  const [formValues, setFormValues] = useState(initialFormValues);
  //const [disabled, setDisabled] = useState(isDisabled);

  //console.log(recipe, disabled, history, formValues)

  //FORM CONSTRUCTORS

  const addIngredientInputs = () => {
    return formValues.ingredients.map((item, idx) => {
      return (
        <div className='d-flex flex-row justify-content-center' key={idx}>
          <TextField
            name="ingredient"
            value={item.ingredient_name}
            key={idx}
            placeholder={`Ingredient ${idx + 1}`}
            onChange={(e) => updateIngredients(e, { idx, key: 'ingredient_name' })}
            margin="dense"
            className={classes.input}
          />
          <TextField
            name="ingredient"
            value={item.quantity}
            key={`quantity-${idx}`}
            placeholder="Quantity"
            onChange={(e) => updateIngredients(e, { idx, key: 'quantity' })}
            margin="dense"
            className={classes.input}
          />
        </div>
      );
    });
  };

  const updateIngredients = (e, { idx, key }) => {
    const formCopy = { ...formValues };
    formCopy.ingredients[idx] = {
      ...formCopy.ingredients[idx],
      [key]: e.target.value,
    };
    setFormValues(formCopy);
  };

  const addIngredient = (e) => {
    e.preventDefault();
    setFormValues(() => {
      return {
        ...formValues,
        ingredients: [...formValues.ingredients, ""],
      };
    });
  };

  const createInstructionsInputs = () => {
    return formValues.instructions.map((item, idx) => {
      return (
        <div key={idx}>
          <TextField
            value={formValues.instruction}
            placeholder={`Step ${idx + 1}`}
            onChange={(e) => updateInstructions(e, idx)}
            margin="dense"
            className={classes.input}
          />
        </div>
      );
    });
  };

  const updateInstructions = (e, idx) => {
    const formCopyInstructions = { ...formValues };
    formCopyInstructions.instructions[idx] = {
      instruction: e.target.value,
      step_number: idx + 1
    };
    setFormValues(formCopyInstructions);
  };

  const addStep = (e) => {
    e.preventDefault();
    setFormValues((prevFormValues) => ({
      ...prevFormValues,
      instructions: [...formValues.instructions, formValues],
    }));
  };

  //CHANGE HANDLERS

  const postNewRecipe = (newRecipe) => {
    axiosWithAuth()
      .post(
        "/recipes",
        newRecipe
      )
      .then((res) => {
        setRecipe(res.data);
        console.log(recipe)
        console.log("API USAGE SUCCESSFUL", res.data);
        setFormValues(initialFormValues);
        history.push("/user_recipes");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevFormValue) => ({
      ...prevFormValue,
      [name]: value,
    }));
    console.log(formValues);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formValues);

    const newRecipe = {
      recipe_name: formValues.recipe_name,
      recipe_description: formValues.recipe_description,
      recipe_source: formValues.recipe_source,
      user_id: 0,
      image_source: formValues.image_source,
      category_id: formValues.category_id,
      ingredients: formValues.ingredients,
      instructions: formValues.instructions,
    };

    postNewRecipe(newRecipe);
    alert("Your Recipe Has Been Added To YOur Recipe Box");
    setFormValues(initialFormValues);
  };

  return (
    <div className={classes.outerDiv} name="outerDivContainer">
      <div className="recipe-form d-flex justify-content-start flex-column">
        <div
          className="flexible-stretch-boxes d-flex justify-content-center flex-column"
          style={{ margin: "5vh auto", maxWidth: "90%", textSelf: "center" }}
        >
          <h4 className='display-4' style={{ alignSelf: "center", marginTop: '3vh', fontSize: '3vh' }}>
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
            value={formValues.recipe_name}
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
            value={formValues.recipe_description}
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
            value={formValues.image_source}
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
            value={formValues.recipe_source}
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
            <label htmlFor="category_id">Meal Type</label>
          </div>
          <select onChange={handleChange} name="category_id">
            <option>---Select category---</option>
            <option value="">--Meal Period--</option>
            <option value={1}>Breakfast</option>
            <option value={2}>Lunch</option>
            <option value={14}>Desserts</option>
            <option value="">--Dishes--</option>
            <option value={5}>Soup</option>
            <option value={6}>Salad</option>
            <option value={4}>Appetizers</option>
            <option value={7}>Main Dishes: Beef</option>
            <option value={8}>Main Dishes: Poultry</option>
            <option value={9}>Main Dishes: Pork</option>
            <option value={10}>Main Dishes: Seafood</option>
            <option value={11}>Main Dishes: Vegetarian/ Vegan</option>
            <option value={12}>Side Dishes: Vegetables</option>
            <option value={13}>Side Dishes: Other</option>
            <option value="">--Other/ Misc--</option>
            <option value={15}>Canning and Freezing</option>
            <option value={16}>Breads</option>
            <option value={17}>Holidays/ Events</option>
            <option value={18}>Get Togethers</option>
            <option value={3}>Beverages</option>
          </select>
          <div
            className="d-flex flex-column justify-content-center"
            style={{
              margin: "5vh 1vw",
              border: "1px solid white",
              boxShadow: "0 0 2vh #333",
              width: "100%",
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
            type="submit"
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
          width: "32vw",
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
            maxWidth: "90%",
            margin: "5vh auto",
            boxShadow: "0 0 2vh #333",
            padding: "2vh 0",
          }}
        >
          <h5 className="display-4" style={{ fontSize: "3vh", margin: "7vh auto" }}>
            Recipe Box
          </h5>
        </div>

        <RecipeBox />
      </div>
    </div>
  );
};

export default UserRecipes;
