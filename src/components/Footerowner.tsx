// components/Footer.tsx
const Footer = () => {
  return (
    <footer>
      <div className="footer-container">
        <div className="footer-section">
          <h4>RENT CARS</h4>
          <ul>
            <li>
              <a href="#">Search Cars and Rates</a>
            </li>
          </ul>
        </div>
        <div className="footer-section">
          <h4>CUSTOMER ACCESS</h4>
          <ul>
            <li>
              <a href="#">Manage My Booking</a>
            </li>
            <li>
              <a href="#">My Wallet</a>
            </li>
            <li>
              <a href="#">My Car</a>
            </li>
            <li>
              <a href="#">Log in</a>
            </li>
          </ul>
        </div>
        <div className="footer-section">
          <h4>JOIN US</h4>
          <ul>
            <li>
              <a href="#">New User Sign Up</a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
