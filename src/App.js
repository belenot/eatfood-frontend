import React, { useReducer, useEffect } from 'react';
import './App.css';

import {Container, Grid} from '@material-ui/core'
import { initState, testState } from './utils/states';
import { reducer } from './utils/reducers';
import { Header } from './components/header/Header';
import { ContentPanel } from './components/content-panel/ContentPanel';
import { makeStyles } from '@material-ui/styles';
import { AuthenticationPanel } from './components/authentication-page/AuthenricationPage';
import { testApi } from './api/testApi';
import { api } from './api/api';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';

window.api = api;

export const AppContext = React.createContext();

const useStyles = makeStyles({
  container: {
    height: "100%"
  }
})

function App() {
  const [state, dispatch] = useReducer(reducer, {...testState});
  const client = state.client
  const classes = useStyles();
  // useEffect(function(){
  //   fetch("/client/me").then(function (response) {
  //     if (response.ok) {
  //       response.json().then(client=>dispatch({type: 'INIT_CLIENT_OK', payload: {client}}))
  //       api.getFoods(foods=>dispatch({type: 'INIT_FOODS_OK', payload: {foods}}));
  //       api.getPortions(portions=>dispatch({type: 'INIT_PORTIONS_OK', payload: {portions}}));
  //     } else {
  //       dispatch({type: 'INIT_CLIENT_ERROR'})
  //     }
  //   })
  // }, [])
  return (
      <AppContext.Provider value={{state, dispatch, api: api}}>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <Container id="app-container">
              {client.authenticated ?
              (
                <React.Fragment>
                <Header />
                <ContentPanel />
                </React.Fragment>
              ) : (
                <AuthenticationPanel /> 
              )}
          </Container>
        </MuiPickersUtilsProvider>
      </AppContext.Provider>
    
  );
}

export default App;
