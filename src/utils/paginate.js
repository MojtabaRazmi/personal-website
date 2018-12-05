import _ from 'lodash';

const paginate = (pageSize,currentPage,posts) => {
    const startIndex = (currentPage -1)*pageSize;
    return ( _(posts).slice(startIndex).take(pageSize).value());
}
 
export default paginate;