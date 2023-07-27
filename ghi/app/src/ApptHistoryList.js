import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function ApptList() {
    const [appts, setAppts] = useState([]);
    const [autos, setAutos] = useState([]);
    const [search, setSearch] = useState("");

    useEffect(() => {
        fetchAppts();
        fetchAutos();
    }, []);

    const fetchAppts = async () => {
        const response = await fetch('http://localhost:8080/api/appointments/')
        if (response.ok) {
            const data = await response.json();
            setAppts(data.appts);
        }
    };

    const fetchAutos = async () => {
        const response = await fetch('http://localhost:8080/api/autosvo/')
        if (response.ok) {
            const data = await response.json();
            setAutos(data.autos);
        }
    };

    const handleSearch = (event) => {
        setSearch(event.target.value);
    }

    const filteredAppts = appts.filter(appt => appt.vin.includes(search));

    return (
        <div>
            <h1>Service Appointments</h1>
            <input
                type="text"
                placeholder="Search by VIN..."
                onChange={handleSearch}
                value={search}
            />
            <div className="mt-4">
                {filteredAppts.length === 0 && search !== "" ? (
                    <p>No appointments found with the entered VIN.</p>
                ) : (
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th>VIN</th>
                                <th>Is VIP?</th>
                                <th>Customer</th>
                                <th>Date</th>
                                <th>Time</th>
                                <th>Technician</th>
                                <th>Reason</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        {filteredAppts.map(appt => {
                            const date = new Date(appt.date_time).toLocaleDateString();
                            const time = new Date(appt.date_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                            const isVip = autos.some(auto => auto.vin === appt.vin && auto.sold);
                            return (
                                <tbody key={appt.id}>
                                    <tr className="col mb-3">
                                        <td>{appt.vin}</td>
                                        <td>{isVip ? "Yes" : "No"}</td>
                                        <td>{appt.customer}</td>
                                        <td>{date}</td>
                                        <td>{time}</td>
                                        <td>{`${appt.technician.first_name} ${appt.technician.last_name}`}</td>
                                        <td>{appt.reason}</td>
                                        <td>{appt.appt_status}</td>
                                    </tr>
                                </tbody>
                            )
                        })}
                    </table>
                )}
                <div className="mt-5">
                    {appts.length < 1 ? (
                        <>
                            <p>There are no appointments!</p>
                            <Link to="/appts/new">Add one here.</Link>
                        </>
                    ) : (
                        <>
                            <p>Need to add a new appointment?</p>
                            <Link to="/appts/new">Add another here.</Link>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}

export default ApptList;
