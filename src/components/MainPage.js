import {useSelector, useDispatch} from 'react-redux';
import { AppBar, Tabs, Tab, Toolbar, Button, Icon, Grid } from '@material-ui/core';
import { handleMainPage } from '../actions';

import AccountBoxIcon from '@material-ui/icons/AccountBox';
import FastfoodIcon from '@material-ui/icons/Fastfood';
import KitchenIcon from '@material-ui/icons/Kitchen';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

function MainPage() {
    const store = useSelector(store=>store.mainPage);
    const {activePage} = store;
    const dispatch = useDispatch();

    return (
        <AppBar position='static'>
            <Grid container>
                <Grid item xs={6}>
                    <Tabs 
                        value={activePage} 
                        onChange={ 
                            function(e, value) {
                                dispatch(handleMainPage(state=>({
                                    ...state,
                                    activePage: value
                                })))
                            }
                        }
                    >
                        <Tab value="profilePage" label='Profile' icon={(<AccountBoxIcon />)}/>
                        <Tab value="foodsPage" label='Foods' icon={(<KitchenIcon />)}/>
                        <Tab value="portionsPage" label='Portions' icon={(<FastfoodIcon />)}/>
                    </Tabs>
                </Grid>
                <Grid item container xs={6} justify='flex-end' alignItems='center'>
                    <Grid item>
                        <Button 
                            onClick={
                                function() {
                                    fetch("/logout")
                                    .then(()=>window.location.reload());
                                }
                            } 
                            
                        >
                            <ExitToAppIcon />
                            Logout
                        </Button>
                    </Grid>
                </Grid>
            </Grid>
        </AppBar>
    )
}

export default MainPage;