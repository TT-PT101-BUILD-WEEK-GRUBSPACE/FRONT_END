import React, { useEffect } from "react";
import RecipeCards from "./recipeCards";
import {connect} from "react-redux";
import { getRecipes } from "../state/actionCreators";
const RecipeBox=(props)=>{
  const {getRecipes,recipes} = props;
  useEffect(()=>{
    // initial API call on mount
    getRecipes();
},[getRecipes]);


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
const mapStateToProps=(state)=>{
  return{
      recipes:state.user.myList,
  };
};
const mapDispatchToProps=(dispatch)=>{
  return{
      getRecipes:()=>dispatch(getRecipes())
  };
};
export default connect(mapStateToProps,mapDispatchToProps)(RecipeBox);