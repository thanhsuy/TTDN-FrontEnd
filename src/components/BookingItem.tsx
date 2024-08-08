// components/ListCar.js
import Link from "next/link";
import { list } from "postcss";
import { useState } from "react";
import { useRouter } from 'next/router';

const BookingItem = ({car} :any) => {
    const [formData, setFormData] = useState({
        name: '',
        startdatetime: '',
        enddatetime: '',
        email: '',
        phoneno: '',
        address: '',
        drivinglicense: '',
        roles: '',
        password: '',
        wallet: ''
    });
    const [wallet, setWallet] = useState();
    const [user, setUser] = useState([]);
    const [error, setError] = useState([]);
    const [booking, setBooking] = useState();
    const handleSubmit = (event :any) => {
        event.preventDefault();
        const form = event.target;
        const data = new FormData(form);

        // Chuyển đổi FormData thành đối tượng JavaScript
        const value = Object.fromEntries(data.entries());

        // Gửi dữ liệu dưới dạng JSON
        fetch(`http://localhost:8080/makeABooking/${car.idcar}`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("authToken")}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(value),
        })
        .then(response => response.json())
        .then(data => {
            window.location.href = `http://localhost:3000/customer/booking/book/${data.result.idbooking}`;            
        });
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };
    return (
        <div className="container d-flex pt-4">
            {car &&
            <div className="row">
                <div className="col-5">
                    <img src={car.images} alt="" style={{width: '100%'}}/>
                </div>
                <div className="col-5">
                <form onSubmit={handleSubmit}>
                <div className="mb-1">
                    <label className="form-label">Start date time</label>
                    <input type="date" className="form-control" name="startdatetime" value={formData.startdatetime} onChange={handleChange} required />
                </div>
                <div className="mb-1">
                    <label className="form-label">End date time</label>
                    <input type="date" className="form-control" name="enddatetime" value={formData.enddatetime} onChange={handleChange} required />
                </div>

                <div className="dropdown">
                    <div>
                        <input type="radio" name="paymentmethod" value="My wallet" id="wallet" />
                        <label className="form-label m-2" htmlFor="wallet">My wallet</label>
                        {(wallet > car.deposite) ? <span className="text-success">{wallet}$</span> : <span className="text-danger">{wallet}$</span>}
                    </div>
                    <div>
                        <input type="radio" name="paymentmethod" value="Cash" id="cash" />
                        <label className="form-label m-2" htmlFor="cash">Cash</label>
                    </div>
                    <div>
                        <input type="radio" name="paymentmethod" value="Bank transfer" id="banktransfer" />
                        <label className="form-label m-2" htmlFor="banktransfer">Bank transfer</label>
                    </div>
                </div>
                <div className="row d-flex justify-content-around">
                    <Link href={'/customer'} className="col-4 btn btn-secondary">
                        Back
                    </Link>
                    <button className="col-4 btn btn-primary" type="submit">
                        NEXT
                    </button>
                </div>
            </form>
                </div>
            </div>
            }
            
        </div>
    );
};

export default BookingItem;
