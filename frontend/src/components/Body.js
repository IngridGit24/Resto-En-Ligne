import React from "react";
import "./Css/Body.css"; // Optional: Custom CSS for additional styling
const Body = () => {
  return (
    <div className="body-content">
      <h1>Welcome to Our Website</h1>
      <p>
        This is the main content area of the website. Here you can add various
        sections, such as:
      </p>
      <section>
        <h2>Our Services</h2>
        <p>
          We offer a variety of services to meet your needs. From consulting to
          implementation, our team is here to help.
        </p>
      </section>
      <section>
        <h2>Latest News</h2>
        <p>Stay updated with the latest news and updates from our company.</p>
      </section>
      <section>
        <h2>Contact Us</h2>
        <p>
          If you have any questions or need further information, feel free to
          reach out to us.
        </p>
      </section>
    </div>
  );
};
export default Body;
