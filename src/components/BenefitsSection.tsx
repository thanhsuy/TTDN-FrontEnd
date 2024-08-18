// components/BenefitsSection.tsx
const BenefitsSection = () => {
  return (
    <section className="benefits">
      <h1>Have a car for rent? Don't miss out of your benefit</h1>
      <div className="benefits-container">
        <div className="benefit">
          <div className="benefit-ic">
            <img
              src="/icon/insurance-icon.png"
              alt="Insurance Icon"
              className="benefit-icon"
            />
            <h3>How the insurance works</h3>
          </div>
          <p>
            From the minute you hand the keys over till the second you get them
            back you are covered. Your private insurance is not affected.
          </p>
        </div>
        <div className="benefit">
          <div className="benefit-ic">
            <img
              src="/icon/free-icon.png"
              alt="Free Icon"
              className="benefit-icon"
            />
            <h3>It's completely free</h3>
          </div>
          <p>
            We offer both owners and renters free sign up. It's only once a
            vehicle is rented out that a share is deducted to cover admin and
            insurance.
          </p>
        </div>
        <div className="benefit">
          <div className="benefit-ic">
            <img
              src="/icon/price-icon.png"
              alt="Price Icon"
              className="benefit-icon"
            />
            <h3>You decide the price</h3>
          </div>
          <p>
            When you list a car you decide the price. We can help with
            recommendations as to price, but ultimately you decide!
          </p>
        </div>
        <div className="benefit">
          <div className="benefit-ic">
            <img
              src="/icon/handover-icon.png"
              alt="Handover Icon"
              className="benefit-icon"
            />
            <h3>Handing over your vehicle</h3>
          </div>
          <p>
            You arrange the time and location for the exchange of your vehicle
            with the renter. Both parties will need to agree on the arrangement
            to avoid theft before and after key handover.
          </p>
        </div>
        <div className="benefit">
          <div className="benefit-ic">
            <img
              src="/icon/control-icon.png"
              alt="Control Icon"
              className="benefit-icon"
            />
            <h3>You are in charge</h3>
          </div>
          <p>
            All renters are pre-screened by us to ensure safety and get your
            approval. If you do not feel comfortable with someone you are able
            to decline a booking.
          </p>
        </div>
        <div className="benefit">
          <div className="benefit-ic">
            <img
              src="/icon/payment-icon.png"
              alt="Payment Icon"
              className="benefit-icon"
            />
            <h3>Set payment</h3>
          </div>
          <p>
            We pay you once a month and you can always view how much your car
            has earned under your user profile.
          </p>
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;
