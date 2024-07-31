import { lazy, Suspense } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import Loader from "./components/Loader/Loader";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Home = lazy(() => import("./pages/Home"));
const Login = lazy(() => import("./pages/Login"));
const Signin = lazy(() => import("./pages/Signin"));
const Forgot = lazy(() => import("./pages/Forgot"));
const AddCar = lazy(() => import("./pages/AddCar"));

const Shop = lazy(() => import("./pages/Shop"));
const Cart = lazy(() => import("./pages/Cart"));
const Product = lazy(() => import("./pages/Product"));
const RentACar = lazy(() => import("./pages/RentACar"));
const MakeABooking = lazy(() => import("./pages/Booking/MakeABooking"));
const BookingList = lazy(() => import("./pages/Booking/BookingList"));
const PaidDeposite = lazy(() => import("./pages/Booking/PaidDeposite"));
const ConfirmPickUp = lazy(() => import("./pages/Booking/ConfirmPickUp"));
const ReturnCar = lazy(() => import("./pages/Booking/ReturnCar"));
const PendingPayment = lazy(() => import("./pages/Booking/PendingPayment"));
const Complete = lazy(() => import("./pages/Booking/Complete"));
const ListBooking = lazy(() => import("./pages/CarOwner/ListBooking"));
const CarOwnerPage = lazy(() => import("./pages/CarOwner/CarOwnerPage"));
const ListCar = lazy(() => import("./pages/CarOwner/ListCar"));

function App() {
  return (
    <Suspense fallback={<Loader />}>
      <Router>
        <ToastContainer
          position="top-right"
          autoClose={1000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/shop/:id" element={<Product />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/forgot" element={<Forgot />} />
          <Route path="/addcar" element={<AddCar />} />
          <Route path="/rentacar" element={<RentACar/>}/>
          <Route path="/booking/:carIdcar" element={<MakeABooking/>}/>
          <Route path="/bookinglist" element={<BookingList/>}/>
          <Route path="/paiddeposite/:idbooking" element={<PaidDeposite/>}/>
          <Route path="/confirmpickup/:idbooking" element={<ConfirmPickUp/>}/>
          <Route path="/returncar/:idbooking" element={<ReturnCar/>}/>
          <Route path="/pendingpayment/:idbooking" element={<PendingPayment/>}/>
          <Route path="/complete/:idbooking" element={<Complete/>}/>
          <Route path="/carowner/listbooking" element={<ListBooking/>}/>
          <Route path="/carowner" element={<CarOwnerPage/>}/>
          <Route path="/carowner/listcarofcarowner" element={<ListCar/>}/>

        </Routes>
        <Footer />
      </Router>
    </Suspense>
  );
}

export default App;
