import React from "react";
import LoginRegister from "./components/LoginRegister";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import AddTransaction from "./components/AddTransactions";
import MonthlyAnalysis from './components/MonthlyAnalysis';
import TransactionList from "./components/TransactionsList";


function App() {
  return (
    <div >
      <Router>
        <Routes>
          <Route path="/" element={<LoginRegister/>} />
          <Route path="/dashboard" element={<Dashboard/>}/>
          <Route path="/add" element={<AddTransaction/>}/>  
          <Route path="/monthly-analysis" element={<MonthlyAnalysis />} /> 
          <Route path="/list" element={<TransactionList/>}/>   
            
        </Routes>
      </Router>
      
    </div>
  );
}

export default App;
