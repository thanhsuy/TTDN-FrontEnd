// 'use client';

// import React, { useEffect, useState } from 'react';
// import { getWalletDetails, topUpWallet, withdrawFromWallet } from '../services/api';
// import { ViewWalletResponse, TopUpRequest, WithdrawRequest } from '../interfaces';

// const WalletPage: React.FC = () => {
//   const [wallet, setWallet] = useState<ViewWalletResponse | null>(null);
//   const [error, setError] = useState<string>('');
//   const [showTopUpPopup, setShowTopUpPopup] = useState<boolean>(false);
//   const [showWithdrawPopup, setShowWithdrawPopup] = useState<boolean>(false);
//   const [amount, setAmount] = useState<number>(2000000); // Default amount

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const data = await getWalletDetails();
//         setWallet(data);
//       } catch (error) {
//         setError('Error fetching wallet details');
//       }
//     };

//     fetchData();
//   }, []);

//   const handleTopUp = async () => {
//     try {
//       const request: TopUpRequest = { userId: wallet?.userId || 0, amount };
//       const updatedWallet = await topUpWallet(request);
//       setWallet(updatedWallet);
//       setShowTopUpPopup(false);
//     } catch (error) {
//       setError('Error topping up wallet');
//     }
//   };

//   const handleWithdraw = async () => {
//     try {
//       const request: WithdrawRequest = { userId: wallet?.userId || 0, amount };
//       const updatedWallet = await withdrawFromWallet(request);
//       setWallet(updatedWallet);
//       setShowWithdrawPopup(false);
//     } catch (error) {
//       setError('Error withdrawing from wallet');
//     }
//   };

//   return (
//     <div>
//       <h2>Wallet Details</h2>
//       {error && <p style={{ color: 'red' }}>{error}</p>}
//       {wallet ? (
//         <div>
//           <p>Wallet Balance: {wallet.walletBalance}</p>
//           <p>Instruction: {wallet.instruction}</p>
//           <p>Payment Status: {wallet.paymentStatus}</p>
//           <h3>Transactions:</h3>
//           <ul>
//             {wallet.transactions.map((transaction) => (
//               <li key={transaction.idtransactions}>
//                 {transaction.datetime}: {transaction.amount} ({transaction.type}) - {transaction.bookingno} - {transaction.carname} - {transaction.note}
//               </li>
//             ))}
//           </ul>
//           <button onClick={() => setShowTopUpPopup(true)}>Nạp tiền</button>
//           <button onClick={() => setShowWithdrawPopup(true)}>Rút tiền</button>
//         </div>
//       ) : (
//         <p>Loading...</p>
//       )}

//       {showTopUpPopup && (
//         <div className="overlay">
//           <div className="popup">
//             <h3>Nạp tiền</h3>
//             <select value={amount} onChange={(e) => setAmount(parseInt(e.target.value, 10))}>
//               <option value={2000000}>2,000,000 VND</option>
//               <option value={5000000}>5,000,000 VND</option>
//               <option value={10000000}>10,000,000 VND</option>
//             </select>
//             <button onClick={handleTopUp}>OK</button>
//             <button onClick={() => setShowTopUpPopup(false)}>Cancel</button>
//           </div>
//         </div>
//       )}

//       {showWithdrawPopup && (
//         <div className="overlay">
//           <div className="popup">
//             <h3>Rút tiền</h3>
//             <select value={amount} onChange={(e) => setAmount(parseInt(e.target.value, 10))}>
//               <option value={2000000}>2,000,000 VND</option>
//               <option value={5000000}>5,000,000 VND</option>
//               <option value={10000000}>10,000,000 VND</option>
//               <option value={wallet.walletBalance}>Toàn bộ số dư</option>
//             </select>
//             <button onClick={handleWithdraw}>OK</button>
//             <button onClick={() => setShowWithdrawPopup(false)}>Cancel</button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default WalletPage;

'use client';

import React, { useEffect, useState } from 'react';
import { getWalletDetails, topUpWallet, withdrawFromWallet } from '../services/api';
import { ViewWalletResponse, TopUpRequest, WithdrawRequest } from '../interfaces';
import './wallet.css'; // Đảm bảo rằng đường dẫn này khớp với cấu trúc file của bạn

const WalletPage: React.FC = () => {
  const [wallet, setWallet] = useState<ViewWalletResponse | null>(null);
  const [error, setError] = useState<string>('');
  const [topUpAmount, setTopUpAmount] = useState<TopUpRequest>({ userId: 0, amount: 2000000 });
  const [withdrawAmount, setWithdrawAmount] = useState<WithdrawRequest>({ userId: 0, amount: 2000000 });
  const [showTopUpDialog, setShowTopUpDialog] = useState<boolean>(false);
  const [showWithdrawDialog, setShowWithdrawDialog] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getWalletDetails();
        setWallet(data);
        // Cập nhật userId cho các đối tượng request
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
      setWallet(data);
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
      setWallet(data);
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

  return (
    <div>
      <h2>Wallet Details</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {wallet ? (
        <div>
          <p>Wallet Balance: {wallet.walletBalance}</p>
          <p>Instruction: {wallet.instruction}</p>
          <p>Payment Status: {wallet.paymentStatus}</p>
          <h3>Transactions:</h3>
          <ul>
            {wallet.transactions.map((transaction) => (
              <li key={transaction.idtransactions}>
                {transaction.datetime}: {transaction.amount} ({transaction.type}) - {transaction.bookingno} - {transaction.carname} - {transaction.note}
              </li>
            ))}
          </ul>
          <button onClick={() => setShowTopUpDialog(true)}>Top-Up</button>
          <button onClick={() => setShowWithdrawDialog(true)}>Withdraw</button>
          
          {showTopUpDialog && (
            <div className="dialog">
              <h3>Top-Up Wallet</h3>
              <select 
                onChange={(e) => handleTopUpAmountChange(Number(e.target.value))} 
                value={topUpAmount.amount}
                aria-label="Select top-up amount"
              >
                <option value="2000000">2,000,000 VND</option>
                <option value="5000000">5,000,000 VND</option>
                <option value="10000000">10,000,000 VND</option>
              </select>
              <button onClick={handleTopUp}>OK</button>
              <button onClick={() => setShowTopUpDialog(false)}>Cancel</button>
            </div>
          )}
          
          {showWithdrawDialog && (
            <div className="dialog">
              <h3>Withdraw from Wallet</h3>
              <select 
                onChange={(e) => handleWithdrawAmountChange(Number(e.target.value))} 
                value={withdrawAmount.amount}
                aria-label="Select withdraw amount"
              >
                <option value="2000000">2,000,000 VND</option>
                <option value="5000000">5,000,000 VND</option>
                <option value="10000000">10,000,000 VND</option>
                <option value={wallet.walletBalance}>All balance</option>
              </select>
              <button onClick={handleWithdraw}>OK</button>
              <button onClick={() => setShowWithdrawDialog(false)}>Cancel</button>
            </div>
          )}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default WalletPage;
