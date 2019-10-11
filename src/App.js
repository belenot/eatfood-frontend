import React, { useReducer } from 'react';
import './App.css';

import {Container, Grid} from '@material-ui/core'
import { initState, testState } from './utils/states';
import { reducer } from './utils/reducers';
import { Header } from './components/authentication-padge/header/Header';
import { ContentPanel } from './components/content-panel/ContentPanel';
import { makeStyles } from '@material-ui/styles';
import { AuthenticationPanel } from './components/AuthenricationPage';
import { testApi } from './api/testApi';

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
  return (
      <AppContext.Provider value={{state, dispatch, api: testApi}}>
        <Container id="app-container">
          <Grid container alignItems='center' alignContent='center' justify='center'>
            {client.authenticated
            ?
            <React.Fragment>
              <Header />
              <ContentPanel />
            </React.Fragment>
            :
            <AuthenticationPanel /> 
            }
          </Grid>
        </Container>
      </AppContext.Provider>
    
  );
}

export default App;
