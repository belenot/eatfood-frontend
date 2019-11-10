import { Grid, Input, Tab, Tabs, TextField, CircularProgress, Typography, makeStyles } from "@material-ui/core";
import { useDispatch, useSelector } from 'react-redux';
import { handleAuthenticationPage, OK_STATUS, registrate, REQUEST_STATUS, authenticate, ERR_STATUS } from "../actions";
import { height } from "@material-ui/system";

const useStyles = makeStyles({
    root: {
        alignItems: 'center',
        height: '100%'
    },
    form: {
        alignItems: 'center'
    }
})

function AuthenticationPage () {
    const classes = useStyles();
    const store = useSelector(state=>state.authenticationPage);
    const {activePage, inputs, client, authenticationError, registrationError} = store;
    const {username, password} = inputs;
    const {isAuthenticated, isAuthenticating, isRegistrating} = client;
    const dispatch = useDispatch();
    
    return (
        <Grid container className={classes.root} direction='column'>
            <Grid item xs={3} />
            <Grid item container direction='column' xs={9} alignItems='center'>
                <Tabs value={activePage} onChange={(e,value)=>dispatch(handleAuthenticationPage(store=>({...store, activePage: value})))}>
                    <Tab label="Registration" value="registrationPage"/>
                    <Tab label="Authentication" value="authenticationPage"/>
                </Tabs>
                {activePage=='registrationPage' ? 
                (
                    <Grid 
                        component="form"
                        item
                        container
                        direction="column"
                        hidden={activePage!='registrationPage'}
                        className={classes.form}
                        onSubmit={ 
                            function(e) {
                                e.preventDefault();
                                dispatch(registrate(null, REQUEST_STATUS));
                                fetch(
                                    "/user/registration",
                                    {
                                        method: 'POST',
                                        headers: {
                                            'Content-Type': 'application/json'
                                        },
                                        body: JSON.stringify({username, password})
                                    }
                                )
                                .then(r=>r.json())
                                .then(
                                    function(client) {
                                        if (client!=null && client.id > 0) {
                                            dispatch(registrate(client, OK_STATUS))
                                        } else {
                                            dispatch(registrate(null, ERR_STATUS, "Can't registrate"))
                                        }
                                    }
                                )
                                .catch(
                                    function(){
                                        dispatch(registrate(null, ERR_STATUS, "Can't registrate"));
                                    }
                                )
                            }
                        }
                    >
                        <Grid item>
                            <TextField 
                                value={username} 
                                onChange={e=>dispatch(handleAuthenticationPage(handleInputs("username", e.target.value)))}
                                placeholder="username"
                            />
                        </Grid>
                        <Grid item>
                            <TextField 
                                value={password} 
                                onChange={e=>dispatch(handleAuthenticationPage(handleInputs("password", e.target.value)))}
                                placeholder="password"
                                type="password"
                            />
                        </Grid>
                        <Grid item>
                            {!isRegistrating ? (
                                <Input type='submit' value='registrate' />
                            ) : (
                                <CircularProgress />
                            )
                            }
                        </Grid>
                        {
                            registrationError&&
                            <Grid item>
                                <Typography color='error'>
                                    {registrationError}
                                </Typography>
                            </Grid>
                        }
                    </Grid>
                ) : activePage == 'authenticationPage' ? 
                (
                    <Grid 
                        component="form"
                        item
                        container
                        direction="column"
                        hidden={activePage!='authenticationPage'}
                        className={classes.form}
                        onSubmit={
                            function(e) {
                                e.preventDefault();
                                dispatch(authenticate(null, REQUEST_STATUS));
                                fetch(
                                    "/user/authentication",
                                    {
                                        method: 'POST',
                                        headers: {
                                            'Content-Type': 'application/json'
                                        },
                                        body: JSON.stringify({username, password})
                                    }
                                )
                                .then(r=>r.json())
                                .then(
                                    function (client) {
                                        if (client&&client.id>0){
                                            dispatch(authenticate(client,OK_STATUS));
                                        } else {
                                            dispatch(authenticate(null, ERR_STATUS, 'Wrong authentication'));
                                        }
                                    }
                                ).catch(
                                    function (err) {
                                        dispatch(authenticate(null, ERR_STATUS, "Can't authenticate"));
                                    }
                                )
                            }
                        }
                    >
                        <Grid item>
                            <TextField 
                                value={username} 
                                onChange={e=>dispatch(handleAuthenticationPage(handleInputs("username", e.target.value)))}
                                placeholder="username"
                            />
                        </Grid>
                        <Grid item>
                            <TextField 
                                value={password} 
                                onChange={e=>dispatch(handleAuthenticationPage(handleInputs("password", e.target.value)))}
                                placeholder="password"
                                type="password"
                            />
                        </Grid>
                        <Grid item>
                            {!isAuthenticating ? (
                                <Input type='submit' value='authenticate' />
                            ) : (
                                <CircularProgress />
                            )
                            }
                        </Grid>
                        {
                            authenticationError&&
                            <Grid item>
                                <Typography color='error'>
                                    {authenticationError}
                                </Typography>
                            </Grid>
                        }
                    </Grid>
                ) : 
                (
                    ''
                )
                }
            </Grid>
        </Grid>
    )
}

export default AuthenticationPage;

function handleInputs(key, value) {
    return function (store) {
        return ({...store, inputs: {...store.inputs,[key]: value}})
    }
}