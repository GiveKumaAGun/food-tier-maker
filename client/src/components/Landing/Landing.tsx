import React from "react";
import "./Landing.css";
import { Link, useHistory } from "react-router-dom";
import { userState } from "../../atoms";  
import { useRecoilValue } from "recoil";
import sample from "./sample.png";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";

export default function Landing() {
  const user = useRecoilValue(userState);
  const history = useHistory();

  return (
    <div className="landing">
      <div className="description-container">
        <h1 className="description-header-h1">What is FoodTierMaker?</h1>
        <p className="description-content-p">FoodTierMaker (temp name) is a web application for creating tier lists of individual items at restaurants. Although this application is being developed with this theme in mind, users can make tier lists of whatever they want so go nuts I guess ¯\_(ツ)_/¯.</p>
        {user ? 
          <Button variant="contained" color="secondary" sx={{fontWeight: "fontWeightBold"}}>
            <Link to="/dashboard" style={{ textDecoration: "none", color: "black" }}>
              To dashboard
            </Link> 
          </Button>
          :
          <Button variant="contained" color="secondary" sx={{fontWeight: "fontWeightBold"}}>
            <Link to="/login" style={{ textDecoration: "none", color: "black" }}>
              To login page
            </Link>             
          </Button>
        }
      </div>
      <div className="image-container">
        <h2>Sample image</h2>
        <img src={sample} />
      </div>
    </div>
  );
}
