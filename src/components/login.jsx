import React, {Component} from 'react';
import axios from 'axios';
import mineRouting from './../configRouting';
import toast from 'react-toastify';

class Login extends Component {
    state={
        email:'',
        password:''
    };

    handleSubmit = async e =>{
        e.preventDefault();
        try{
            const {data} = await axios.post(mineRouting.api_login,
                JSON.parse(JSON.stringify(this.state))
            );

            localStorage.setItem('token',data);
            this.props.history.push('/admin')
        }
        catch (e) {
            if(e.response && e.response===400)
                toast.error('ایمیل یا پسورد اشتباه است')
        }
    };

    render() {
        return (
            <form
                onSubmit={this.handleSubmit}
                className='rtl form-signin border rounded m-2 mx-auto bg-light shadow'>
                <h1 className='h3 mb-3 font-weight-normal'>
                    لطفا وارد شوید
                </h1>
                <label for="inputEmail" className='sr-only'>
                    آدرس ایمیل
                </label>
                <input
                    type='email'
                    id='inputEmail'
                    className='form-control'
                    placeholder='آدرس ایمیل'
                    required
                    autoFocus
                    onChange={(e)=>this.setState({email : e.target.value})}
                />
                <label for="inputPassword" className='sr-only'>
                    کلمه عبور
                </label>
                <input
                    type='password'
                    id='inputPassword'
                    className='form-control'
                    placeholder='کلمه عبور'
                    required
                    onChange={(e)=>this.setState({password : e.target.value})}
                />
                <button
                    className='btn btn-lg btn-primary btn-block'
                    type='submit'
                    onClick={this.handleLogin}
                >
                    ورود
                </button>
            </form>
        );
    }
}

export default Login;