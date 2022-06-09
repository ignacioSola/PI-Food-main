import React from "react";
import './paginado.css';


export default function Paginado({recipesPerPage, allRecipes, paginado}) {
    const paginas = [];
    
    for (let i = 1; i <= Math.ceil(allRecipes / recipesPerPage); i++) {
            paginas.push(i);
        }
    return (
        <nav>
            <ul>
                {paginas.map(e => {
                   if(e !== 0){
                       return <button key={e} onClick={() => paginado(e)} className="pag">{e}</button>
                   }
                })}
            </ul>
        </nav>
    )
}