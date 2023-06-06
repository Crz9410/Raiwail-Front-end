import React from "react";
import { Link } from 'react-router-dom';
import style from'./Landing.module.css';

const Landing = () =>{
    return(
        <div className={style.landing_container}>
            <h1>Bienvenidos a la APP Foods</h1>
            <div className={style.button_container}>
                <Link to ="/home">
                    <button>Ingresar</button>
                </Link>
            </div>
        </div>
    )
}

export default Landing;