import React, { Component } from 'react';

class Like extends Component {
    state = { 
        post:this.props.post
    };

    handleLikeClick=()=>{
        const likedPost ={...this.state.post};
        likedPost.like++;
        this.setState({post : likedPost})
    };

    render() { 
        const {post} = this.state;
        return ( 
            <div className='fa fa-heart float-left'
            style={{color : 'red', cursor:'pointer'}}
            onClick={this.handleLikeClick}>
                <badge className='badge-primary badge-pill m-1'>
                    {post.like}
                </badge>
            </div>
        );
    }
}
 
export default Like;