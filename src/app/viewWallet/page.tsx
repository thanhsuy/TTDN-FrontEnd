'use client';

import React, { useEffect, useState } from 'react';
import { getWalletDetails, topUpWallet, withdrawFromWallet } from '../services/api';
import { ViewWalletResponse, TopUpRequest, WithdrawRequest } from '../interfaces';
import './wallet.css'; // Đảm bảo rằng đường dẫn này khớp với cấu trúc file của bạn
import Head from 'next/head';
import Footer from '@/components/Footerowner';
import { getUser } from "@/components/UserInfo";
import "../styles.css";
import Navbar from "../../components/Navbarowner";
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, Select, MenuItem } from '@mui/material';

const WalletPage: React.FC = () => {
  const [wallet, setWallet] = useState<ViewWalletResponse | null>(null);
  const [error, setError] = useState<string>('');
  const [topUpAmount, setTopUpAmount] = useState<TopUpRequest>({ userId: 0, amount: 2000000 });
  const [withdrawAmount, setWithdrawAmount] = useState<WithdrawRequest>({ userId: 0, amount: 2000000 });
  const [showTopUpDialog, setShowTopUpDialog] = useState<boolean>(false);
  const [showWithdrawDialog, setShowWithdrawDialog] = useState<boolean>(false);
  const [user, setUser] = useState<{ result: { name: string; role: string } } | null>(null);
  const [fromDate, setFromDate] = useState<string>('');
  const [toDate, setToDate] = useState<string>('');
  const [filteredTransactions, setFilteredTransactions] = useState<ViewWalletResponse | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const transactionsPerPage = 5;

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await getUser();
        setUser(userData);
      } catch (error) {
        console.error("Failed to fetch user:", error);
      }
    };

    fetchUser();

    const fetchData = async () => {
      try {
        const data = await getWalletDetails();
        
        // Sắp xếp giao dịch theo thứ tự giảm dần dựa trên datetime
        data.transactions.sort((a, b) => new Date(b.datetime).getTime() - new Date(a.datetime).getTime());
  
        setWallet(data);
        setFilteredTransactions(data); // Lưu trữ bản sao cho chức năng reset
        setTopUpAmount({ ...topUpAmount, userId: data.userId });
        setWithdrawAmount({ ...withdrawAmount, userId: data.userId });
      } catch (error) {
        setError('Error fetching wallet details');
      }
    };
  
    fetchData();
  }, []);

  const handleTopUp = async () => {
    if (!wallet) return;
    try {
      await topUpWallet(topUpAmount);
      const data = await getWalletDetails();
      
      // Sắp xếp giao dịch theo thứ tự giảm dần dựa trên datetime
      data.transactions.sort((a, b) => new Date(b.datetime).getTime() - new Date(a.datetime).getTime());
  
      setWallet(data);
      setFilteredTransactions(data); // Cập nhật lại dữ liệu sau khi nạp tiền
      setShowTopUpDialog(false);
    } catch (error) {
      setError('Error topping up wallet');
    }
  };

  const handleWithdraw = async () => {
    if (!wallet) return;
    try {
      await withdrawFromWallet(withdrawAmount);
      const data = await getWalletDetails();

      // Sắp xếp giao dịch theo thứ tự giảm dần dựa trên datetime
      data.transactions.sort((a, b) => new Date(b.datetime).getTime() - new Date(a.datetime).getTime());

      setWallet(data);
      setFilteredTransactions(data); // Cập nhật lại dữ liệu sau khi rút tiền
      setShowWithdrawDialog(false);
    } catch (error) {
      setError('Error withdrawing from wallet');
    }
  };

  const handleTopUpAmountChange = (amount: number) => {
    setTopUpAmount({ ...topUpAmount, amount });
  };

  const handleWithdrawAmountChange = (amount: number) => {
    setWithdrawAmount({ ...withdrawAmount, amount });
  };

  const handleDateFilter = () => {
    if (wallet && fromDate && toDate) {
      const filteredTransactions = wallet.transactions.filter(transaction => {
        const transactionDate = new Date(transaction.datetime).toISOString().split('T')[0];
        return transactionDate >= fromDate && transactionDate <= toDate;
      });

      // Sắp xếp lại các giao dịch đã lọc
    filteredTransactions.sort((a, b) => new Date(b.datetime).getTime() - new Date(a.datetime).getTime());

      setFilteredTransactions({ ...wallet, transactions: filteredTransactions });
      setCurrentPage(1); // Reset lại trang về đầu tiên khi tìm kiếm
    }
  };

  const handleReset = () => {
    setFilteredTransactions(wallet); // Khôi phục lại danh sách giao dịch ban đầu
    setFromDate('');
    setToDate('');
    setCurrentPage(1); // Reset lại trang về đầu tiên
  };

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  // Tính toán index của giao dịch cần hiển thị
  const indexOfLastTransaction = currentPage * transactionsPerPage;
  const indexOfFirstTransaction = indexOfLastTransaction - transactionsPerPage;
  const currentTransactions = filteredTransactions?.transactions.slice(indexOfFirstTransaction, indexOfLastTransaction);

  return (
    <>
      <Head>
        <title>Wallet Details</title>
        <link rel="stylesheet" href="styles.css" />
      </Head>
      {user && <Navbar name={user.result.name} role={user.result.role} />}
      <div className="wallet-page">
        <h2>My Wallet</h2>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {wallet ? (
          <div className="wallet-details">
            <p className="balance-title">Your current balance:</p>
            <p className="balance-amount">{wallet.walletBalance.toLocaleString('vi-VN')} VND</p>
            <div className="transaction-buttons">
              <button className="withdraw-button" onClick={() => setShowWithdrawDialog(true)}>Withdraw</button>
              <button className="topup-button" onClick={() => setShowTopUpDialog(true)}>Top-up</button>
            </div>
            <h3>Transactions</h3>
            <div className="transaction-filter">
              <label>From: <input type="date" value={fromDate} onChange={(e) => setFromDate(e.target.value)} /></label>
              <label>To: <input type="date" value={toDate} onChange={(e) => setToDate(e.target.value)} /></label>
              <button onClick={handleDateFilter}>Search</button>
              <button onClick={handleReset}>Reset</button>
            </div>
            <table className="transactions-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Amount</th>
                  <th>Type</th>
                  <th>Date time</th>
                  <th>Booking No.</th>
                  <th>Car Name</th>
                  <th>Note</th>
                </tr>
              </thead>
              <tbody>
                {currentTransactions?.map((transaction, index) => (
                  <tr key={transaction.idtransactions}>
                    <td>{indexOfFirstTransaction + index + 1}</td>
                    <td>{transaction.amount.toLocaleString('vi-VN')}</td>
                    <td>{transaction.type}</td>
                    <td>{new Date(transaction.datetime).toLocaleString()}</td>
                    <td>{transaction.bookingno}</td>
                    <td>{transaction.carname}</td>
                    <td>{transaction.note}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Phân trang */}
            <div className="pagination">
              {Array.from({ length: Math.ceil((filteredTransactions?.transactions.length || 0) / transactionsPerPage) }, (_, i) => (
                <button key={i + 1} onClick={() => paginate(i + 1)} className={i + 1 === currentPage ? "active" : ""}>
                  {i + 1}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>

      <Dialog open={showTopUpDialog} onClose={() => setShowTopUpDialog(false)}>
        <DialogTitle>Top-Up Wallet</DialogTitle>
        <DialogContent>
          <p>Your current balance is {wallet?.walletBalance.toLocaleString('vi-VN')} VND</p>
          <Select
            value={topUpAmount.amount}
            onChange={(e) => handleTopUpAmountChange(Number(e.target.value))}
            fullWidth
          >
            <MenuItem value={2000000}>2,000,000 VND</MenuItem>
            <MenuItem value={5000000}>5,000,000 VND</MenuItem>
            <MenuItem value={10000000}>10,000,000 VND</MenuItem>
          </Select>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleTopUp}>OK</Button>
          <Button onClick={() => setShowTopUpDialog(false)}>Cancel</Button>
        </DialogActions>
      </Dialog>

      <Dialog open={showWithdrawDialog} onClose={() => setShowWithdrawDialog(false)}>
        <DialogTitle>Withdraw from Wallet</DialogTitle>
        <DialogContent>
          <p>Your current balance is {wallet?.walletBalance.toLocaleString('vi-VN')} VND</p>
          <Select
            value={withdrawAmount.amount}
            onChange={(e) => handleWithdrawAmountChange(Number(e.target.value))}
            fullWidth
          >
            <MenuItem value={2000000}>2,000,000 VND</MenuItem>
            <MenuItem value={5000000}>5,000,000 VND</MenuItem>
            <MenuItem value={10000000}>10,000,000 VND</MenuItem>
          </Select>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleWithdraw}>OK</Button>
          <Button onClick={() => setShowWithdrawDialog(false)}>Cancel</Button>
        </DialogActions>
      </Dialog>

      <Footer />
    </>
  );
};

export default WalletPage;
