import React,{Component} from 'react';
import axios from "axios";
import mineRouting from "../configRouting";
import paginate from "../utils/paginate";
import Pagination from "./pagination";



class Courses extends Component{

    state={
        courses:'',
        currentPage:1,
        pageSize:5
    };

    async componentDidMount() {
    const {data} = await axios.get(mineRouting.api_getCourses);

    this.setState({courses: data})
    }

    getPageData=()=>{
        const {pageSize,currentPage,courses: allCourses } = this.state;
        const result = paginate(pageSize,currentPage,allCourses);

        return{
            totalCount : allCourses.length,
            paginateCourses : result
        }
    };

    render(){
        const {pageSize ,currentPage}= this.state;
        const {totalCount,paginateCourses} = this.getPageData();
        const {length : count } = this.state.courses;

        if(count === 0){
            return(
                <div className='m-5'>
                    <p>هیچ پستی برای نمایش وجود ندارد</p>
                </div>

            )
        }

        return(
            <div className="container-fluid">
                <div className="row">
                    {paginateCourses.map(paginateCourse => (
                        <div
                            className="col-lg-3 col-md-4 col-sm-6 col-xs-6 card m-2"
                            key={paginateCourse._id}
                        >
                            <div className="card-img">
                                <img
                                    className="img-fluid img-thumbnail"
                                    src={paginateCourse.courseImageUrl}
                                    alt=""
                                />
                            </div>

                            <div className="card-title">
                                <p className="text-center m-2">{paginateCourse.courseTitle}</p>
                            </div>

                            <div className="card-footer">
                                <span className="fa fa-clock-o m-1" />
                                {paginateCourse.courseTime}

                                <span className="badge badge-pill m-1 badge-primary float-left">
                                {paginateCourse.coursePrice}
                            </span>
                            </div>
                        </div>
                    ))}
                    <Pagination
                        totalCount = {totalCount}
                        pageSize = {pageSize}
                        currentPage = {currentPage}
                        onPageChange ={this.handlePageChange}
                    />
                </div>
            </div>
        )
    }
};

export default Courses;
