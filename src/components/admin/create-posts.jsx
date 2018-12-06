import React, {Component} from 'react';
import {Form, Label,Button} from 'reactstrap'
import _ from 'lodash';
import axios from 'axios'
import {toast} from 'react-toastify';
import mineRouting from './../../configRouting'


class CreatePosts extends Component {
    state ={
        postTitle :'',
        postImageUrl : '',
        postContent :'',
        postTags : [],
    };

    handleSubmit=async params=>{
        params.preventDefault();

        try {
            const result = await axios.post(
                mineRouting.api_createPosts,
                JSON.parse(JSON.stringify(this.state)));


            if(result.status===200){
                toast.success('پست با موفقیت اضافه شد');
            }
        }
        catch (e) {
            if(e.response && e.response.status===400){
                toast.error('اضافه کردن پست با مشکلی مواجه شد')
            }
        }
    };

    render() {
        return (
            <Form className='form-group bg-light border rounded m-2 shadow p-5'
                  onSubmit = {this.handleSubmit}
            >
                <Label className='col-md-4 control-label' htmlFor='txtFile'>
                    عنوان پست :
                </Label>
                <input
                    id='txtFile'
                    name='postTitle'
                    type='text'
                    placeholder='عنوان'
                    className='form-control input-md m-2'
                    value={this.state.postTitle}
                    onChange={(e)=>{
                        this.setState({postTitle: e.target.value})
                    }}
                />
                <Label className='col-md-4 control-label mt-2' htmlFor='txtImageUrl'>
                     لینک عکس :
                </Label>

                <input
                    id='txtImageUrl'
                    name='PostImageUrl'
                    type='text'
                    className='form-control input-md m-2'
                    placeholder='لینک '
                    value={this.state.postImageUrl}
                    onChange={(e)=>this.setState({postImageUrl:e.target.value})}
                />

                <Label className='col-md-4 control-label mt-2' htmlFor='txtContent'>
                    متن پست :
                </Label>
                <textarea
                    id='txtContent'
                    name='postContent'
                    className='form-control m-2'
                    rows='5'
                    placeholder='متن '
                    value={this.state.postContent}
                    onChange={e=>
                        this.setState({postContent :e.target.value})
                    }
                />
                <Label className='col-md-4 custom-control-label' htmlFor={'txtTags'}>
                    برچسب ها :
                </Label>
                <input
                    id='txtTags'
                    name='postTags'
                    type='text'
                    placeholder=' برچسب ها'
                    className='form-control input-md m-2'
                    value={this.state.postTags}
                    onChange={(e)=>
                        this.setState({postTags :_.split(e.target.value,',')})
                    }
                />
                <Button
                    className='btn btn-success m-5'
                >
                    ارسال پست
                </Button>
            </Form>
        );
    }
}

export default CreatePosts;