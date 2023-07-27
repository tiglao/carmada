import React, { useState, useEffect } from 'react';

const ApptForm = (props) => {
    const [form, setForm] = useState({
      vin: '',
      customer: '',
      date: '',
      time: '',
      technician: '',
      reason: '',
      technicians: [],
    });

    useEffect(() => {
      fetchTechnicians();
    }, []);

    async function fetchTechnicians() {
      const url = 'http://localhost:8080/api/technicians/';

      try {
        const response = await fetch(url);

        if (response.ok) {
          const data = await response.json();
          setForm(prevState => ({...prevState, technicians: data.technicians}));
        } else {
          console.error(`Server response issue. Status: ${response.status}`);
        }
      } catch (error) {
        console.error('Fetch error:', error);
      }
    }

    const handleChange = (event) => {
        setForm({
          ...form,
          [event.target.name]: event.target.value
        });
    };

    const handleCancel = async (event) => {
      console.log("cancel")
      setForm({
        vin: '',
        customer: '',
        date: '',
        time: '',
        technician: '',
        reason: '',
        technicians: [],
        });
        fetchTechnicians()
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const autoVoUrl = `http://localhost:8080/api/autosvo/`;
        const autoResponse = await fetch(autoVoUrl);
        let isVip = false;

        if (autoResponse.ok) {
          const autoData = await autoResponse.json();
          isVip = autoData.autos.some(auto => auto.sold && auto.vin === form.vin);
        }

        let data = {
          date_time: `${form.date}T${form.time}:00+00:00`,
          customer: form.customer,
          vip_status: false,
          vin: form.vin,
          reason: form.reason,
          appt_status: "created",
          technician_id: Number(form.technician)
        };

        console.log("this is data from the form:", data)
        console.log("this is data from the form:", JSON.stringify(data))

        const apptUrl = 'http://localhost:8080/api/appointments/';
        const fetchConfig = {
          method: "post",
          body: JSON.stringify(data),
          headers: {
            'Content-Type': 'application/json',
          },
        };

        const response = await fetch(apptUrl, fetchConfig);
        if (response.ok) {
          const cleared = {
            vin: '',
            customer: '',
            date: '',
            time: '',
            technician: '',
            reason: '',
          };
          setForm(prevState => ({...prevState, ...cleared}));
        }
      };
    return (
      <div className="row">
        <div className="offset-3 col-6">
          <div className="shadow p-4 mt-4">
            <h1>Create a service appointment</h1>
            <form onSubmit={handleSubmit} id="create-appt-form">
              <div className="form-floating mb-3">
                <input value={form.vin} onChange={handleChange} placeholder="Automobile VIN" required type="text" name="vin" id="vin" className="form-control" />
                <label htmlFor="vin">Automobile VIN</label>
              </div>
              <div className="form-floating mb-3">
                <input value={form.customer} onChange={handleChange} placeholder="Customer Name" required type="text" name="customer" id="customer" className="form-control" />
                <label htmlFor="customer">Customer Name</label>
              </div>
              <div className="form-floating mb-3">
                <input value={form.date} onChange={handleChange} placeholder="Date of Visit" required type="date" name="date" id="date" className="form-control" />
                <label htmlFor="date">Date of Visit</label>
              </div>
              <div className="form-floating mb-3">
                <input value={form.time} onChange={handleChange} placeholder="Time of Visit" required type="time" name="time" id="time" className="form-control" />
                <label htmlFor="time">Time of Visit</label>
              </div>
              <div className="mb-3">
                <select value={form.technician} onChange={handleChange} required name="technician" id="technician" className="form-select">
                  <option value="">Choose Technician:</option>
                  {form.technicians.map(tech => (
                    <option key={tech.id} value={tech.id}>
                      {tech.first_name} {tech.last_name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-floating mb-3">
                <textarea value={form.reason} onChange={handleChange} placeholder="Reason for Visit" required name="reason" id="reason" className="form-control" />
                <label htmlFor="reason">Reason for Visit</label>
              </div>
              <button className="btn btn-primary">Create</button>
              <a href="#" onClick={handleCancel} style={{marginLeft: '10px', color: 'gray', fontSize: '0.8em', textDecoration: 'none'}}>Cancel</a>
            </form>
          </div>
        </div>
      </div>
    );
}

export default ApptForm;
