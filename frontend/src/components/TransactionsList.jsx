import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/TransactionListStyles.css';

const TransactionList = () => {
  const [allTransactions, setAllTransactions] = useState([]);
  const url = 'http://localhost:5000/api/v1';
  const navigate = useNavigate();
  const jwt = localStorage.getItem('jwt');
  if(!jwt){
    navigate("/");
  }
  const config = {
    headers: { authorization: jwt },
  };
  

  useEffect(() => {
    const getAllTrans = async () => {
      try {
        const response = await axios.get(`${url}/transactions`, config);
        setAllTransactions(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    getAllTrans();
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`${url}/delete-transaction/${id}`, config);
      if (response.status === 204) {
        alert('Transaction Removed');
        setAllTransactions(allTransactions.filter(transaction => transaction.id !== id));
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleBack = () => {
    navigate('/dashboard');
  };

  return (
    <div className="transaction-list">
      <h1>Transactions List</h1>
      {allTransactions.length > 0 && (
        allTransactions.map((transaction) => (
          <div className="list" key={transaction.id}>
            <div className="transaction-box">
              <div className="left-column">
                <div className="transaction-title">{transaction.title}</div>
                <div className="transaction-date">{transaction.transaction_date.split('T')[0]}</div>
              </div>
              <span className="transaction-amount">
                {transaction.transaction_type === 'income' ? `+\u20B9${transaction.amount}` : `-\u20B9${transaction.amount}`}
              </span>
              <span className="image" onClick={() => { handleDelete(transaction.id); }}>
                <button>Delete</button>
              </span>
            </div>
          </div>
        ))
      )}
      <button className="back-button" onClick={handleBack}>
        Dashboard
      </button>
    </div>
  );
};

export default TransactionList;
