import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import MaterialTable from 'material-table';
import React, { useContext, useState } from 'react';
import { AppContext } from '../../../App';
import { FoodCard } from './FoodCard';
// import * as icons from '@material-ui/icons'

const useStyles = makeStyles({
    root: {
        height: "100%"        
    },
    paper: {
        maxHeight: "100%"
    }
})

export const FoodsPanel = () => {
    const classes = useStyles();
    const { state, dispatch, api } = useContext(AppContext);
    const { foods, viewedFood } = state;
    const [editFoodForm, setEditFoodForm] = useState({show: false, food: null});
    function addFood(newFood) {
        console.log("add was called");
        return new Promise(function(resolve, reject){
            console.log("add promise is executing");
            api.createFood(newFood, 
                dispatch({type:"ADD_FOOD", payload: {food: {...newFood}}})
            )
            resolve();
        })
    }
    function deleteFood(oldFood) {
        return new Promise(function(resolve, reject){
            api.deleteFood(oldFood.id,
                dispatch({type:"DELETE_FOOD", payload: {food: {...oldFood}}})
            )
            resolve();
        })
    }
    function updateFood(newFood, oldFood) {
        return new Promise(function(resolve, reject) {
            api.updateFood(oldFood.id, newFood, 
                dispatch({type: "UPDATE_FOOD", payload: {food: {...newFood}}})
            )
            resolve();
        })
    }
    function showFood(event, foodData) {
        dispatch({type: "OPEN_VIEWED_FOOD", payload: {foodId: foodData.id, show: true}});
    }
    return (
        <Grid container className={classes.root}>
            <Grid item xs={8}>
                <MaterialTable
                    columns={[
                        { title: "Food", field: "name" },
                        { title: "Calories (kcal)", field: "kcal" },
                        { title: "Protein (gr)", field: "prot" },
                        { title: "Carbohydrate (gr)", field: "carb" },
                        { title: "Fat (gr)", field: "fat" }
                    ]}
                    data={foods.map(food=>food)}
                    title="Foods"
                    options={{pageSizeOptions:[],pageSize:10}}
                    editable={{
                        onRowAdd: addFood,
                        onRowUpdate: updateFood,
                        onRowDelete: deleteFood
                    }}
                    onRowClick={showFood}
                />
            </Grid>
            {viewedFood.show&&
            <Grid item xs={4}>
                <FoodCard />
            </Grid>
            }
        </Grid>
    )
}