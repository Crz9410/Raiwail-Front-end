import React from "react";
import Card from "../Card/Card";
import Style from "./CardsContainer.module.css";

const CardsContainer = ({ currentRecipes }) => {
   
  return (
    <div className={Style.container}>
      {currentRecipes?.map((recipe,i) => (
        <div className={Style.card} key={recipe.id || i}>
          {(
            
            <Card
              id={recipe.id}
              name={recipe.title || recipe.name || "No hay información"}
              image={recipe.image || "No hay información"}
              diets={recipe?.diets ||"No hay información" }
              summary={recipe.summary || "No hay información"}
              healthy={recipe.healthScore ||recipe.healthy ||"No hay información"}
              steps={ recipe?.analyzedInstructions?.[0]?.steps  ||(typeof recipe?.steps === "string" ? recipe?.steps?.split("") : recipe?.steps ) }
            /> 
            
          )}
        </div>
      ))}
    </div>
  );
};

export default CardsContainer;