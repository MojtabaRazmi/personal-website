import React ,{Component} from 'react';
import {Form, Label,Button} from 'reactstrap';
import axios from 'axios';
import {toast} from "react-toastify";

import mineRouting from './../../configRouting'


class EditCourse extends Component {
    state={
        courseTitle :'',
        courseTime :'',
        coursePrice : '',
        courseImageUrl: '',
    };

    componentDidMount() {
        const {course}=this.props.location;
        if(!course) this.props.history.push('/admin/allCourses');

        this.setState({
            _id : course._id,
            courseTitle : course.courseTitle,
            coursePrice : course.coursePrice,
            courseImageUrl : course.courseImageUrl,
            courseTime : course.courseTime,

        })
    }

    handleSubmit=async e=>{
        e.preventDefault();

        const newState = {...this.state};
        delete newState._id;

        try{
            const createdCourse = await axios.put(
                mineRouting.api_editCourse+'/'+this.state._id,
                JSON.parse(JSON.stringify(newState))
            );

            if(createdCourse.status===200) {
                toast.success('دوره با موفقیت ویرایش شد')
            }
        }
        catch (e) {
            if(e.response && e.response===400){
                toast.error('ویرایش دوره با مشکل روبرو شد')
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
                    value={this.state.courseTitle}
                    onChange={(e)=>{
                        this.setState({courseTitle: e.target.value})
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
                    value={this.state.courseTime}
                    onChange={(e)=>
                        this.setState({courseTime :e.target.value})
                    }
                />
                <Label className='col-md-4 custom-control-label' htmlFor={'txtPrice'}>
                    قیمت دوره :
                </Label>
                <input
                    id='txtPrice'
                    name='coursePrice'
                    type='number'
                    placeholder=' قیمت'
                    className='form-control input-md m-2'
                    value={this.state.coursePrice}
                    onChange={(e)=>
                        this.setState({coursePrice :e.target.value})
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
                    value={this.state.courseImageUrl}
                    onChange={(e)=>this.setState({courseImageUrl:e.target.value})}
                />

                <Button
                    className='btn btn-success m-5'
                >
                    ویرایش دوره
                </Button>
            </Form>
        );
    }

}

export default EditCourse;