import { BrowserRouter, Routes, Route } from 'react-router-dom';
import React from 'react';
import MainPage from './MainPage';
import Nav from './Nav';
import ListCustomers from './ListCustomers'
import AddCustomer from './AddCustomer'
import ListSales from './ListSales'
import AddSales from './AddSales'
import ListSalesPerson from './ListSalesPerson.js'
import AddSalesPerson from './AddSalesPerson'
import ApptForm from './ApptForm';
import TechForm from './TechForm';
import ApptList from './ApptList';
import TechList from './TechList';
import ApptHistoryList from './ApptHistoryList';
import MakeList from './MakeList';
import MakeForm from './MakeForm';
import ModelList from './ModelList';
import ModelForm from './ModelForm';
import SalesHistory from './SalesHistory';
import ListAutomobiles from './ListAutomobiles';
import AddAutomobiles from './AddAutomobiles'

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
          <Route path="/sales/history" element={<SalesHistory />} />
          <Route path="/salesperson" element={<ListSalesPerson />} />
          <Route path="/salesperson/new" element={<AddSalesPerson />} />
          <Route path="/saleshistory" element={<SalesHistory />} />
          <Route path="/appointments" element={<ApptList />} />
          <Route path="/appointments/history" element={<ApptHistoryList />} />
          <Route path="/appointments/new" element={<ApptForm />} />
          <Route path="/technicians/new" element={<TechForm />} />
          <Route path="/technicians" element={<TechList />} />
          <Route path="/manufacturers" element={<MakeList />} />
          <Route path="/manufacturers/new" element={<MakeForm />} />
          <Route path="/models" element={<ModelList />} />
          <Route path="/models/new" element={<ModelForm />} />
          <Route path="/automobiles" element={<ListAutomobiles />} />
          <Route path="/automobiles/new" element={<AddAutomobiles />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
