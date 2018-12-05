import React, { Component } from 'react';
import getPosts from './../services/fakePosts';
import Like from './like';
import Pagination from './pagination';
// import Posts from './posts';
import paginate from './../utils/paginate';

class Posts extends Component {
    state = { 
        posts:[],
        currentPage:1,
        pageSize:5
    };
    componentDidMount(){
         const posts = getPosts();
         this.setState({
             posts
            //  posts:posts
         })
    }

    handlePageChange = (page)=>{
        this.setState({currentPage : page})
    };

    getPageData=()=>{
        const {pageSize,currentPage,posts: allPosts } = this.state;
        const result = paginate(pageSize,currentPage,allPosts);

        return{
            totalCount : allPosts.length,
            paginatePosts : result
        }
    };
    

    render() {
        const {pageSize ,currentPage}= this.state;
        const {totalCount,paginatePosts} = this.getPageData();
        const {length : count } = this.state.posts;

        if(count === 0){
            return(
                <div className='m-5'>
                    <p>هیچ پستی برای نمایش وجود ندارد</p>
                </div>

            )
        }
        return (
            <React.Fragment>
                {paginatePosts.map(paginatePost=>(
                    <div className='container-fluid' key={paginatePost.id}>
                        <div className='card shadow-lg lg-light m-2'>
                            <article className='p-3'>
                                <div className='card-header'>
                                    <h3 className='card-title'>
                                        <a href='#'>
                                            {paginatePost.postTitle}
                                        </a>
                                    </h3>
                                    <span className='card-subtitle'>
                                        <span className='fa fa-calendar m-2'/>
                                            {paginatePost.postDate}
                                    </span>
                                    <img className='card-img'
                                    src={paginatePost.postImageUrl}
                                    alt=''
                                    />   
                                </div>
                                <div className ='card-body'>
                                    <p className='card-text'>
                                        {paginatePost.postContent}
                                    </p>
                                </div>
                                <div className='card-footer'>
                                    <ul className='list-inline float-right'>
                                        <li className='list-inline-item'>
                                            <span className='fa fa-link m-1'/>
                                                برچسب ها :
                                        </li>
                                        <li className='list-inline-item mojiclass'>
                                            <a href='#'>
                                                {paginatePost.postTags}
                                            </a>
                                        </li>
                                    </ul>
                                    <Like post={paginatePost}/>
                                </div>
                            </article>
                        </div>
                    </div>
                ))}
                <Pagination 
                    totalCount = {totalCount}
                    pageSize = {pageSize}
                    currentPage = {currentPage}
                    onPageChange ={this.handlePageChange}
                />
            </React.Fragment>
        );
    }
}
 
export default Posts;