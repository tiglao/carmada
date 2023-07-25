import React from 'react';
import { Link } from 'react-router-dom';

class ListSales extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            sales: [],
        }
        this.fetchSales = this.fetchSales.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }

    componentDidMount() {
        this.fetchSales();
    }

    async handleDelete(id){
        const response = await fetch(`http://localhost:8090/api/sales/${id}`, {
            method: 'DELETE',
        });

        if (response.ok) {
            this.fetchSales();
        } else {
        }
    }

    async fetchSales() {
        const response = await fetch('http://localhost:8090/api/sales/')
        if (response.ok) {
            const data = await response.json()
            console.log(data)
            this.setState({sales: data.sales})
        }
    }

    render() {
        return (
            <div>
                <h1>Sales</h1>
                <div className="mt-4">
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th>Salesperson</th>
                                <th>Customer</th>
                                <th>Automobile</th>
                                <th>Price</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        {this.state.sales.map(sales => {
                            return (
                                <tbody key={sales.id}>
                                    <tr className="col mb-3">
                                        <td>{sales.salesperson}</td>
                                        <td>{sales.customer}</td>
                                        <td>{sales.automobile}</td>
                                        <td>{sales.price}</td>
                                        <td><button onClick={() =>
                                            this.handleDelete(sales.id)} className="btn btn-link">Delete</button>
                                        </td>
                                    </tr>
                                </tbody>
                            );
                        })}
                    </table>

                    <div className="mt-5">
                        {this.state.sales.length < 1 ? (
                            <>
                                <p>There are no sales!</p>
                                <Link to="/sales/new">Add one here.</Link>
                            </>
                        ) : (
                            <>
                                <p>Need to add a new sale?</p>
                                <Link to="/sales/new">Add another here.</Link>
                            </>
                        )}
                    </div>
                </div>
            </div>
        );
    }
}

export default ListSales;
