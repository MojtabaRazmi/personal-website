import React, {Component} from 'react';
import {Form, Label,Button} from 'reactstrap'
import _ from 'lodash';
import axios from 'axios'
import {toast} from 'react-toastify';
import mineRouting from './../../configRouting'


class EditPost extends Component {
    state ={
        _id:'',
        postTitle :'',
        postDate :'',
        postImageUrl : '',
        postContent :'',
        postTags : [],
        postLike:'',

    };

    componentDidMount() {
        const {post} = this.props.location;

        if(!post) return this.props.history.push('/admin/allPosts');

        this.setState({
            _id:post._id,
            postTitle :post.postTitle,
            postDate :post.postDate,
            postImageUrl :post.postImageUrl,
            postContent :post.postContent,
            postTags : post.postTags,
            postLike:post.postLike
        })
    }

    handleSubmit=async params=>{
        params.preventDefault();
        const newState = {...this.state};
        delete newState._id;

        try {
            const result = await axios.put(
                mineRouting.api_editPost +'/'+ this.state._id,
                JSON.parse(JSON.stringify(newState)));


            if(result.status===200){
                toast.success('پست با موفقیت ویرایش شد');
                this.props.history.push('/admin/allPosts')
            }
        }
        catch (e) {
            if(e.response && e.response.status===400){
                toast.error('ویرایش پست با مشکلی مواجه شد')
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
                    ویرایش پست
                </Button>
            </Form>
        );
    }
}

export default EditPost;