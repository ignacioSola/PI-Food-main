import React from "react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import {useSelector, useDispatch} from 'react-redux';
import { getFood } from "../../actions";
import Card from "../card/card";
import Search from "../search/search";
import Filtros from "../filtros";
import Paginado from "../paginado";
import './home.css';

export default function Home(){
    const dispatch = useDispatch();
    const allFood = useSelector((state) => state.food);
    const [currentPage, setCurrentPage] = useState(1);
    const [recipesPerPage, setRecipesPerPage] = useState(9);
    const indexLastRecipe = recipesPerPage * currentPage;
    const indexFirstRecipe = indexLastRecipe - recipesPerPage;
    const currentRecipes = allFood.slice(indexFirstRecipe, indexLastRecipe);
 
    const paginado = (pageNumber) => {
        setCurrentPage(pageNumber);
    }
    
    
    useEffect(() => {
        dispatch(getFood())
    }, []);

    function handleOnClick(e){
        e.preventDefault();
        dispatch(getFood())
    }

    return(
        <div>
            <Search/>
           <div className="div">
                <button onClick={handleOnClick} className="btns"> Refresh </button>
                <Link to={'/created'}>
                    <button className="btns">Create Recipe</button>
                </Link> 
           </div>
            
             <Filtros setCurrentPage={setCurrentPage}/>
            <Paginado
            recipesPerPage= {recipesPerPage}
            allRecipes={allFood.length}
            paginado={paginado}/>
            <div className="cards">
                {
                    currentRecipes && currentRecipes.map(e => {
                        return <Card
                                name={e.name}
                                image={e.image}
                                diets={e.diets}
                                key={e.id? e.id : 'nn'}
                                id={e.id} 
                            />
                        
                    })
                }
            </div>
        </div>
        
    )
}