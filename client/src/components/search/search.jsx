import React from "react";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { getFoodByName } from "../../actions";
import './search.css';


export default function Search(){
    const [input,setInput] = useState('');
    const dispatch = useDispatch();
    
    function handleOnChange(e){
        e.preventDefault();
        setInput(e.target.value);
    }
    function handleOnClick(e){
        e.preventDefault();
        if(input === ''){
            alert('ingresar nombre')
        }
        dispatch(getFoodByName(input));
        setInput('')
        
    }

    return(
        <div >
            <input type='text' onChange={handleOnChange} placeholder='Recipe...' className="input"/>
            <button onClick={handleOnClick} className='btn'>Search</button>
        </div>
        

    )
}