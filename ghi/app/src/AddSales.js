import React from 'react';
import { Link } from 'react-router-dom';

class AddSales extends React.Component {

    render() {
        return (
            <div>
                <nav className="navbar navbar-expand navbar-light mt-5">
                    <div className="container-fluid">
                        <ul className="navbar-nav ml-auto">
                        <li className="nav-item">
                            <Link className="nav-link" to="/salesperson/new">
                            <img src="https://static.vecteezy.com/system/resources/thumbnails/000/376/259/small/Basic_Elements__28121_29.jpg" alt="Add salesperson" className="img-fluid rounded-circle" style={{ width: '50px', height: '50px' }} />
                            </Link>
                        </li>
                        </ul>
                    </div>
                </nav>
                <div className="mt-4">


                </div>
            </div>
        );
    }
}

export default AddSales;
