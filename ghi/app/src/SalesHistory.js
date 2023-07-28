import React, { useState, useEffect } from 'react';

const SalesHistory = (props) => {
    const [form, setForm] = useState({
        salesperson: '',
        salespeople: [],
        sales: []
    });

    useEffect(() => {
        getArrays();
    }, []);

    const getArrays = async () => {
        let response = await fetch('http://localhost:8090/api/salespeople/')
        if (response.ok) {
            const data = await response.json();

            setForm(previousState => {
                return { ...previousState, salespeople: data.salesperson }
            });
        }

      response = await fetch('http://localhost:8090/api/sales/')
      if (response.ok) {
          const data = await response.json();
          setForm(previousState => {
            return { ...previousState, sales: data.sales }
        });
      }
    };

    const handleReset = (event) => {
      setForm({
        salesperson: '',
        salespeople: [],
        sales: []
      });
      getArrays();
    }

    const handleCancel = async (event) => {
      setForm({
          salesperson: '',
          salespeople: [],
          sales: []
        });
      getArrays();
    };

    const handleSalespersonChange = async (event) => {
        const value = event.target.value;
        setForm(previousState => {
            return { ...previousState, salesperson: value }
        });
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
    };

    function LoadForm(props) {
      return (
        <div className="row">
          <div className="offset-3 col-6">
            <div className="shadow p-4 mt-4">
              <h1>Salesperson History</h1>
              <form onSubmit={handleSubmit} id="create-customer-form">
                  <div className="mb-3">
                      <select onChange={handleSalespersonChange} required name="salespeople" id="salespeople" className="form-select">
                        <option>Choose a Salesperson:</option>
                        {form.salespeople.map(person => {
                          return (
                            <option key={person.id} value={person.id} style={{textTransform: 'capitalize'}}>
                              {person.first_name + " " + person.last_name}
                            </option>
                          );
                        })}
                      </select>
                  </div>
                  <button className="btn btn-primary">Create</button>
                  <button onClick={handleCancel} className="btn btn-secondary mx-2">Cancel</button>
              </form>
            </div>
          </div>
        </div>
      )
    }

    function LoadList(props) {
      return (
        <div>
          <h1>Sales</h1>
          <div className="mt-4">
              <table className="table table-striped">
                  <thead>
                      <tr>
                          <th>Salesperson</th>
                          <th>Customer</th>
                          <th>Automobile VIN</th>
                          <th>Price</th>
                      </tr>
                  </thead>

                  {form.sales.filter(sale => sale.salesperson.id === form.salesperson).map(sale => {
                      return (
                        <tbody key={sale.id}>
                            <tr className="col mb-3">
                                <td>{sale.salesperson.first_name + " " + sale.salesperson.last_name}</td>
                                <td>{sale.customer.first_name + " " + sale.customer.last_name}</td>
                                <td>{sale.automobile.vin}</td>
                                <td>{sale.price}</td>
                            </tr>
                        </tbody>
                      )
                  })}
              </table>
              <p>
                <button onClick={() => handleReset()} className="btn btn-link">
                    Reset
                </button></p>
            </div>
        </div>
      )
    }
    function LoadPage(props) {
    if (form.salesperson === '') {
        return <LoadForm />;
          } else {
        return <LoadList />;
        }
      }
    return LoadPage()
}

export default SalesHistory;
