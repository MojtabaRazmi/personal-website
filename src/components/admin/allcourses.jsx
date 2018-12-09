import React, {Component} from 'react';
import paginate from "../../utils/paginate";
import Pagination from './../pagination'
import {Table, Button} from 'reactstrap'
import axios from 'axios';

import mineRouting from './../../configRouting'
import {toast} from "react-toastify";

class AllPosts extends Component {
    state = {
        courses: [],
        currentPage: 1,
        pageSize: 5
    };

    async componentDidMount() {
        const {data} = await axios.get(mineRouting.api_getCourses);

        this.setState({courses: data})
    }

    getPageData = () => {
        const {pageSize, currentPage, courses: allCourses} = this.state;
        const result = paginate(pageSize, currentPage, allCourses);

        return {
            totalCount: allCourses.length,
            paginateCourses: result
        }
    };

    handlePageChange = (page) => {
        this.setState({currentPage: page})
    };

    handleDelete = async deleteID => {
        const editedState = this.state.courses.filter(p => deleteID !== p._id);
        const originalState = this.state.courses;

        this.setState({courses: editedState});
        try {
            const deleteCourse = await axios.delete(
                mineRouting.api_deleteCourse + '/' + deleteID,
                deleteID
            );

            if (deleteCourse.status === 200)
                return toast('حذف پست با موفقیت انجام شد')
        } catch (e) {
            if (e.response && e.response.status === 404) {
                toast.error('پستی با این شناسه یافت نشد');

                this.setState({courses: originalState})
            }
        }
    };

    handleRedirect = (course)=>{
        this.props.history.push({
            pathname : '/admin/edit-course',
            course
        })
    };

    render() {
        let count = 1;

        const {totalCount, paginateCourses} = this.getPageData();
        const {pageSize, currentPage} = this.state;
        return (
            <div className='bg-light m-3 p-4 border rounded'>
                <Table className='table'>
                    <thead>
                    <tr>
                        <th>ردیف</th>
                        <th>عنوان دوره</th>
                        <th>مدت زمان دوره</th>
                        <th>قیمت دوره</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        paginateCourses.map(paginateCourse => (
                            <tr key={paginateCourse._id}>
                                <th scope='row'>
                                    {count++}
                                </th>
                                <td>{paginateCourse.courseTitle}</td>
                                <td>{paginateCourse.courseTime}</td>
                                <td>{paginateCourse.coursePrice}</td>
                                <td>
                                    <Button
                                        className='btn btn-success'
                                        onClick={()=>this.handleRedirect(paginateCourse)}>
                                        ویرایش
                                    </Button>
                                </td>
                                <td>
                                    <Button
                                        className='btn btn-danger'
                                        onClick={() => this.handleDelete(paginateCourse._id)}
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

