import React, { useState } from 'react';

const TechForm = (props) => {
    const [form, setForm] = useState({
      firstName: '',
      lastName: '',
      employeeId: '',
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
          firstName: '',
          lastName: '',
          employeeId: ''
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        let data = {
          first_name: form.firstName,
          last_name: form.lastName,
          employee_id: form.employeeId,
        };

        const techUrl = 'http://localhost:8080/api/technicians/';
        const fetchConfig = {
          method: "post",
          body: JSON.stringify(data),
          headers: {
            'Content-Type': 'application/json',
          },
        };

        const response = await fetch(techUrl, fetchConfig);
        if (response.ok) {
          setForm({
            firstName: '',
            lastName: '',
            employeeId: ''
          });

          props.onFormSubmit();
        }
    };

    return (
      <div className="row">
        <div className="offset-3 col-6">
          <div className="shadow p-4 mt-4">
            <h1>Create a Technician</h1>
            <form onSubmit={handleSubmit} id="create-tech-form">
              <div className="form-floating mb-3">
                <input value={form.firstName} onChange={handleChange} placeholder="First Name" required type="text" name="firstName" id="firstName" className="form-control" />
                <label htmlFor="firstName">First Name</label>
              </div>
              <div className="form-floating mb-3">
                <input value={form.lastName} onChange={handleChange} placeholder="Last Name" required type="text" name="lastName" id="lastName" className="form-control" />
                <label htmlFor="lastName">Last Name</label>
              </div>
              <div className="form-floating mb-3">
                <input value={form.employeeId} onChange={handleChange} placeholder="Employee ID" required type="text" name="employeeId" id="employeeId" className="form-control" />
                <label htmlFor="employeeId">Employee ID</label>
              </div>
              <button className="btn btn-primary">Create</button>
              <a href="#" onClick={handleCancel} style={{marginLeft: '10px', color: 'gray', fontSize: '0.8em', textDecoration: 'none'}}>Cancel</a>
            </form>
          </div>
        </div>
      </div>
    );
}

export default TechForm;
