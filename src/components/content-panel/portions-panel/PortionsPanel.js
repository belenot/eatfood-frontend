import MaterialTable from "material-table";

import React, { useContext, useState, useRef, useEffect } from 'react';
import { AppContext } from "../../../App";
import { FoodCard } from "../foods-panel/FoodCard";
import { Grid, Select, MenuItem } from "@material-ui/core";
import { PortionCard } from "./PortionCard";
import DateFnsUtils from "@date-io/date-fns";
import { format } from "date-fns";


const dateFormat = "yyyy-MM-dd'T00:00";
// make input date visible or formate it

export function PortionsPanel() {
    const { state, dispatch } = useContext(AppContext);
    const { foods, portions, viewedPortion } = state;
    const [selectedFood, setSelectedFood] = useState({name: "", id: ""});
    function addPortion(newPortion) {
        console.log("New portion: " + JSON.stringify(newPortion));
        return new Promise(function(resolve, reject) {
            api.createPortion({...newPortion, 
                time: format(newPortion.time, dateFormat), 
                foodId: selectedFood.id
            },
                portion=>dispatch({type:"ADD_PORTION", payload: { portion }})
            );
            resolve();
        })
    }
    function deletePortion(oldPortion) {
        return new Promise(function(resolve, reject) {
            api.deletePortion(oldPortion.id,
                ()=>dispatch({type:"DELETE_PORTION", payload: {portion: {...oldPortion} } })
            )
            resolve();
        })
    }
    function updatePortion(newPortion, oldPortion) {
        const foodId = selectedFood.id;
        const foodName = selectedFood.name;
        return new Promise(function(resolve, reject) {
            api.updatePortion(
                oldPortion.id, {
                    ...newPortion, 
                    time: format(newPortion.time, dateFormat), 
                    foodId: selectedFood.id
                },
                portion=>dispatch({type:"UPDATE_PORTION", payload: { portion }})
            );
            setSelectedFood({name: "", id: ""});
            resolve();
        })
    }
    function showPortion(event, portionData) {
        dispatch({type: "OPEN_VIEWED_PORTION", payload: { portion: {...portionData}, show: true}});
    }
    function handleSelectFood(event) {
        setSelectedFood({id: event.target.value, name: foods.find(f=>f.id == event.target.value).name});
    }
    return (
        <Grid container>
            <Grid item xs={8}>
                <MaterialTable 
                    title="Portions"
                    data={[...portions]}
                    columns={[
                        { 
                            title: "Food", 
                            field: "food.name",
                            editComponent: props => (
                                <Select
                                    value={selectedFood.id}
                                    onChange={handleSelectFood}
                                >
                                    {foods.map(f=>
                                    <MenuItem key={f.id} value={f.id}>{f.name}</MenuItem>
                                    )}
                                </Select>
                            )
                        },
                        { title: "Portion (gr)", field: "gram" },
                        { title: "Time", field: "time", type:"datetime" },
                    ]}
                    options={{pageSizeOptions:[]}}
                    editable={{
                        onRowAdd: addPortion,
                        onRowUpdate: updatePortion,
                        onRowDelete: deletePortion
                    }}
                    onRowClick={showPortion}
                />
            </Grid>
            {viewedPortion.show&&
            <Grid item xs={4}>
                <PortionCard />
            </Grid>
            }
        </Grid>
    )    
}