import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { detail, setLoading } from "../../actions";
import './detail.css';


export  function Detail(){
    const dispatch = useDispatch();
    const detalle = useSelector(state => state.detalle);
    const loading = useSelector(state => state.loading);
    const {id} = useParams();

    useEffect(() => {
        dispatch(detail(id));
        dispatch(setLoading(true))
    },[])
    
    return(
        loading?<div>loading...</div> : 
        <div>
            <Link to='/home'>
                <button className="back">Back</button>
            </Link>

            <div className="d-card">
                
                <img src={detalle.image} className="d-img" />
                <h3>{detalle.name}</h3>
                <h3>Diets: {detalle.diets?.join(', ')}</h3>
                <h3>Summary: {detalle.summary}</h3>
                <h3>Punctuation: {detalle.punctuation}</h3>
                <h3>Healt Score: {detalle.healthScore}</h3>
                <h3>Instructions: {detalle.instructions}</h3>
            </div>
           
        </div>
    )
}