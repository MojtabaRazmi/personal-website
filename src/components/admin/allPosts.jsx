import React,{Component} from 'react';
import paginate from "../../utils/paginate";
import Pagination from './../pagination'
import {Table, Button} from 'reactstrap'
import getPosts from "../../services/fakePosts";

class AllPosts extends Component {
    state={
        posts:[],
        currentPage:1,
        pageSize:5
    };
    componentDidMount() {
        const posts = getPosts();
        this.setState({posts})
    }

    getPageData=()=>{
        const {pageSize,currentPage,posts: allPosts } = this.state;
        const result = paginate(pageSize,currentPage,allPosts);

        return{
            totalCount : allPosts.length,
            paginatePosts : result
        }
    };
    handlePageChange = (page)=>{
        this.setState({currentPage : page})
    };

    render(){
        const {totalCount,paginatePosts}=this.getPageData();
        const {pageSize ,currentPage}= this.state;
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
                            <tr key={paginatePost.id}>
                                <th scope='row'>
                                    {paginatePost.id}
                                </th>
                                <td>{paginatePost.postTitle}</td>
                                <td>{paginatePost.postDate}</td>
                                <td>{paginatePost.like}</td>
                                <td>
                                    <Button className='btn btn-success'>
                                        ویرایش
                                    </Button>
                                </td>
                                <td>
                                    <Button className='btn btn-danger'>
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

