import CardsContainer from "../../components/CardsContainer/Cards";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { filterDiets, getRecipes, orderByName, orderByHealth, filterByStatus, getDiets } from "../../Redux/actions";
import Paginado from "../../components/Paginado/Paginado";
import styles from './Home.module.css';
import SearchBar from "../../components/SearchBar/SearchBar";



const Home = () => {


    const dispatch = useDispatch();
    const allRecipes = useSelector((state) => state?.recipes);
    const allDiets = useSelector((state) => state?.recipes);
    const [orden, setOrden] = useState('');
    const [currentPage, setCurrentPage] = useState(1);  //guarda en estado local la pagina actual, set es una constante que setea la pagina actual, empieza en 1 por que siempre se va setear en la pagina principal.
    const [countriesPerPage, setCountriesPerPage] = useState(9) // en el estado local guardarme cuantos paises quiero por pagina.
    const indexOfLastCountries = currentPage * countriesPerPage
    const indexOfFirstCountries = indexOfLastCountries - countriesPerPage
    const currentRecipes = allRecipes?.slice(indexOfFirstCountries, indexOfLastCountries);
    // console.log("NNNNNNNNNNNNN", allRecipes);
    
    const handlerSort = (e) => {
        e.preventDefault()
        // dispatch(filterCreated(e.target.value))
        dispatch(orderByName(e.target.value))
        setCurrentPage(1);
        setOrden(`Ordenado ${e.target.value}`)


    }
    
    const handlerSorthealth = (e) => {
        e.preventDefault()
        // dispatch(filterCreated(e.target.value))
        dispatch(orderByHealth(e.target.value))
        setCurrentPage(1);
        setOrden(`Ordenado ${e.target.value}`)


    }


    const handlerFilter = (e) => {
        e.preventDefault();
        dispatch(filterDiets(e.target.value))
    };
    
    const handlerFilterOrigin = (e) => {
        e.preventDefault();
        dispatch(filterByStatus(e.target.value))
    };

    useEffect(() => {
        dispatch(getDiets())
        dispatch(getRecipes(currentPage));
    }, [dispatch])



    return (
        <>
            <div className={styles.filter} >
                <select className={styles.continent} onChange={e => handlerFilter(e)}>
                    <option value="All">Tipo de dieta</option>
                    <option value="gluten free">Gluten free</option>
                    <option value="dairy free">Dairy free</option>
                    <option value="vegan">Vegan</option>
                    <option value="pescatarian">Pescatarian</option>
                    <option value="lacto ovo vegetarian">Lacto ovo vegetarian</option>
                    <option value="paleolithic">Paleolithic</option>
                    <option value="primal">Primal</option>
                    <option value="whole 30">Whole 30</option>

                </select>

                <select className={styles.continent} onChange={e => handlerFilterOrigin(e)}>
                    <option value='api'>Api</option>
                    <option value='bdd'>BDD</option>

                </select>

                <SearchBar  setCurrentPage={setCurrentPage}/>
                <select className={styles.continent} onChange={e => handlerSort(e)}>
                    <option value='asc'>A-Z</option>
                    <option value='des'>Z-A</option>


                </select>

                <select className={styles.continent} onChange={e => handlerSorthealth(e)}>
                    <option value='mas'>Más saludable</option>
                    <option value='menos'>Menos saludable</option>

                </select>
            </div>
            <div className={styles.title}>
                <h1>Recetas</h1>

            </div>
            <CardsContainer currentRecipes={currentRecipes} />
            <Paginado
                setCurrentPage={setCurrentPage}
                countriesPerPage={countriesPerPage}
                allRecipes={allRecipes?.length}

            />

        </>
    )
}

export default Home;