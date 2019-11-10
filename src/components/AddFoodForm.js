import {useDispatch, useSelector} from 'react-redux';
import { Grid, TextField, FormControl, InputLabel, Input, Paper, Button, CircularProgress } from "@material-ui/core";
import { handleMainPage, addFood, OK_STATUS, ERR_STATUS, REQUEST_STATUS } from '../actions';

function AddFoodForm() {
    const food = useSelector(store=>store.mainPage.addingFood);
    const dispatch = useDispatch();
    return (
        <Grid 
            container 
            component='form' 
            direction='column'
            onSubmit={
                function(e) {
                    e.preventDefault();
                    dispatch(addFood(null, REQUEST_STATUS))
                    fetch(
                        "/food/add",
                        {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify(food)
                        }
                    )
                    .then(r=>r.json())
                    .then(
                        function(food) {
                            console.log(food)
                            if (food&&food.id > 0) {
                                dispatch(addFood(food, OK_STATUS));
                            } else {
                                dispatch(addFood(null, ERR_STATUS, "Can't add food"));
                            }
                        }
                    )
                    .catch(
                        function(error) {
                            dispatch(addFood(null, ERR_STATUS, "Can't add food " + error));
                        }
                    )
                }
            }
        >
            <Grid item>
                <FormControl>
                    <InputLabel>Name</InputLabel>
                    <Input 
                        value={food.name} 
                        onChange={
                            function(e) {
                                dispatch(handleMainPage(
                                    function(state) {
                                        return {
                                            ...state,
                                            addingFood: {
                                                ...state.addingFood,
                                                name: e.target.value
                                            }
                                        }
                                    }
                                ))
                            }
                        }
                    />
                </FormControl>
            </Grid>
            <Grid item>
                <FormControl>
                    <InputLabel>Calories</InputLabel>
                    <Input
                        value={food.nutrients.calories} 
                        onChange={
                            function(e) {
                                dispatch(handleMainPage(
                                    function(state) {
                                        return {
                                            ...state,
                                            addingFood: {
                                                ...state.addingFood,
                                                nutrients: {
                                                    ...state.addingFood.nutrients,
                                                    calories: e.target.value
                                                }
                                            }
                                        }
                                    }
                                ))
                            }
                        }
                    />
                </FormControl>
            </Grid>
            <Grid item>
                <FormControl>
                    <InputLabel>Protein</InputLabel>
                    <Input
                        value={food.protein} 
                        onChange={
                            function(e) {
                                dispatch(handleMainPage(
                                    function(state) {
                                        return {
                                            ...state,
                                            addingFood: {
                                                ...state.addingFood,
                                                nutrients: {
                                                    ...state.addingFood.nutrients,
                                                    protein: e.target.value
                                                }
                                            }
                                        }
                                    }
                                ))
                            }
                        }
                    />
                </FormControl>
            </Grid>
            <Grid item>
                <FormControl>
                    <InputLabel>Carbohydrate</InputLabel>
                    <Input 
                        value={food.carbohydrate} 
                        onChange={
                            function(e) {
                                dispatch(handleMainPage(
                                    function(state) {
                                        return {
                                            ...state,
                                            addingFood: {
                                                ...state.addingFood,
                                                nutrients: {
                                                    ...state.addingFood.nutrients,
                                                    carbohydrate: e.target.value
                                                }
                                            }
                                        }
                                    }
                                ))
                            }
                        }
                    />
                </FormControl>
            </Grid>
            <Grid item>
                <FormControl>
                    <InputLabel>Fat</InputLabel>
                    <Input 
                        value={food.fat} 
                        onChange={
                            function(e) {
                                dispatch(handleMainPage(
                                    function(state) {
                                        return {
                                            ...state,
                                            addingFood: {
                                                ...state.addingFood,
                                                nutrients: {
                                                    ...state.addingFood.nutrients,
                                                    fat: e.target.value
                                                }
                                            }
                                        }
                                    }
                                ))
                            }
                        }
                    />
                </FormControl>
            </Grid>
            <Grid item>
                <Input type='submit' value='OK' />
            </Grid>
        </Grid>
    )
}

export default AddFoodForm;