import React, { Component } from 'react';
import axios from 'axios';
import mineRouting from './../configRouting'

class Like extends Component {
    state = { 
        postState:this.props.post
    };



    handleLikeClick=async likedID=>{
        const originalState = this.state.postState;
        let likePost = {...this.state.postState};
        likePost.like ++;
        this.setState({postState : likePost});

        try {
            await axios.put(
                mineRouting.api_likePost+'/like/'+likedID);
        }
        catch (e) {
            this.setState({postState : originalState})
        }
    };

    render() { 
        const {postState} = this.state;
        return ( 
            <div className='fa fa-heart float-left'
            style={{color : 'red', cursor:'pointer'}}
            onClick={()=>this.handleLikeClick(postState._id)}>
                <badge className='badge-primary badge-pill m-1'>
                    {postState.like}
                </badge>
            </div>
        );
    }
}
 
export default Like;