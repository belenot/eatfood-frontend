import MaterialTable from "material-table";

import React, { useContext, useState, useRef, useReducer } from 'react';
import { AppContext } from "../../../App";
import { Grid, Select, MenuItem, makeStyles, Typography, Input, TextField, Table, TableRow, TableHead, TableCell, TableBody } from "@material-ui/core";
import { PortionCard } from "./PortionCard";
import { format } from "date-fns";
import { KeyboardDatePicker } from "@material-ui/pickers";

const portionsPanelState = {
    page: 0,
    rowCount: 10,
    portions: [],
    filter: {},
    editedPortion: {
        edited: false,
        id: 0,
        gram: 0,
        date: null,
        foodId: 0
    }
}

const useStyles = makeStyles({
    root: {
        height: "100%"        
    },
    paper: {
        maxHeight: "100%"
    }
})
const dateFormat = "yyyy-MM-dd";
// make input date visible or formate it

function EditFoodColumn({value, foods, onChange}) {
    return (
        <Select 
            value={value}
            onChange={e=>onChange(e.target.value)}
        >
        {foods.map(food=>
            <MenuItem key={food.id} value={food.id}>{food.name}</MenuItem>
        )}
        </Select>
    )
}

function EditDateColumn({value, onChange}) {
    return (
        <KeyboardDatePicker
            disableToolbar
            variant="inline"
            format={dateFormat}
            value={value}
            onChange={onChange}
        />
    )
}

export function PortionsPanel({foods, editedFoods, actions}) {
    const classes = useStyles();
    // const { state, dispatch } = useContext(AppContext);
    const { state, dispatch } = useReducer();
    // const { foods, portions, viewedPortion } = state;
    // const [editablePortion, setEditablePortion] = useState({
    //     foodId: null,
    //     date: format(new Date(), dateFormat),
    //     gram: 0
    // })
    const [isEdit, setIsEdit] = useState(false);
    const [editFoodId, setEditFoodId] = useState(null);
    const [editDate, setEditDate] = useState(format(new Date(), dateFormat))
    const [editGram, setEditGram] = useState(0)
    function addPortion() {
        return new Promise(function(resolve, reject) {
            api.createPortion(
                {foodId: editFoodId, gram: editGram, date: editDate},
                portion=>appDispatch({type:"ADD_PORTION", payload: { portion }})
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
        return new Promise(function(resolve, reject) {
            api.updatePortion(
                oldPortion.id, 
                {foodId: editFoodId, gram: editGram, date: editDate},
                portion=>dispatch({type:"UPDATE_PORTION", payload: { portion }})
            );
            // setEditablePortion({foodId: "", gram: 0, date: format(new Date(), 'yyyy-MM-dd')});

            resolve();
        })
    }
    function showPortion(event, portionData) {
        dispatch({type: "OPEN_VIEWED_PORTION", payload: { portion: {...portionData}, show: true}});
    }
    function handleEditPortion(key, value) {
        console.log(`Edit portion[${key}]:${value}`)
        setEditablePortion({...editablePortion, [key]: value});
    }
    function getFoodName(id) {
        return foods.find(food=>food.id == id);
    }
    function computeSelectedFood(props) {
        if (props.rowData) {
            if (props.rowData.foodId) return props.rowData.foodId
        } 
        if (editFoodId) return editFoodId;
        return "default"
    }
    function computeSelectedDate(props) {
        if (props.rowData) {
            if (props.rowData.date) return props.rowData.date
        }
        if (editDate) return editDate
        return format(new Date(), dateFormat);
    }
    function computeSelectedGram(props) {
        if (props.rowData) {
            if (props.rowData.gram) return props.rowData.gram
        }
        return editGram
    }
    return (
        <Grid container className={classes.root}>
            <Grid item xs={8}>
                <MaterialTable 
                data={portions.map(portion=>({...portion, foodName: foods.find(food=>food.id==portion.foodId).name}))}
                columns={[
                    { title: "Food", field: "foodName", editComponent: props=>(
                        <Select value={computeSelectedFood(props)} onChange={e=>setEditFoodId(e.target.value)}>                            
                            {foods.map(food=>
                                <MenuItem key={food.id} value={food.id}>{food.name}</MenuItem>
                            )}
                        </Select>
                    ) },
                    { title: "Portion (gr)", field: "gram", editComponent: props=>(
                        <TextField value={computeSelectedGram(props)} onChange={e=>setEditGram(e.target.value)}/>
                    ) },
                    { title: "Date", field: "date", editComponent: props=>(
                        <KeyboardDatePicker 
                            variant="inline" 
                            format="yyyy-MM-dd" 
                            value={computeSelectedDate(props)}
                            onChange={value=>setEditDate(format(value, dateFormat))}
                        />
                    ) }
                ]}
                editable={{
                    onRowAdd: addPortion,
                    onRowUpdate: updatePortion,
                    onRowDelete: deletePortion
                }}
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