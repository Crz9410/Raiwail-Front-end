import { Link } from "react-router-dom";
import style from './NavBar.module.css';


const NavBar = () => {
    return (
        <div className={style.mainContainer}>
            <Link to="/">Página principal</Link>
            <Link to="/home">Recetas</Link>
            <Link to="/create">Crear recetas</Link>

        </div>
    )
};

export default NavBar;