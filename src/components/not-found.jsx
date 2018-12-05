import React from 'react';
import {Link} from "react-router-dom";

const Notfound = () => {
    return (
        <React.Fragment>
             <div id='notfound'>
                <div className="notfound">
                    <div className='notfound-404'>
                        <h1>404</h1>
                    </div>
                    <h2>
                        this page not exist
                    </h2>
                    <Link to='/'>
                        <br/>
                        <span className='arrow'/>
                        بازگشت به صفحه اصلی
                    </Link>
                </div>
             </div>
        </React.Fragment>
    );
};

export default Notfound;
