// src/components/MonthlyAnalysis.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import '../styles/MonthlyAnalysisStyles.css';
import { useNavigate } from 'react-router-dom';

const MonthlyAnalysis = () => {
  const [selectedMonth, setSelectedMonth] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [analysis, setAnalysis] = useState({
    totalIncome: 0,
    totalExpense: 0,
    breakdown: {},
  });
  const url = 'http://localhost:5000/api/v1';
  const jwt = localStorage.getItem('jwt');
  const config = {
    headers: { authorization: jwt },
  };
  const navigate = useNavigate();

  useEffect(() => {
    if (selectedMonth) {
      fetchMonthlyTransactions();
    }
  }, [selectedMonth]);
  const handleBack = () => {
    navigate('/dashboard');
  };

  const fetchMonthlyTransactions = async () => {
    try {
      const response = await axios.get(url + '/transactions', config);
      const filteredTransactions = response.data.filter((transaction) => {
        const transactionDate = new Date(transaction.transaction_date);
        return (
          transactionDate.getMonth() === selectedMonth.getMonth() &&
          transactionDate.getFullYear() === selectedMonth.getFullYear()
        );
      });
      setTransactions(filteredTransactions);
      analyzeTransactions(filteredTransactions);
    } catch (error) {
      console.log(error);
    }
  };

  const analyzeTransactions = (transactions) => {
    let totalIncome = 0;
    let totalExpense = 0;
    let breakdown = {};

    transactions.forEach((transaction) => {
      const amount = parseFloat(transaction.amount);
      if (transaction.transaction_type === 'income') {
        totalIncome += amount;
      } else {
        totalExpense += amount;
      }

      if (!breakdown[transaction.category]) {
        breakdown[transaction.category] = 0;
      }
      breakdown[transaction.category] += amount;
    });

    setAnalysis({ totalIncome, totalExpense, breakdown });
  };

  return (
    <div className="monthly-analysis">
      <h1>Monthly Analysis</h1>
      <DatePicker
        selected={selectedMonth}
        onChange={(date) => setSelectedMonth(date)}
        dateFormat="MM/yyyy"
        showMonthYearPicker
        placeholderText="Select a month"
      />
      {selectedMonth && (
        <div className="analysis-results">
          <h2>Analysis for {selectedMonth.toLocaleString('default', { month: 'long' })} {selectedMonth.getFullYear()}</h2>
          <p>Total Income: ₹{analysis.totalIncome.toFixed(2)}</p>
          <p>Total Expense: ₹{analysis.totalExpense.toFixed(2)}</p>
          <h3>Breakdown by Category:</h3>
          <ul>
            {Object.keys(analysis.breakdown).map((category) => (
              <li key={category}>
                {category}: ₹{analysis.breakdown[category].toFixed(2)}
              </li>
            ))}
          </ul>
        </div>
      )}
        <button className="back-button" onClick={handleBack}>
        Dashboard
      </button>
    </div>
  );
};


export default MonthlyAnalysis;
