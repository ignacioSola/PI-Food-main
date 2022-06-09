import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { filterByDiets, orederByName, filterPunctuation } from "../actions";
import './filtros.css';

export default function Filtros({setCurrentPage}){

   const comidaFiltrada = useSelector(state => state.food);
   const dispatch = useDispatch();

   function handlefilterByDiets(e){
       e.preventDefault();
       dispatch(filterByDiets(e.target.value)) 
       setCurrentPage(1)
   }
   function handleOnClick(e){
       e.preventDefault();
       dispatch(orederByName(e.target.value))
       setCurrentPage(1)
   }

   function handlefilterBypunctuation(e){
       e.preventDefault();
       dispatch(filterPunctuation(e.target.value));
       setCurrentPage(1)
   }


    return(
        <div>
            <button value='asc' onClick={handleOnClick} className="botones">A-Z</button>
            <button value='des' onClick={handleOnClick} className="botones">Z-A</button>

            <select onChange={e => handlefilterByDiets(e)} className="select">
                <option value="Diets">All Diets</option>
                <option value="gluten free">gluten free</option>
                <option value="dairy free">dairy free</option>
                <option value="lacto ovo vegetarian">lacto ovo vegetarian</option>
                <option value="vegan">vegan</option>
                <option value="paleolithic">paleolithic</option>
                <option value="primal">primal</option>
                <option value="whole 30">whole 30</option>
                <option value="pescatarian">pescatarian</option>
                <option value="ketogenic">ketogenic</option>
                <option value="fodmap friendly">fodmap friendly</option>
            </select>

            <button value='may' onClick={handlefilterBypunctuation} className="botones">may</button>
            <button value='men' onClick={handlefilterBypunctuation} className="botones">men</button>

        </div>
    )
}