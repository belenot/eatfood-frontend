import React, { useContext } from "react"
import { AppContext } from "../../App"
import { Card, TextField, Button, CardContent, CardHeader, Tabs, Tab, Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles({
    root: {
        height: "100%",
        marginTop: "20vh"
    }
})

export function AuthenticationPanel() {
    const { state, dispatch, api } = useContext(AppContext);
    const { authenticationPage } = state;
    const { authentication, registration, page, error } = authenticationPage;
    const classes = useStyles();
    function handleChange(page, key, value) {
        dispatch({type: "AUTHENTICATION_PAGE_TYPE", payload: {page, key, value}});
    }
    function handleChangePage(event, page) {
        dispatch({type: 'AUTHENTICATION_PAGE_CHANGE', payload: {page}});
    }
    function submit(page) {
        switch (page) {
            case 'authentication': {
                api.authenticate(authentication,
                    clientModel=>dispatch({type: 'AUTHENTICATION_PAGE_SIGNIN_OK', payload: {clientModel}}),
                    error=>dispatch({type: 'AUTHENTICATION_PAGE_SIGNIN_ERROR', payload: {error}})
                )
                break;
            }
            case 'registration': {
                api.registrate(registration,
                    clientModel=>dispatch({type: 'AUTHENTICATION_PAGE_SIGNUP_OK', payload: {clientModel}}),
                    error=>dispatch({type: 'AUTHENTICATION_PAGE_SIGNUP_ERROR', payload: {error}})
                )
                break;
            }
        }
    }
    return (
        <Grid container id={`${page}-page`} alignItems='center' direction='column' className={classes.root}>
            <Grid item container justify='center'>
                <Grid item>
                    <Tabs value={page} onChange={handleChangePage}>
                        <Tab label='Sign in' value='authentication' />
                        <Tab label='Sign up' value='registration' />
                    </Tabs>
                </Grid>
            </Grid>
            <Grid container item direction='column' component='form' id={`${page}-form`} wrap='nowrap' alignItems='center'>
                <Grid item xs={3}>
                    <TextField
                        name='login' 
                        onChange={e=>handleChange(page, "login", e.target.value)} 
                        label="Login"
                        value={authenticationPage[page].login}
                    />
                </Grid>
                <Grid item xs={3}>
                    <TextField
                        name='login' 
                        onChange={e=>handleChange(page, "password", e.target.value)} 
                        label="Password"
                        value={authenticationPage[page].password}
                        type='password'
                    />
                </Grid>
                {page=='registration'&&
                <Grid item xs={3}>
                    <TextField
                        name='name' 
                        value={authenticationPage['registration'].name}
                        onChange={e=>handleChange(page, "name", e.target.value)} 
                        label="Name"
                    />
                </Grid>
                }
                <Grid item xs={3}>
                    <Button onClick={()=>submit(page)}>{page}</Button>
                </Grid>
                <Grid item>
                    {error&&<Typography color='error'>{error}</Typography>}
                </Grid>
            </Grid>
        </Grid>
    )
}