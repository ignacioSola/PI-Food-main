import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link} from "react-router-dom";
import { getDiets, postRecipe } from "../../actions";
import './createRecipe.css';


function validate(input){
    let errors = {};
    if(!input.name){
        errors.name = 'a name is required';
    }
    if(!input.summary){
        errors.summary = 'required field';
    }
    if(input.diets.length == 0){
        errors.diets = 'required field';
    }
    if(input.healthScore<0 || input.healthScore>100){
        errors.healthScore = 'must be a value between 0 and 100'
    }
    return errors
}


export default function Post(){
    const dispatch = useDispatch();
    const tipoDdeDieta = useSelector(state => state.types);
    const [input, setInput] = useState({
        name: '',
        summary: '',
        punctuation: '',
        healthScore: '',
        instructions: '',
        image: '',
        diets: []
    })
    const [errors, setErrors] = useState({});


    useEffect(() => {
        if(tipoDdeDieta.length===0) dispatch(getDiets());
    },[]);


    function handleOnChange(e){
        e.preventDefault();
        setInput({
            ...input,
            [e.target.name] : e.target.value
        });
        setErrors(validate({
            ...input,
            [e.target.name]: e.target.value
        }))
    }

    function handleSelect(e){
        e.preventDefault();
        if(!input.diets.includes(e.target.value)){
            setInput({
            ...input,
            diets: [...input.diets, e.target.value]
        })
        }
        setErrors(validate({
            ...input,
            diets: [e.target.value]
        }))
        
    }

    function handleSubmit(e){
        e.preventDefault();
        if(!Object.keys(errors).length && input.diets.length>0){
            dispatch(postRecipe(input));
            setInput({
                name: '',
                summary: '',
                punctuation: '',
                healthScore: '',
                instructions: '',
                image: '',
                diets: []
            });
            alert('recipe created')
        }
        else{
            alert('complete all fields correctly ')
        }
        
    }

    function handleDelete(e){
        // e.preventDefault();
        const tipos =  input.diets.filter(el => el !== e)
        setInput({
            ...input,
            diets: tipos
        })
        
    }


    return(
        <div>
            <Link to={'/home'}><button className="volver-btn">Back</button></Link>
            <form className="form">
                <div className="a">
                    <label className="lbl">Name:</label>
                    <input
                    type={'text'}
                    value={input.name}
                    key= 'name'
                    name= 'name'
                    onChange={handleOnChange}
                    className='el'/>
                    {errors.name && (
                        <p>{errors.name}</p>
                        )}
                </div>


                <div className="a">
                    <label>Summary:</label>
                    <input
                    type={'text'}
                    value={input.summary}
                    key='summary'
                    name= 'summary'
                    onChange={handleOnChange}
                    className='el'/>
                    {errors.summary && (
                        <p>{errors.summary}</p>
                        )}
                </div>


                <div className="a">
                    <label>Punctuation:</label>
                    <input
                    type={'number'}
                    value={input.punctuation}
                    key='punctuation'
                    name= 'punctuation'
                    onChange={handleOnChange}
                    className='el'/>
                </div>


                <div className="a">
                    <label>HealthScore '0-100':</label>
                    <input
                    type={'number'}
                    value={input.healthScore}
                    key='healthScore'
                    name= 'healthScore'
                    onChange={handleOnChange}
                    className='el'/>
                    {errors.healthScore && (
                        <p>{errors.healthScore}</p>
                        )}
                </div>


                <div className="a">
                    <label>instructions:</label>
                    <input
                    type={'text'}
                    value={input.instructions}
                    key='instructions'
                    name= 'instructions'
                    onChange={handleOnChange}
                    className='el'/>
                </div>


                <div className="a">
                    <label>Image url:</label>
                    <input
                    type={'text'}
                    value={input.image}
                    key='image'
                    name= 'image'
                    onChange={handleOnChange}
                    className='el'/>
                </div>


                <div className="a">
                    <label>Diets:</label>
                    <select onChange={handleSelect} className='el'>
                        <option></option>
                        {
                            tipoDdeDieta.map(e => {
                                return (
                                    <option value={e.name} key={e.id} >{e.name}</option>
                                )    
                            })
                        }
                    </select>
                    {errors.diets && (
                        <p>{errors.diets}</p>
                        )}
                </div>

                <ul>
                    <li>{input.diets.map(e =>{
                        return(
                            <div key={e}>
                            <p>{e}</p>
                            <button onClick={() => handleDelete(e)} className='cr-btn'>X</button>
                            </div> 
                        )
                            
                    })}</li>
                </ul>


                

                <button type="submit" onClick={handleSubmit} className="cr-btn">Create Recipe</button>
                
            </form>
        </div>
    )
}

function isUrl(s) {   
    var regexp = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/
    return regexp.test(s);
}