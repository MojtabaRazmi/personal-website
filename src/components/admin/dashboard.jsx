import React, { Component } from 'react';
import {
    Switch,
    Route,
} from 'react-router-dom'
import {ToastContainer} from 'react-toastify'

import Navbar from './navbar';
import Sidebar from './sidebar';
import CreateCourse from "./createCourse";
import AllPosts from "./allPosts";
import CreatePosts from "./create-posts";
import AllCourses from "./allcourses";
import EditPost from "./editPost";

import 'react-toastify/dist/ReactToastify.css'
import EditCourse from "./editCourse";


class Dashboard extends Component {
    render() {
        return (

            <div className="container-fluid rtl">
                <ToastContainer/>
                <Navbar/>
                <div className="row">
                    <Sidebar/>
                    <main role='main' className='col-md-9 ml-sm-auto col-lg-10 px-4'>
                        <Switch>
                            <Route path='/admin/create-post' component={CreatePosts}/>
                            <Route path='/admin/allPosts' component={AllPosts}/>
                            <Route path='/admin/create-course' component={CreateCourse}/>
                            <Route path='/admin/allCourses' component={AllCourses}/>
                            <Route path='/admin/editPost' component={EditPost}/>
                            <Route path='/admin/edit-course' component={EditCourse}/>
                        </Switch>
                    </main>
                </div>
            </div>

        );
    }
}

export default Dashboard;
