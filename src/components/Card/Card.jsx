import React, { useState } from "react";
import styles from "./Card.module.css";
import { Link } from 'react-router-dom';
import Detail from "../Detail/Detail";

const Card = (props) => {
  const [showBack, setShowBack] = useState(false);
  
  
  const handleCardClick = () => {
    setShowBack(!showBack);
  };
  

  const handleImageError = (e) => {
    e.target.src = "https://spoonacular.com/recipeImages/715497-312x231.jpg"; // Imagen por defecto
  };
  return (
    <div className={styles.cardBox} onClick={handleCardClick}>
      <div className={`${styles.card}`}>
        <div className={`${styles.front}`}>
          <p className={styles.country}>{props.name}</p>
          <img src={props.image} alt="Not found" onError={handleImageError} />
          <p>{props.diets}</p>

          <Link to={{
            pathname: "/detail",
            state: {
              id: props.id,
              name: props.name,
              image: props.image,
              diets: props.diets,
              healthy: props.healthy,
              summary: props.summary,
              steps: props.steps
            }
          }}>
            <button>Ingresar</button>
          </Link>
        </div>

      </div>
    </div>
  );
};

export default Card;