import { Card, CardHeader, Avatar, CardMedia, CardContent, Grid, Typography, CardActions, IconButton, makeStyles } from "@material-ui/core";
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


//Change
export function PortionCard() {
    const {state, dispatch} = useContext(AppContext);
    const { portion, img } = state.viewedPortion;
    const food = portion.food;
    const classes = useStyles();
    console.log(portion);
    const norm = {...nutTemplates.common};
    function close() {
        dispatch({type: "CLOSE_VIEWED_PORTION"});
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
                        <Grid item xs={9}>
                            <Typography>{"Portion (gram): "}</Typography>
                        </Grid>
                        <Grid item xs={3}>
                            <Typography>{portion.gram}</Typography>
                        </Grid>
                </Grid>
                <Grid container>
                    {[
                        {key: "kcal", title: "Calories"}, 
                        {key: "prot", title: "Protein"}, 
                        {key: "carb", title: "Carbohydrate"}, 
                        {key: "fat", title: "Fat"}
                    ].map(field => 
                        <Grid container item key={field.key}>
                            <Grid item xs={6}>
                                <Typography>{field.title + ": "}</Typography>
                            </Grid>
                            <Grid item xs={3}>
                                <Typography>{Number(food[field.key] * portion.gram / 100).toFixed(2)}</Typography>
                            </Grid>
                            <Grid item xs={3}>
                                <Typography>{Number(food[field.key] / norm[field.key] * portion.gram).toFixed(2) + "%"}</Typography>
                            </Grid>
                        </Grid>
                    )}
                </Grid>
            </CardContent>
        </Card>
    )
}