import React, { useState, useEffect } from "react";
import axiosWithAuth from "../utils/axiosWithAuth";
import RecipeCards from "./recipeCards";

export default function RecipeBox() {
  const [recipes, setRecipes] = useState([]);
  const ghost = "";
  useEffect(() => {
    axiosWithAuth()
      .get("https://secret-family-recipes-101.herokuapp.com/api/recipes")
      .then((res) => {
        setRecipes(res.data);
        console.log(res.data);
      })
      .catch((error) => {
        console.log(
          "ERROR MESSAGE FROM getRecipes in RecipeBox component",
          error
        );
      });
  }, [ghost]);

  return (
    <div>
      {recipes.map((item, idx) => {
        return (
          <RecipeCards
            key={idx}
            recipe_name={item.recipe_name}
            recipe_source={item.recipe_source}
            submitted_by={item.submitted_by}
            recipe_description={item.recipe_description}
            category_name={item.category_name}
            image_source={item.image_source}
            ingredients={item.ingredients}
            instructions={item.instructions}
          />
        );
      })}
    </div>
  );
}
