import {useDispatch, useSelector} from 'react-redux';
import { Table, TableHead, TableRow, TableCell, TableBody, Dialog, CircularProgress, TableFooter, Button, DialogActions, DialogContent } from '@material-ui/core';
import { useEffect } from 'react';
import { getFoods, REQUEST_STATUS, OK_STATUS, ERR_STATUS, handleMainPage } from '../actions';
import AddFoodForm from './AddFoodForm';

import AddIcon from '@material-ui/icons/Add';
import CloseIcon from '@material-ui/icons/Close';

function FoodsTable() {
    const store = useSelector(store=>store.mainPage);
    const domain = useSelector(store=>store.domain);
    const dispatch = useDispatch();
    return (
        <Table>
            <TableHead>
                <TableRow>
                    <TableCell>Food</TableCell>
                    <TableCell>Kilo Calories</TableCell>
                    <TableCell>Protein</TableCell>
                    <TableCell>Carbohydrate</TableCell>
                    <TableCell>Fat</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                <Dialog scroll='body' open={store.gettingFoods} >
                    <CircularProgress />
                </Dialog>
                <Dialog scroll='body' open={store.openAddFoodDialog}>
                    <DialogActions>
                        <Button 
                            onClick={
                                function() {
                                    dispatch(handleMainPage(
                                        function(state) {
                                            return {
                                                ...state,
                                                openAddFoodDialog: false
                                            }
                                        }
                                    ))
                                }
                        }
                        >
                           <CloseIcon /> 
                        </Button>
                    </DialogActions>
                    <DialogContent>
                        {store.addingFoodRequest ? (
                            <CircularProgress />
                        ) : (
                            <AddFoodForm />
                        )
                        }
                    </DialogContent>
                </Dialog>
                {domain.foods.map(food=>
                    <TableRow key={food.id}>
                        <TableCell>{food.name}</TableCell>
                        <TableCell>{food.nutrients.calories}</TableCell>
                        <TableCell>{food.nutrients.carbohydrate}</TableCell>
                        <TableCell>{food.nutrients.protein}</TableCell>
                        <TableCell>{food.nutrients.fat}</TableCell>
                    </TableRow>
                )}
            </TableBody>
            <TableFooter>
                <TableRow>
                    <TableCell colSpan={5}>
                        <Button 
                            onClick={
                                function() {
                                    dispatch(handleMainPage(
                                        function(state) {
                                            return {
                                                ...state,
                                                openAddFoodDialog: true
                                            }
                                        }
                                    ))
                                }
                            }
                        >
                            <AddIcon />
                        </Button>
                    </TableCell>
                </TableRow>
            </TableFooter>
        </Table>
    )
}

export default FoodsTable;