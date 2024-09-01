import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { Pie } from 'react-chartjs-2';
import 'chart.js/auto';
import '../styles/DashboardStyles.css';

const Dashboard = () => {
  const [user, setUser] = useState("");
  const [transactions, setTransactions] = useState([]);
  const [incomes, setIncomes] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [goals, setGoals] = useState([]);
  const navigate = useNavigate();
  const url = "http://localhost:5000/api/v1";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const jwt = localStorage.getItem('jwt');
        if(!jwt){
          navigate("/");
        }
        const config = {
          headers: { authorization : jwt },
        };
        const userRes = await axios.get(url+'/user', config);
        setUser(userRes.data.username);
        const transactionsRes = await axios.get(url+'/transactions', config);
        const incomesRes = await axios.get(url+'/incomes', config);
        const expensesRes = await axios.get(url+"/expenses",config);
        setTransactions(transactionsRes.data);
        setIncomes(incomesRes.data);
        setExpenses(expensesRes.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, []);

  const handleSignOut = () => {
    localStorage.removeItem('jwt');
    navigate('/');
  };

  const totalIncomes = incomes.reduce((acc, income) => acc + parseFloat(income.amount), 0);
  const totalExpenses = expenses.reduce((acc, expense) => acc + parseFloat(expense.amount), 0);

  const pieData = {
    labels: ['Incomes', 'Expenses'],
    datasets: [
      {
        data: [totalIncomes, totalExpenses],
        backgroundColor: ['#36A2EB', '#FF6384'],
      },
    ],
  };

  return (
    <div className="dashboard">
<header className="header">
  <h1 className="welcome-message">Welcome, {user}</h1>
  <nav className="nav-links">
    <Link to="/add">Log Transactions</Link>
    <Link to="/list">Transaction History</Link>
    <Link to="/monthly-analysis">Monthly Analysis</Link>
    
  </nav>
</header>

      <main>
        <section className="summary">
          <div className="summary-item">
            <h2>Total Incomes</h2>
            <p> ₹{totalIncomes.toFixed(2)}</p>
          </div>
          <div className="summary-item">
            <h2>Total Expenses</h2>
            <p> ₹{totalExpenses.toFixed(2)}</p>
          </div>
        </section>
        <section className="latest-transactions">
          <h2>Latest Transactions</h2>
          <ul>
            {transactions.slice(0, 3).map((transaction) => (
              <li key={transaction.id}>{transaction.title}: ₹{transaction.amount}</li>
            ))}
          </ul>
        </section>
        <section className="pie-chart">
          <h2>Income vs Expenses</h2>
          <Pie data={pieData} />
        </section>
      </main>
      <footer>
        <button onClick={handleSignOut}>Sign Out</button>
      </footer>
    </div>
  );
};

export default Dashboard;
