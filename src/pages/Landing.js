import React from "react";
import main from "../assets/images/research-svgrepo-com.svg";
import Wrapper from "../assets/wrappers/LandingPage";
import { Logo } from "../components";
import { Link } from "react-router-dom";

export const Landing = () => {
  return (
    <Wrapper>
      <nav>
        <Logo />
      </nav>
      <div className="container page">
        {/* info*/}

        <div className="info">
          <h1>
            Suicide <span>Prediction</span> app
          </h1>

          <p>
            Our Suicide Prediction System is a pioneering application designed
            to analyze and forecast suicide incidents. It provides a vital
            platform for suicide prevention. It also generates informative
            reports and graphical charts for users, aiding them in understanding
            and addressing the complex issue of suicide more effectively.
          </p>

          <Link to="/register" className="btn btn-hero">
            Login/Register
          </Link>
        </div>
        <img src={main} alt="job hunt" className="img main-img" />
      </div>
    </Wrapper>
  );
};

export default Landing;
