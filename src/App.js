import React, { Component } from 'react';
import Navbar from './components/navbar';
import Sidebar from './components/sidebar';
import Posts from './components/posts';
import Footer from './components/footer';
import {Route , Switch , Redirect} from 'react-router-dom'
import Courses from "./components/cources";
import Education from "./components/education";
import Contact from "./components/contact";
import About from "./components/about";
import Skills from "./components/skills";
import Notfound from "./components/not-found";

class App extends Component {
  render() {
    return (
        <div className="container-fluid rtl">
            <Navbar/>
          <div className="row">
            <Sidebar/>
            <main role='main' className='col-md-9 ml-sm-auto col-lg-10 px-4'>
                <Switch>
                    <Route path = '/courses' component={Courses}/>
                    <Route path = '/about' component={About}/>
                    <Route path = '/contact' component={Contact}/>
                    <Route path = '/education' component={Education}/>
                    <Route path = '/skills' component={Skills}/>
                    <Route path='/not-found' component={Notfound}/>
                    <Route path = '/' exact component ={Posts} />
                    <Redirect to='/not-found'/>
                </Switch>
            </main>
          </div>
            <Footer/>
        </div>

    );
  }
}

export default App;
