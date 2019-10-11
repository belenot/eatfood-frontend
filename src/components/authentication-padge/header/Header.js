import React, { useContext } from 'react';
import styled from 'styled-components';

import { AppContext } from '../../../App';
import { Grid, Typography, Button, Input } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { sizeHeight } from '@material-ui/system';

const useStyles = makeStyles({
    root: {

    },
    badge: {
        fontSize: "24pt"
    }
})

export const Header = ({className}) => {
    const {state, dispatch} = useContext(AppContext);
    const {login, name} = state.client;
    const classes = useStyles();
    function handleExitButton() {
        dispatch({type: "LOGOUT"});
    }
    return (
        <Grid item container className={classes.root}>
            <Grid item>
                <Typography className={classes.badge}>{name}</Typography>
            </Grid>
            <Grid item>
                <Button onClick={handleExitButton}>exit</Button>
            </Grid>
        </Grid>
    )
}