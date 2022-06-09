import React from "react";
import { Link } from "react-router-dom";
import './card.css'

export default function Card(info){
    const {image, name, diets, id} = info;
    return(
        <div className="card">
            <img src={image} alt="without image" className="img"/>
            <Link to={`/detail/${id}`} className="name">
                <h3>{name}</h3>
            </Link>
            <h3>Diets: {diets.join(', ')}</h3>
        </div>
    )
}