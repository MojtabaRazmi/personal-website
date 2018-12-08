import React,{Component} from 'react';
import paginate from "../../utils/paginate";
import Pagination from './../pagination'
import {Table, Button} from 'reactstrap'
import axios from 'axios';

import mineRouting from './../../configRouting'

class AllPosts extends Component {
    state={
        courses:[],
        currentPage:1,
        pageSize:5
    };
    async componentDidMount() {
        const {data} =await axios.get(mineRouting.api_getCourses);

        this.setState({data})
    }

    getPageData=()=>{
        const {pageSize,currentPage,courses: allCourses } = this.state;
        const result = paginate(pageSize,currentPage,allCourses);

        return{
            totalCount : allCourses.length,
            paginateCourses : result
        }
    };
    handlePageChange = (page)=>{
        this.setState({currentPage : page})
    };

    render(){
        const {totalCount,paginateCourses}=this.getPageData();
        const {pageSize ,currentPage}= this.state;
        return(
            <div className='bg-light m-3 p-4 border rounded'>
                <Table className='table'>
                    <thead>
                    <tr>
                        <th>ردیف</th>
                        <th>عنوان دوره</th>
                        <th>مدت زمان دوره </th>
                        <th>قیمت دوره</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        paginateCourses.map(paginateCourse =>(
                            <tr key={paginateCourse.id}>
                                <th scope='row'>
                                    {paginateCourse.id}
                                </th>
                                <td>{paginateCourse.title}</td>
                                <td>{paginateCourse.time}</td>
                                <td>{paginateCourse.price}</td>
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

