import React, { useState, useEffect } from 'react';

const AddSales = (props) => {
    const [form, setForm] = useState({
        employee_id: '',
        phone_number: '',
        vin: '',
        price: '',
        salesperson: [],
        customers: [],
        automobiles: []
    });

    useEffect(() => {
        getArrays();
    }, []);

    const getArrays = async () => {
        let response = await fetch('http://localhost:8090/api/customers/')
        if (response.ok) {
            const data = await response.json();
            setForm(previousState => {
                return { ...previousState, customers: data.customer }
            });
        }

        response = await fetch('http://localhost:8090/api/salespeople/')
        if (response.ok) {
            const data = await response.json();
                        setForm(previousState => {
                return { ...previousState, salesperson: data.salesperson }
            });
        }

        response = await fetch('http://localhost:8090/api/automobilevo/')
        if (response.ok) {
            const data = await response.json();
            setForm(previousState => {
                return { ...previousState, automobiles: data.automobiles }
            });
        }
    };

    const handleChange = (event) => {
        setForm({
          ...form,
          [event.target.name]: event.target.value
        });
    };

    const handleSalespersonChange = async (event) => {
        const value = event.target.value;
        setForm(previousState => {
            return { ...previousState, employee_id: value }
        });
    }

    const handleCustomerChange = async (event) => {
        const value = event.target.value;
        setForm(previousState => {
            return { ...previousState, phone_number: value }
        });
    }

    const handleAutomobileChange = async (event) => {
        const value = event.target.value;
        setForm(previousState => {
            return { ...previousState, vin: value }
        });
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        let data = {
          employee_id: form.employee_id,
          phone_number: form.phone_number,
          vin: form.vin,
          price: form.price
        };

        const url = 'http://localhost:8090/api/sales/';
        const fetchConfig = {
          method: "post",
          body: JSON.stringify(data),
          headers: {
            'Content-Type': 'application/json',
          },
        };
        const response = await fetch(url, fetchConfig);
        if (response.ok) {
          setForm({
            employee_id: '',
            phone_number: '',
            vin: '',
            price: '',
            salesperson: [],
            customers: [],
            automobiles: []
          });
        }
        getArrays()
    };

    const handleCancel = async (event) => {
      console.log("cancel")
      setForm({
          employee_id: '',
          phone_number: '',
          vin: '',
          price: '',
          salesperson: [],
          customers: [],
          automobiles: []
        });
    getArrays()
  };

    return (
      <div className="row">
        <div className="offset-3 col-6">
          <div className="shadow p-4 mt-4">
            <h1>Create a Sale</h1>
            <form onSubmit={handleSubmit} id="create-customer-form">
                <div className="mb-3">
                    <select onChange={handleSalespersonChange} required name="salesperson" id="salesperson" className="form-select">
                      <option>Choose a Salesperson:</option>
                      {form.salesperson.map(person => {
                        return (
                          <option key={person.id} value={person.employee_id} style={{textTransform: 'capitalize'}}>
                            {person.first_name + " " + person.last_name}
                          </option>
                        );
                      })}
                    </select>
                </div>
                <div className="mb-3">
                    <select onChange={handleCustomerChange} required name="customers" id="customers" className="form-select">
                      <option>Choose a Customer:</option>
                      {form.customers.map(customers => {
                        return (
                          <option key={customers.id} value={customers.phone_number} style={{textTransform: 'capitalize'}}>
                            {customers.first_name + " " + customers.last_name}
                          </option>
                        );
                      })}
                    </select>
                </div>
                <div className="mb-3">
                    <select onChange={handleAutomobileChange} required name="automobiles" id="automobiles" className="form-select" multiple={false}>
                      <option>Choose an automobile:</option>
                      {form.automobiles.map(automobiles => {
                        return (
                          <option key={automobiles.id} value={automobiles.vin} style={{textTransform: 'capitalize'}}>
                            {automobiles.vin}
                          </option>
                        );
                      })}
                    </select>
                </div>
                <div className="form-floating mb-3">
                    <input value={form.price} onChange={handleChange} placeholder="price" required type="text" name="price" id="price" className="form-control" />
                    <label htmlFor="price">Price</label>
                </div>
                <button className="btn btn-primary">Create</button>
                <a href="#" onClick={handleCancel} style={{marginLeft: '10px', color: 'gray', fontSize: '0.8em', textDecoration: 'none'}}>Cancel</a>
            </form>
          </div>
        </div>
      </div>
    );
}

export default AddSales;
