import React ,{Component} from 'react';
import {Form, Label,Button} from 'reactstrap';
import axios from 'axios';
import {toast} from "react-toastify";

import mineRouting from './../../configRouting'


class CreateCourse extends Component {
    state={
        title :'',
        time :'',
        price : '',
        imageUrl: '',
    };

    handleSubmit=async e=>{
        e.preventDefault();
        try{
            const createdCourse = await axios.post(
                mineRouting.api_createCourse,
                JSON.parse(JSON.stringify(this.state))
            );

            if(createdCourse.status===200) {
                toast.success('دوره با موفقیت اضافه شد')
            }
        }
        catch (e) {
            if(e.response && e.response===400){
                toast.error('افزودن دوره با مشکل روبرو شد')
            }
        }
    };
    render(){
        return (
            <Form className='form-group bg-light border rounded m-2 shadow p-5'
                  onSubmit = {this.handleSubmit}
            >
                <Label className='col-md-4 control-label' htmlFor='txtTitle'>
                    عنوان دوره :
                </Label>
                <input
                    id='txtTitle'
                    name='courseTitle'
                    type='text'
                    placeholder='عنوان'
                    className='form-control input-md m-2'
                    value={this.state.title}
                    onChange={(e)=>{
                        this.setState({title: e.target.value})
                    }}
                />
                <Label className='col-md-4 custom-control-label' htmlFor={'txtTime'}>
                    زمان دوره :
                </Label>
                <input
                    id='txtTime'
                    name='courseTime'
                    type='text'
                    placeholder=' زمان دوره'
                    className='form-control input-md m-2'
                    value={this.state.time}
                    onChange={(e)=>
                        this.setState({time :e.target.value})
                    }
                />
                <Label className='col-md-4 custom-control-label' htmlFor={'txtPrice'}>
                    قیمت دوره :
                </Label>
                <input
                    id='txtPrice'
                    name='coursePrice'
                    type='text'
                    placeholder=' قیمت'
                    className='form-control input-md m-2'
                    value={this.state.price}
                    onChange={(e)=>
                        this.setState({price :e.target.value})
                    }
                />
                <Label className='col-md-4 control-label mt-2' htmlFor='txtImageUrl'>
                    لینک عکس :
                </Label>

                <input
                    id='txtImageUrl'
                    name='courseImageUrl'
                    type='text'
                    className='form-control input-md m-2'
                    placeholder='لینک '
                    value={this.state.imageUrl}
                    onChange={(e)=>this.setState({imageUrl:e.target.value})}
                />



                <Button
                    className='btn btn-success m-5'
                >
                    ساخت دوره جدید
                </Button>
            </Form>
        );
    }

}

export default CreateCourse;
