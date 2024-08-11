import React from "react";
import "./about.css";
import Header from "../../components/header/Header";

const About = () => {
  return (
    <section className="about | container">
      <header className="about__header">
        <Header />
      </header>
      <div className="about__content">
        <div className="about__text-wrapper">
          <h3 className="about__title">Secure. Simple. Reliable.</h3>
          <p className="about__description">
            Welcome to HASH, the ultimate password manager designed to keep your
            digital life safe and organized. In today's fast-paced digital
            world, managing multiple passwords can be overwhelming. Our platform
            is here to make it easy, secure, and efficient.
          </p>
        </div>
        <div className="about__text-wrapper">
          <h3 className="about__title">Save and Manage Your Passwords</h3>
          <p className="about__description">
            With HASH, you no longer need to remember dozens of complex
            passwords. Store all your passwords in one secure place, easily
            accessible only to you. Our user-friendly interface allows you to
            organize and manage your passwords effortlessly, ensuring you always
            have quick access to your accounts.
          </p>
        </div>
        <div className="about__text-wrapper">
          <h3 className="about__title">Generate Strong Passwords</h3>
          <p className="about__description">
            Security starts with strong passwords. Our built-in password
            generator creates robust, unique passwords tailored to each of your
            accounts. Whether you need a simple password for a personal account
            or a complex one for sensitive information, we've got you covered.
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;
