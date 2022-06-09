import React from "react";
import {Link} from 'react-router-dom';
import './landing.css';

export default function LandingPage(){
    return(
        <div className="lan">
            <h2 className="text">Welcome to MyApiFood</h2>
            <Link to={'/home'}>
                <button className="l-btn">start</button>
            </Link>
        </div>
    )
}