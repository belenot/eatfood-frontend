import MaterialTable from "material-table";

import React, { useContext, useState, useRef, useReducer } from 'react';
import { AppContext } from "../../../App";
import { Grid, Select, MenuItem, makeStyles, Typography, Input, TextField, Table, TableRow, TableHead, TableCell, TableBody, Tooltip, Button, Checkbox, Toolbar, Paper } from "@material-ui/core";
import { PortionCard } from "./PortionCard";
import { format } from "date-fns";
import { KeyboardDatePicker } from "@material-ui/pickers";

import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import CloseIcon from '@material-ui/icons/Close';
import DoneIcon from '@material-ui/icons/Done';



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
//make portions panel and then make api to it
export function PortionsPanel() {
    const classes = useStyles();    
    const {state, dispatch} = useContext(AppContext);
    let {viewedPortion, foods, portions} = state;
    return (
        <Grid container className={classes.root}>
            <Grid item xs={8}>
                <Paper>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell colSpan={4}>
                                    <Toolbar>
                                        <Typography>Portions</Typography>
                                        <Button onClick={()=>dispatch({type: "ON_ADD_PORTION", payload: {}})}>
                                            <AddIcon />
                                        </Button>
                                        <Button onClick={()=>dispatch({type: "ON_DELETE_CHECKED_PORTIONS", payload: {}})}>
                                            <DeleteIcon />
                                        </Button>
                                    </Toolbar>
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Food</TableCell>
                                <TableCell>Portion (gr)</TableCell>
                                <TableCell>Date</TableCell>
                                <TableCell>Options</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                                {portions.map(portion=>
                                    <PortionRow key={portion.value.id||`new-${new Date()}`}
                                        portion={{
                                            ...portion,
                                            // foodName: foods.find(food=>food.value.id==portion.value.foodId).value.name
                                        }}
                                        foods={foods}
                                        onCheck={(id)=>dispatch({type: "ON_PORTION_ROW_CHECK", payload: {id}})} 
                                        onDelete={(id)=>dispatch({type: "ON_PORTION_DELETE", payload: {id}})}
                                        onEdit={(id)=>dispatch({type: "ON_PORTION_ROW_EDIT", payload: {id}})}
                                        onEditDone={(id)=>dispatch({type: "ON_PORTION_ROW_EDIT_DONE", payload: {id}})}
                                        onEditBreak={(id)=>dispatch({type: "ON_PORTION_ROW_EDIT_BREAK", payload: {id}})}
                                        handleChange={(key, value)=>dispatch({type: "HANDLE_PORTION_ROW_EDIT_CHANGE", payload: {id: portion.value.id, key, value}})}
                                    />
                                )}
                            </TableBody>
                    </Table>
                </Paper>
            </Grid>
            {viewedPortion.show&&
            <Grid item xs={4}>
                <PortionCard />
            </Grid>
            }
        </Grid>
    )    
}

function PortionRow({
    foods,
    portion, 
    onCheck, 
    onDelete,
    onEdit,
    onEditDone,
    onEditBreak,
    handleChange
}) {
    const {foodName='', isEditing=false, isAdding=false, isChecked=false, value, old} = portion;
    const {id, foodId, gram, date} = value;
    return (
        <TableRow>
            <TableCell>
                <Checkbox disabled={isEditing} checked={isChecked} onChange={()=>onCheck(id)} value={id}/>
                {isEditing || isAdding ? (
                    <Select value={portion.value.foodId} onChange={(e)=>handleChange("foodId", e.target.value)}>
                        <MenuItem value="" disabled>None</MenuItem>
                        {foods.map(food=>
                            <MenuItem value={food.value.id} key={food.value.id}>{food.value.name}</MenuItem>
                        )}
                    </Select>
                ) : (
                    foods.find(food=>food.value.id==portion.value.foodId).value.name
                )}
            </TableCell>
            <TableCell>
                {isEditing || isAdding? (
                    <TextField value={gram} onChange={(e)=>handleChange("gram", e.target.value)} />
                ) : (
                    gram
                )}
            </TableCell>
            <TableCell>
                {isEditing || isAdding ? (
                    <KeyboardDatePicker variant='inline' value={new Date(date)} format={'yyyy-MM-dd'} onChange={(date)=>handleChange("date", format(date, dateFormat))} />
                ) : (
                    date
                )
            }
            </TableCell>
            <TableCell>
                {!isEditing && !isAdding ? (
                    <Toolbar>
                        <Button onClick={()=>onDelete(id)}>
                            <DeleteIcon />
                        </Button>
                        <Button onClick={()=>onEdit(id)}>
                            <EditIcon />
                        </Button>
                    </Toolbar>
                ) : (
                    <Toolbar>
                        <Button onClick={()=>onEditDone(id)}>
                            <DoneIcon />
                        </Button>
                        <Button onClick={()=>onEditBreak(id)}>
                            <CloseIcon />
                        </Button>
                    </Toolbar>
                )}
            </TableCell>
        </TableRow>
    )
}