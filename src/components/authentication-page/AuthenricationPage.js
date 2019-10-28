import React, { useContext } from "react"
import { AppContext } from "../../App"
import { Card, TextField, Button, CardContent, CardHeader, Tabs, Tab, Grid, Typography } from "@material-ui/core";

export function AuthenticationPanel() {
    const { state, dispatch, api } = useContext(AppContext);
    const { authenticationPage } = state;
    const { authentication, registration, page, error } = authenticationPage;
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
        <Grid container id={`${page}-page`}>
            <Grid item xs={12}>
                <Tabs value={page} onChange={handleChangePage}>
                    <Tab label='Sign in' value='authentication' />
                    <Tab label='Sign up' value='registration' />
                </Tabs>
            </Grid>
            <Grid container item xs={12} direction='column'>
                <Grid item>
                    <TextField
                        name='login' 
                        onChange={e=>handleChange(page, "login", e.target.value)} 
                        label="Login"
                        value={authenticationPage[page].login}
                    />
                </Grid>
                <Grid item>
                    <TextField
                        name='login' 
                        onChange={e=>handleChange(page, "password", e.target.value)} 
                        label="Password"
                        value={authenticationPage[page].password}
                        type='password'
                    />
                </Grid>
                {page=='registration'&&
                <Grid item>
                    <TextField
                        name='name' 
                        value={authenticationPage['registration'].name}
                        onChange={e=>handleChange(page, "name", e.target.value)} 
                        label="Name"
                    />
                </Grid>
                }
                <Grid item>
                    <Button onClick={()=>submit(page)}>{page}</Button>
                </Grid>
                <Grid item>
                    {error&&<Typography color='error'>{error}</Typography>}
                </Grid>
            </Grid>
        </Grid>
    )
}