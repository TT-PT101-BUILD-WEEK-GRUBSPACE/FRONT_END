import React from "react";

export default function RecipeCards(props) {
  const {
    recipe_name,
    recipe_source,
    submitted_by,
    recipe_description,
    image_source,
    ingredients,
    instructions,
    category_name,
  } = props;
  // console.log(
  //   recipe_name,
  //   recipe_source,
  //   submitted_by,
  //   recipe_description,
  //   image_source,
  //   ingredients,
  //   instructions,
  //   category_name,
  // )
  return (
    <div
      key="1"
      style={{
        margin: "8vh auto",
        backgroundColor: "#222",
        opacity: "0.9",
        maxWidth: "90%",
        padding: "5vh 0",
        boxShadow: "0 0 2vh black",
      }}
    >
      <h4>{recipe_name}</h4>
      <h6>"{recipe_description}"</h6>
      <img
        src={image_source}
        alt={recipe_name}
        style={{
          maxWidth: "20vw",
          margin: "5vh auto",
          border: "2.5vh solid white",
          boxShadow: "0 0 2vh #AAA",
        }}
      />
      <h5>RECIPE SOURCE: {recipe_source}</h5>
      <h6>SUBMITTED BY: {submitted_by}</h6>
      <p>CATEGORY: {category_name}</p>
      <div
        className="d-flex flex-row flex-wrap justify-content-center"
        style={{
          margin: "5vh 1vw",
          border: "1px solid white",
          boxShadow: "0 0 2vh #333",
        }}
      >
        <div className="d-flex flex-column justify-content-start flexible-stretch-boxes">
          {ingredients.map((item, idx) => {
            return (
              <p style={{ padding: "3vh 0" }} key={idx}>
                {item.quantity} {item.ingredient}
              </p>
            );
          })}
        </div>
        <div
          className="d-flex flex-column justify-content-start flexible-stretch-boxes"
          style={{ marginBottom: "3vh" }}
        >
          {instructions.map((item, idx) => {
            return (
              <p style={{ justifySelf: "stretch" }} key={idx}>
                {item.step_number}: {item.instruction}
              </p>
            );
          })}
        </div>
      </div>
    </div>
  );
}
