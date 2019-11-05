import { Grid, Paper, Card, TextField, Typography, Tabs, Tab, CardContent } from "@material-ui/core";
import { useSelector, useDispatch } from 'react-redux';
import { handleAuthenticationPage } from "../actions";

function AuthenticationPage () {
    const store = useSelector(state=>state.authenticationPage);
    const {activePage, inputs} = store;
    const {login, name, password} = inputs;
    const dispatch = useDispatch();
    
    return (
        <Grid container direction='column'>
            <Tabs value={activePage} onChange={(e,value)=>dispatch(handleAuthenticationPage(store=>({...store, activePage: value})))}>
                <Tab label="Registration" value="registrationPage"/>
                <Tab label="Authentication" value="authenticationPage"/>
            </Tabs>
            {activePage=='registrationPage' ? 
            (
                <Grid component="form" item container direction="column" hidden={activePage!='registrationPage'}>
                    <Grid item>
                        <TextField 
                            value={login} 
                            onChange={e=>dispatch(handleAuthenticationPage(handleInputs("login", e.target.value)))}
                            placeholder="login"
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
                        <TextField 
                            value={name} 
                            onChange={e=>dispatch(handleAuthenticationPage(handleInputs("name", e.target.value)))}
                            placeholder="name"
                        />
                    </Grid>
                </Grid>
            ) : activePage == 'authenticationPage' ? 
            (
                <Grid component="form" item container direction="column" hidden={activePage!='authenticationPage'}>
                    <Grid item>
                        <TextField 
                            value={login} 
                            onChange={e=>dispatch(handleAuthenticationPage(handleInputs("login", e.target.value)))}
                            placeholder="login"
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
                </Grid>
            ) : 
            (
                ''
            )
            }
        </Grid>
    )
}

export default AuthenticationPage;

function handleInputs(key, value) {
    return function (store) {
        return ({...store, inputs: {...store.inputs,[key]: value}})
    }
}