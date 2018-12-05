import React from 'react';

const UserInfo = ({imgUrl,fullName,text}) => {
    return ( 
        <div className='text-center'>
            <img 
            src={imgUrl}
            className='img-thumbnail img-fluid'
            alt="via.placeholder.com"
            />
            <span className="card bg-danger shadow user-fullname">
                {fullName}
            </span>
            <p>
                {text}
            </p>
        </div>  
     );
}
 
export default UserInfo;