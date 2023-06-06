import React from 'react'
import styles from './Paginado.module.css';

export default function Paginado({countriesPerPage, allRecipes, setCurrentPage}){//paginado
    
    const pageNumbers = [];
    for(let i=1; i<=Math.ceil(allRecipes/countriesPerPage);i++){
    pageNumbers.push(i)}
    const paginado = (pageNumbers) =>{
        setCurrentPage(pageNumbers)
    }
    return(
        <nav>
            
            <ul className={styles.paginado}>
                { pageNumbers &&
                pageNumbers.map(number =>(
                    <li className='number' key={number}>
                        <a href="#" onClick={() => paginado(number)}>{number}</a>
                    </li>
                ))}
            </ul>
        </nav>
    )
};