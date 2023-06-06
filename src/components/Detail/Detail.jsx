import React, { useState } from "react";
import styles from "./Detail.module.css";

const Detail = (props) => {
  const { id, name, image, diets, healthy, summary, steps } = props.location.state;
  

  const handleImageError = (e) => {
    e.target.src = "https://spoonacular.com/recipeImages/715497-312x231.jpg"; // Imagen por defecto
  };
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Receta Detallada</h2>
      <div className={styles.details}>
        <p>
          <strong>Id:</strong> {id}
        </p>
        <p>
          <strong>Nombre:</strong> {name}
        </p>
        <p>
          <strong>Diets:</strong> {diets}
        </p>
        <img src={image} alt="Not found" onError={handleImageError} className={styles.image} />

        <p>
          <strong>Healthy:</strong> {healthy}
        </p>
        <p>
          <strong>Summary:</strong>{" "}
          <div dangerouslySetInnerHTML={{ __html: summary }}></div>
        </p>

        <div className={styles.stepsContainer}>
          {
            typeof steps?.[0] !== "object" ? (
              <>
                <strong>Paso 1:</strong> {steps?.join("")}
              </>
            ) : (
              <>
                {steps?.map((step) => (
                  <div className={styles.step} key={step.number}>
                    <div>
                      <>
                        <strong>Paso {step.number}:</strong> {step.step}
                      </>
                    </div>
                  </div>
                ))}
              </>
            )
          }


        </div>
      </div>
    </div>
  );
};

export default Detail;