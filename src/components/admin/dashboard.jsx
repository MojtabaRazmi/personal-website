import React, { Component } from 'react';
import Navbar from './navbar';
import Sidebar from './sidebar';
import {
    Switch,
    Route,
} from 'react-router-dom'
import CreateCourse from "./createCourse";
import AllPosts from "./allPosts";
import CreatePosts from "./create-posts";
import AllCourses from "./allcourses";


class Dashboard extends Component {
    render() {
        return (
            <div className="container-fluid rtl">
                <Navbar/>
                <div className="row">
                    <Sidebar/>
                    <main role='main' className='col-md-9 ml-sm-auto col-lg-10 px-4'>
                        <Switch>
                            <Route path='/admin/create-post' component={CreatePosts}/>
                            <Route path='/admin/allPosts' component={AllPosts}/>
                            <Route path='/admin/create-course' component={CreateCourse}/>
                            <Route path='/admin/allCourses' component={AllCourses}/>
                        </Switch>
                    </main>
                </div>
            </div>

        );
    }
}

export default Dashboard;
