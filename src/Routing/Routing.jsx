import React, { useEffect } from 'react'
import HomePage from '../Component/admin-component/home-page/HomePage'
import {Switch,Route,Redirect, useHistory } from "react-router-dom"
import TopNav from '../Component/admin-component/top-nav/TopNav'
import { LogIn } from '../Component/LogIn/LogIn';
import SideBar from '../Component/admin-component/sidebar/SideBar';
import './Routing.scss';
import CalendarPage from '../Component/admin-component/calendar-page/CalendarPage';
import StudentManagement from '../Component/admin-component/student-management/StudentManagement';
import CourseManagement from '../Component/admin-component/course-management/CourseManagement';
import { checkAuthenRole } from '../services/authen';

function Routing() {
const history = useHistory();

    useEffect(() => {
        if(!checkAuthenRole()) {
            history.push("/login")
        }
        else {
            history.push("/admin/home")
        }
    }, []);

    return (
        <div>
 {/* this is admin page */}
            <Switch>
            {!checkAuthenRole() && <Route path="/login">
                    <LogIn/>
            </Route>}
            { checkAuthenRole() && 
                <div className="root">
                    <div className="root-left">
                    <SideBar/>
                    </div>
                    <div className="root-right">
                        <TopNav/>
                        <div className="root-right_content">
                            <Route path="/admin/home"><HomePage/></Route>
                            <Route path="/admin/calendar-page" component={CalendarPage}/>
                            <Route path="/admin/student-management"><StudentManagement/></Route>
                            <Route path="/admin/course-management"><CourseManagement/></Route>
                        </div>
                        
                    </div>
                </div>
            }
            </Switch>
        </div>
           
    
    )
}

export default Routing
