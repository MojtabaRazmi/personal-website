import React ,{Component} from 'react';
import '../../css/navbar.css'
import {Link} from 'react-router-dom';
import axios from 'axios';
import mineRouting from '../../configRouting'


class NavBar extends Component{
    state={
        postCountState :'',
        courseCountState:''
    };

    async componentDidMount() {
        let {data : postCount} = await axios.get(mineRouting.api_postCount+'/count');
        let {data : courseCount} = await axios.get(mineRouting.api_courseCount+'/count');

        this.setState({
            postCountState : postCount.count,
            courseCountState : courseCount.count
        })
    }

    render(){
        return(
            <nav className=" navbar navbar-dark fixed-top bg-dark flex-md-nowrap shadow">
                <a className="navbar-brand col-sm-3 col-md-2 mr-0" href="#">
                    به پنل شخصی خوش آمدید
                </a>
                <p className='mt-2' style={{color: 'white'}}>
                    تعداد پست ها :
                    <span
                        className='badge badge-warning badge-pill m-1'>
                        {this.state.postCountState}</span>
                </p>
                <p className='mt-2' style={{color: 'white'}}>
                    تعداد دوره ها :
                    <span className='badge badge-warning badge-pill m-1'>
                        {this.state.courseCountState}
                    </span>
                </p>
                <ul className="navbar-nav px-3">
                    <li className="nav-item text-nowrap">
                        <Link className="nav-link" to="admin/logout">
                            خروج
                        </Link>
                    </li>
                </ul>
            </nav>
        )
    }


}

export default NavBar;

