import React from 'react';
import _ from 'lodash'
import propTypes from 'prop-types';

const Pagination = ({totalCount , pageSize , currentPage , onPageChange}) => {

    const pageCount = Math.ceil(totalCount/pageSize);
    const pages = _.range(1,pageCount+1)
    
    if (pageCount ===1) return null;

    return ( 
        <nav>
            <ul className='pagination justify-content-center'>
                {
                    pages.map(page=>(
                        <li className={
                            currentPage===page
                            ? 'page-item mine active'
                            : 'page-item mine'
                        }
                        key={page}>
                            <a className='page-link' onClick={()=>onPageChange(page)}>
                                {page}
                            </a>
                        </li>
                    ))
                }
            </ul>
        </nav>
    );
}

Pagination.propTypes ={
    totalCount : propTypes.number.isRequired,
    pageSize : propTypes.number.isRequired,
    currentPage : propTypes.number.isRequired,
    onPageChange : propTypes.func.isRequired
};
 
export default Pagination;