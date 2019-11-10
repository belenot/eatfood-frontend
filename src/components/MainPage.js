import {useSelector, useDispatch} from 'react-redux';
import { AppBar, Tabs, Tab, Toolbar, Button, Icon, Grid } from '@material-ui/core';
import { handleMainPage, getFoods, OK_STATUS, ERR_STATUS, REQUEST_STATUS } from '../actions';

import AccountBoxIcon from '@material-ui/icons/AccountBox';
import FastfoodIcon from '@material-ui/icons/Fastfood';
import KitchenIcon from '@material-ui/icons/Kitchen';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import FoodsTable from './FoodsTable';
import { useEffect } from 'react';

function MainPage() {
    const store = useSelector(store=>store.mainPage);
    const domain = useSelector(store=>store.domain);
    const {activePage} = store;
    const dispatch = useDispatch();
    useEffect(
        function() {
            dispatch(getFoods(null, REQUEST_STATUS));
            fetch(
                "/food/example",
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({authorId: domain.client.id})
                }
            )
            .then(r=>r.json())
            .then(
                function(foods) {
                    if (foods) {
                        dispatch(getFoods(foods, OK_STATUS));
                    } else {
                        dispatch(getFoods(null, ERR_STATUS, "Can't get foods"));
                    }
                }
            ).catch(
                function() {
                    dispatch(getFoods(null, ERR_STATUS, "Error while getting foods"));
                }
            )
        }, 
        []
    )

    return (
        <React.Fragment>
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
            <Grid container>
                {
                    activePage=='foodsPage'&&
                    <FoodsTable />
                }
            </Grid>
        </React.Fragment>
    )
}

export default MainPage;