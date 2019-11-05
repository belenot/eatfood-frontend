import DateFnsUtils from '@date-io/date-fns';
import { Container } from '@material-ui/core';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import { makeStyles } from '@material-ui/styles';
import React from 'react';
import { api } from './api/api';
import './App.css';
import { useSelector} from 'react-redux';
import AuthenticationPage from './components/AuthenticationPage';


window.api = api;

export const AppContext = React.createContext();

const useStyles = makeStyles({
  container: {
    height: "100%"
  }
})

function App() {
  const classes = useStyles();
  const domain = useSelector(store=>store.domain);
  console.log(domain);

  return (
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <Container id="app-container">
          <AuthenticationPage />
        </Container>
      </MuiPickersUtilsProvider>
  );
}

export default App;
