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
import SemesterManagement from '../Component/admin-component/semester-management/SemesterManagement';
import OpenCourse from '../Component/admin-component/open-course/OpenCourse';
import ClassManagement from '../Component/admin-component/class-management/ClassManagement';
import FrontTopNav from '../Component/front-component/front-top-nav/TopNav';
import SignUpSubject from '../Component/front-component/sign-up-subject/SignUpSubject';

function Routing() {
const history = useHistory();

    useEffect(() => {

        if(!checkAuthenRole()) history.push("/login")
        if(checkAuthenRole() === "ADMIN") history.push("/admin/home")
        if(checkAuthenRole() === "USER") console.log("==USER==")

    }, []);

    return (
        <div>
 {/* this is admin page */}
            <Switch>

            {checkAuthenRole() === "USER" && 
                <div>
                    <FrontTopNav/>
                    <div className="center-page">
                        <Route path="/front/sign-up-subject"><SignUpSubject/></Route>
                    </div>
                </div>            
            }

            {!checkAuthenRole()  && 
            <Route path="/login">
                    <LogIn/>
            </Route>}

            { checkAuthenRole() === "ADMIN" && 
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
                            <Route path="/admin/semester-management"><SemesterManagement/></Route>
                            <Route path="/admin/open-course"><OpenCourse/></Route>
                            <Route path="/admin/class-management"><ClassManagement/></Route>
                        </div>
                        
                    </div>
                </div>
            }
            </Switch>
        </div>
           
    
    )
}

export default Routing
