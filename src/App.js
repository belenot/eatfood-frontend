import DateFnsUtils from '@date-io/date-fns';
import { Container } from '@material-ui/core';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import { makeStyles } from '@material-ui/styles';
import React, { useEffect } from 'react';
import { api } from './api/api';
import './App.css';
import { useSelector, useDispatch } from 'react-redux';
import AuthenticationPage from './components/AuthenticationPage';
import { authenticate, OK_STATUS } from './actions';
import MainPage from './components/MainPage';


window.api = api;

export const AppContext = React.createContext();

const useStyles = makeStyles({
  container: {
    height: "100%"
  }
})
//make useEffect, chec if client is authenticated in current session
function App() {
  const classes = useStyles();
  const domain = useSelector(store=>store.domain);
  const dispatch = useDispatch();
  const {isAuthenticated} = useSelector(store=>store.authenticationPage).client;
  useEffect(()=>{
    fetch("/user/me")
      .then(r=>r.json())
      .then(client=>{
        if (client&&client.id > 0){
          dispatch(authenticate(client, OK_STATUS))
        }
      })
      .catch(console.log);
  }, []);

  return (
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <Container id="app-container">
          {!isAuthenticated ? (
            <AuthenticationPage />
          ) : (
            <MainPage />
          )
          }
        </Container>
      </MuiPickersUtilsProvider>
  );
}

export default App;
