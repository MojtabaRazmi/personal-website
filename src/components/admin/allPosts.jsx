import React,{Component} from 'react';
import paginate from "../../utils/paginate";
import Pagination from './../pagination'
import {Table, Button} from 'reactstrap'
import axios from 'axios';
import mineRouting from './../../configRouting';
import {toast} from "react-toastify";

class AllPosts extends Component {
    state={
        posts:[],
        currentPage:1,
        pageSize:5
    };

    getPageData=()=>{
        const {pageSize,currentPage,posts: allPosts } = this.state;
        const result = paginate(pageSize,currentPage,allPosts);

        return{
            totalCount : allPosts.length,
            paginatePosts : result
        }
    };

    async componentDidMount() {
        const {data} = await axios.get(mineRouting.api_getPosts);
        this.setState({posts: data});

    }

    handlePageChange = (page)=>{
        this.setState({currentPage : page})
    };

    handleDelete=async deletePostID=>{
        const editedState = this.state.posts.filter(p=>deletePostID !==p._id);
        const originalState = this.state.posts;

        this.setState({posts :editedState});
        try{
            const deleteResult = await axios.delete(
                mineRouting.api_deletePost+'/'+deletePostID,
                deletePostID
            );

            if(deleteResult.status===200){
                toast('حذف پست با موفقیت انجام شد');
            }
        }
        catch (e) {
            if(e.response && e.response.status===404){
                toast.error('پستی با این شناسه یافت نشد');

                this.setState({posts : originalState})
            }
        }
    };

    handleRedirect=(post)=>{
        this.props.history.push({
            pathname : '/admin/editPost',
            post
        })
    };

    render(){
        const {totalCount,paginatePosts}=this.getPageData();
        const {pageSize ,currentPage}= this.state;
        let countID = 1;
        return(
            <div className='bg-light m-3 p-4 border rounded'>
                <Table className='table'>
                    <thead>
                        <tr>
                            <th>ردیف</th>
                            <th>عنوان پست</th>
                            <th>تاریخ انتشار</th>
                            <th>تعداد لایک</th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                        paginatePosts.map(paginatePost =>(
                            <tr key={paginatePost._id}>
                                <th scope='row'>
                                    {countID++}
                                </th>
                                <td>{paginatePost.postTitle}</td>
                                <td>{paginatePost.postDate}</td>
                                <td>{paginatePost.like}</td>
                                <td>

                                    <Button
                                        className='btn btn-success'
                                        onClick={()=>this.handleRedirect(paginatePost)}
                                    >
                                        ویرایش
                                    </Button>

                                </td>
                                <td>
                                    <Button
                                        className='btn btn-danger'
                                        onClick={()=>this.handleDelete(paginatePost._id)}
                                    >
                                        حذف
                                    </Button>
                                </td>
                            </tr>
                        ))
                    }
                    </tbody>
                    <Pagination
                        totalCount={totalCount}
                        pageSize={pageSize}
                        currentPage={currentPage}
                        onPageChange={this.handlePageChange}
                    />
                </Table>
            </div>
        );
    }

}

export default AllPosts;

