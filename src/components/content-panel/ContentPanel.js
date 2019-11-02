import styled from 'styled-components';
import React, { useContext, useState } from 'react';
import { useContentPanel } from "./useContentPanel";
import { AppContext } from "../../App";
import { FoodsPanel } from "./foods-panel/FoodsPanel";
import { Grid, AppBar, Tabs, Tab } from '@material-ui/core';
import { PortionsPanel } from './portions-panel/PortionsPanel';
import { ChartPanel } from './chart-panel/ChartPanel';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
    container: {
        height: "80%"
    }
})


export const ContentPanel = ({className}) => {
    const {state, dispatch} = useContext(AppContext);
    const [currentTab, setCurrentTab] = useState("foods");
    const classes = useStyles();
    function handleTabClick(event, tab) {
        console.log(tab);
        setCurrentTab(tab);
    }
    return (
        <Grid item container className={classes.container} direction="column" wrap='nowrap'>
            <Grid item container>
                <Grid item>
                    <Tabs onChange={handleTabClick} value={currentTab}>
                        <Tab label="Foods" value="foods"/>
                        <Tab label="Portions" value="portions"/>
                        <Tab label="Chart" value="chart"/>
                    </Tabs>
                </Grid>
            </Grid>
            <Grid item xs={12}>
                {
                    currentTab=='foods'?
                        <FoodsPanel/>:
                    currentTab=='portions'?
                        <PortionsPanel portions={state.portions}/>:
                    currentTab=='chart'?
                        <ChartPanel />:
                    ""
                }
            </Grid>
        </Grid>
    )
}