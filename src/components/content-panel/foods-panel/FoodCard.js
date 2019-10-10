import { Card, CardHeader, Avatar, CardMedia, CardContent, Grid, Typography, CardActions, IconButton, createStyles, makeStyles } from "@material-ui/core";
import CloseIcon from '@material-ui/icons/Close';
import React, { useContext } from "react";
import { AppContext } from "../../../App";
import { nutTemplates } from "../../../utils/states";

const useStyles = makeStyles({
    media: {
        height: 0,
        paddingTop: "56.5%"
    }
})

//Remove extra data
export function FoodCard() {
    const {state, dispatch} = useContext(AppContext);
    const { food, img } = state.viewedFood;
    const classes = useStyles();
    const norm = {...nutTemplates.common};
    function close() {
        dispatch({type: "CLOSE_VIEWED_FOOD"});
    }
    return (
        <Card>
            <CardHeader action={
                <IconButton aria-label="close" onClick={close}>
                    <CloseIcon />
                </IconButton>
            }>
                Food View
            </CardHeader>
            <CardMedia image={img} title={food.name} className={classes.media}/>
            <CardContent>
                <Grid container>
                    {[{key: "kcal", title: "Calories"}, 
                      {key: "prot", title: "Protein"}, 
                      {key: "carb", title: "Carbohydrate"}, 
                      {key: "fat", title: "Fat"}].map(field => 
                        <Grid container item key={field.key}>
                            <Grid item xs={6}>
                                <Typography>{field.title + ": "}</Typography>
                            </Grid>
                            <Grid item xs={3}>
                                <Typography>{food[field.key]}</Typography>
                            </Grid>
                            <Grid item xs={3}>
                                <Typography>{Number(food[field.key] / norm[field.key] * 100).toFixed(2) + "%"}</Typography>
                            </Grid>
                        </Grid>
                    )}
                </Grid>
            </CardContent>
        </Card>
    )
}