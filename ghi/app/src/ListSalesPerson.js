import React from 'react';
import { Link } from 'react-router-dom';

class ListSalesPerson extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            salespeople: [],
        }
        this.fetchSalespeople = this.fetchSalespeople.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }

    componentDidMount() {
        this.fetchSalespeople();
    }

    async handleDelete(sID){
        const response = await fetch(`http://localhost:8090/api/salespeople/${sID}`, {
            method: 'DELETE',
        });

        if (response.ok) {
            this.fetchSalespeople();
        } else {
        }

    }

    async fetchSalespeople() {
        const response = await fetch('http://localhost:8090/api/salespeople/')
        if (response.ok) {
            const data = await response.json()
            console.log(data)
            this.setState({salespeople: data.salesperson})
        }
    }

    render() {
        return (
            <div>
                <h1>Salespeople</h1>
                <div className="mt-4">
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Employee ID</th>
                                <th>Edit</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        {this.state.salespeople.map(salesperson => {
                            return (
                                <tbody key={salesperson.employee_id}>
                                    <tr className="col mb-3">
                                        <td>{salesperson.first_name}</td>
                                        <td>{salesperson.last_name}</td>
                                        <td>{salesperson.employee_id}</td>
                                        <td><button onClick={() =>
                                            this.handleEdit(salesperson.employee_id)} className="btn btn-link">Edit</button>
                                        </td>
                                        <td><button onClick={() =>
                                            this.handleDelete(salesperson.id)} className="btn btn-link">Delete</button>
                                        </td>
                                    </tr>
                                </tbody>
                            );
                        })}
                    </table>

                    <div className="mt-5">
                        {this.state.salespeople.length < 1 ? (
                            <>
                                <p>There are no salespeople</p>
                                <Link to="/salesperson/new">Add one here.</Link>
                            </>
                        ) : (
                            <>
                                <p>Need to add a new salesperson?</p>
                                <Link to="/salesperson/new">Add another here.</Link>
                            </>
                        )}
                    </div>
                </div>
            </div>
        );
    }
}

export default ListSalesPerson;
