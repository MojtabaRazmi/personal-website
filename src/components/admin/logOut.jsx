import React, {Component} from 'react';

class LogOut extends Component {

    componentDidMount() {
        localStorage.removeItem('token');
        window.location= '/';
    }

    render() {
        return (
            <div>

            </div>
        );
    }
}

export default LogOut;