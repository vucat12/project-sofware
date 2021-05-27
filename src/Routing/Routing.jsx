import React, { useEffect } from 'react'
import HomePage from '../Component/admin-component/home-page/HomePage'
import {Switch,Route,Redirect, useHistory } from "react-router-dom"
import TopNav from '../Component/admin-component/top-nav/TopNav'
import { LogIn } from '../Component/LogIn/LogIn';
import SideBar from '../Component/admin-component/sidebar/SideBar';
import './Routing.scss';
import CalendarPage from '../Component/admin-component/calendar-page/CalendarPage';

function Routing() {

const history = useHistory();
useEffect(() => {
    history.push('/login');
});

    return (
        <div>
 {/* this is admin page */}
            <Switch>
            <Route path="/login">
                    <LogIn/>
            </Route>
            { window.location.pathname !== '/login' && 
                <div className="root">
                    <div className="root-left">
                    <SideBar/>
                    </div>
                    <div className="root-right">
                        <TopNav/>
                        <Route path="/home"><HomePage/></Route>
                        <Route path="/calendar-page"><CalendarPage/></Route>
                    </div>
                </div>}
            </Switch>
        </div>
           
    
    )
}

export default Routing
