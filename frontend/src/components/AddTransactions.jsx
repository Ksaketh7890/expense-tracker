import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/AddTransactionStyles.css';

const AddTransaction = () => {
  const [startDate, setStartDate] = useState(null);
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState('');
  const [category, setCategory] = useState('');
  const [transaction_type, setTransactiontype] = useState('');
  const navigate = useNavigate();

  const jwt = localStorage.getItem('jwt');
  if(!jwt){
    navigate("/");
  }
  const config = {
    headers: { authorization: jwt },
  };
  const url = 'http://localhost:5000/api/v1';

  const handleTitle = (e) => {
    const { value } = e.target;
    setTitle(value);
  };
  const handleMoney = (e) => {
    const { value } = e.target;
    setAmount(value);
  };
  const handleDate = (date) => {
    setDate(date);
  };
  const handleCategory = (e) => {
    const { value } = e.target;
    setCategory(value);
  };
  const handleTransaction = (e) => {
    const { value } = e.target;
    setTransactiontype(value);
  };
  const handleTransactions = async (e) => {
    e.preventDefault();
    if (!title || !amount || !date) {
      alert('All fields are required.');
      return;
    }
    try {
      const response = await axios.post(
        url + '/add-transaction',
        {
          title,
          amount,
          transaction_type,
          date,
          category,
        },
        config
      );
      if (response.status === 201) {
        alert('Transaction added');
      } else {
        alert('Invalid Details');
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleBack = () => {
    navigate('/dashboard');
  };

  return (
    <div className="add-transaction">
      
      <h1 style={{color:'black'}}>TRANSACTIONS</h1>
      <h3>Add your Transaction</h3>
      <div className="transaction-container">
        <input type="text" placeholder="Title" onChange={handleTitle} value={title} /><br />
        <input type="text" placeholder="Amount" onChange={handleMoney} value={amount} /><br />
        <select value={transaction_type} onChange={handleTransaction}>
          <option value="">Choose</option>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select><br />
        <DatePicker
          selected={startDate}
          onChange={(date) => {
            setStartDate(date);
            handleDate(date);
          }}
          dateFormat="yyyy/MM/dd"
          placeholderText="Select a date"
        /><br />
        <select value={category} onChange={handleCategory} className="category">
          <option value="">Select a category</option>
          <option value="Groceries">Food</option>
          <option value="Rent">Rent</option>
          <option value="Salary">Salary</option>
          <option value="Medical">Medical</option>
          <option value="transport">Transport</option>
          <option value="entertainment">Entertainment</option>
          <option value="utilities">Utilities</option>
          <option value="other">Other</option>
        </select><br />

      </div>
      <button type="submit" onClick={handleTransactions}>Add Transaction</button>
    <div>
    <button className="back-button" onClick={handleBack}>Dashboard</button>

    </div>
    </div>
    
  );
};

export default AddTransaction;
