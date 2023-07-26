import { BrowserRouter, Routes, Route } from 'react-router-dom';
import React, { useState } from 'react';
import MainPage from './MainPage';
import Nav from './Nav';
import ListCustomers from './ListCustomers'
import AddCustomer from './AddCustomer'
import ListSales from './ListSales'
import AddSales from './AddSales'
import ListSalesPerson from './ListSalesperson.js'
import AddSalesPerson from './AddSalesPerson'
import SalesHistory from './SalesHistory'

function App() {
  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/customers" element={<ListCustomers />} />
          <Route path="/customers/new" element={<AddCustomer />} />
          <Route path="/sales" element={<ListSales />} />
          <Route path="/sales/new" element={<AddSales />} />
          <Route path="/salesperson" element={<ListSalesPerson />} />
          <Route path="/salesperson/new" element={<AddSalesPerson />} />
          <Route path="/saleshistory" element={<SalesHistory />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
