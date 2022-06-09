import axios from 'axios';

export const GET_FOOD = 'GetFood';
export const GET_FOOD_BY_NAME ='GetFoodByName';
export const DETAIL = 'Detail';
export const FILTER_BY_DIETS = 'FilterByDiets';
export const ORDER_BY_NAME = 'OrderByName';
export const POST_RECIPE = 'PostRecipe';
export const GET_DIETS = 'GetDiets';
export const SET_LOADING = 'SetLoading';
export const FILTER_PUNCTUATION = 'FilterPunctuation';


export function getFood () {
    return function(dispatch){
        return axios.get('http://localhost:3001/recipes')
        .then(res => {
            dispatch({
                type:GET_FOOD,
                payload: res.data
            })
        })
    }
}

export function getFoodByName(payload){
    return function(dispatch){
        return axios.get(`http://localhost:3001/recipes?name=${payload}`)
        .then(res => {
            dispatch({
                type:GET_FOOD_BY_NAME,
                payload: res.data
            })
        })
    }
}

export function detail(id){
    return function(dispatch){
        return axios.get(`http://localhost:3001/recipes/${id}`)
        .then(res => {
            dispatch({
                type:DETAIL,
                payload: res.data
            })
        })
    }
}

export function filterByDiets(payload){
    return{
        type:FILTER_BY_DIETS,
        payload
    }
}

export function orederByName(payload){
    return{
        type:ORDER_BY_NAME,
        payload
    }
}

export function postRecipe(info){
    return function(dispatch){
        return axios.post('http://localhost:3001/recipes', info)
    }
}

export function getDiets(){
    return function (dispatch){
        return axios.get('http://localhost:3001/types')
        .then(res => {
            dispatch({
                type:GET_DIETS,
                payload: res.data
            })
        })
    }
}

export function setLoading (payload){
    return {
        type: SET_LOADING,
        payload
    }
}

export function filterPunctuation(payload){
    return{
        type:FILTER_PUNCTUATION,
        payload
    }
}
