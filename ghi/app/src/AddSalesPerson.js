import React, { useState } from 'react';

const AddSalesperson = (props) => {
    const [form, setForm] = useState({
        first_name: '',
        last_name: '',
        employee_id: ''
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
        employee_id: ''
        });
  };

    const handleSubmit = async (event) => {
        event.preventDefault();

        let data = {
          first_name: form.first_name,
          last_name: form.last_name,
          employee_id: form.employee_id,
        };

        const url = 'http://localhost:8090/api/salespeople/';
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
            employee_id: ''
          });
        }
    };

    return (
      <div className="row">
        <div className="offset-3 col-6">
          <div className="shadow p-4 mt-4">
            <h1>Create a Salesperson</h1>
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
                    <input value={form.employee_id} onChange={handleChange} placeholder="employee_id" required type="text" name="employee_id" id="employee_id" className="form-control" />
                    <label htmlFor="employee_id">Employee ID</label>
                  </div>
                <button className="btn btn-primary">Create</button>
                <a href="#" onClick={handleCancel} style={{marginLeft: '10px', color: 'gray', fontSize: '0.8em', textDecoration: 'none'}}>Cancel</a>
            </form>
          </div>
        </div>
      </div>
    );
}

export default AddSalesperson;
