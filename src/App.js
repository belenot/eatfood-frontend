import React, { useReducer } from 'react';
import './App.css';

import {Container, Grid} from '@material-ui/core'
import { initState, testState } from './utils/states';
import { reducer } from './utils/reducers';
import { Header } from './components/header/Header';
import { ContentPanel } from './components/content-panel/ContentPanel';
import { makeStyles } from '@material-ui/styles';

export const AppContext = React.createContext();

const useStyles = makeStyles({
  container: {
    height: "100%"
  }
})

function App() {
  const [state, dispatch] = useReducer(reducer, {...testState});
  const classes = useStyles();
  return (
      <AppContext.Provider value={{state, dispatch}}>
        <Container id="app-container">
          <Grid container >
          <Header />
          <ContentPanel />
          </Grid>
        </Container>
      </AppContext.Provider>
    
  );
}

export default App;
