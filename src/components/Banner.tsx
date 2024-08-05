// components/Banner.js
const Banner = () => {
  return (
    <div
      style={{
        paddingTop: "30px",
        margin: "1px 0px 0px 0px",
        paddingLeft: "40px",
        borderTopColor: "white",
        width: "100%",
        height: "274px",
        backgroundColor: "rgb(102 102 102)",
        color: "white",
      }}
      className="banner"
    >
      <div style={{ width: "50%", float: "left" }} className="banner-left">
        <h2>Looking for a vehicle?</h2>
        <h2>You're at the right place.</h2>
        <br />
        <h4>
          Choose between 100s of private car for rent at ready low prices!
        </h4>
        <button
          style={{ color: "white", backgroundColor: "blue", height: "50px" }}
          type="text"
          id="input-banner-left"
          name="input-banner-left"
        >
          Find a Rental Car Near You
        </button>
        <br />
      </div>
      <div style={{ width: "50%", float: "right" }} className="banner-right">
        <br />
        <h2>Are you a car owner?</h2>
        <br />
        <h4>List your car and make money from your asset today!</h4>
        <br />
        <button
          style={{ color: "white", backgroundColor: "blue", height: "50px" }}
          type="text"
          id="input-banner-right"
          name="input-banner-right"
        >
          List Your Car Today
        </button>
        <br />
      </div>
    </div>
  );
};

export default Banner;
