import React, { useState } from 'react';

const AddCustomer = (props) => {
    const [form, setForm] = useState({
        first_name: '',
        last_name: '',
        address: '',
        phone_number: ''
    });

    const handleChange = (event) => {
        setForm({
          ...form,
          [event.target.name]: event.target.value
        });
    };

    const handleCancel = async (event) => {
      console.log("cancel")
      setForm({
          first_name: '',
          last_name: '',
          address: '',
          phone_number: ''
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        let data = {
          first_name: form.first_name,
          last_name: form.last_name,
          address: form.address,
          phone_number: form.phone_number
        };

        const url = 'http://localhost:8090/api/customers/';
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
            first_name: '',
            last_name: '',
            address: '',
            phone_number: ''
          });
        }
    };
    console.log(form)
    return (
      <div className="row">
        <div className="offset-3 col-6">
          <div className="shadow p-4 mt-4">
            <h1>Create a Customer</h1>
            <form onSubmit={handleSubmit} id="create-customer-form">
                <div className="form-floating mb-3">
                    <input value={form.first_name} onChange={handleChange} placeholder="first_name" required type="text" name="first_name" id="first_name" className="form-control" />
                    <label htmlFor="first_name">First Name</label>
                </div>
                <div className="form-floating mb-3">
                    <input value={form.last_name} onChange={handleChange} placeholder="last_name" required type="text" name="last_name" id="last_name" className="form-control" />
                    <label htmlFor="last_name">Last Name</label>
                  </div>
                  <div className="form-floating mb-3">
                    <input value={form.address} onChange={handleChange} placeholder="address" required type="text" name="address" id="address" className="form-control" />
                    <label htmlFor="address">Address</label>
                  </div>
                  <div className="form-floating mb-3">
                    <input value={form.phone_number} onChange={handleChange} placeholder="phone_number" required type="text" name="phone_number" id="phone_number" className="form-control" />
                    <label htmlFor="phone_number">Phone Number</label>
                  </div>
                <button className="btn btn-primary">Create</button>
                <a href="#" onClick={handleCancel} style={{marginLeft: '10px', color: 'gray', fontSize: '0.8em', textDecoration: 'none'}}>Cancel</a>
            </form>
          </div>
        </div>
      </div>
    );
}

export default AddCustomer;
