import React, { useEffect } from "react";
import classes from "./HomePage.module.css";
import { Text } from "@nextui-org/react";
import NavbarC from "../components/Navbar/Navbar";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function HomePage() {
  const { token, role } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (token && role === "mechanic") {
      navigate(`/dashboard`);
    } else if (token && role === "user") {
      navigate("/nearbymechanics");
    }
  }, [token, role]);

  return (
    <>
      <div className={classes.body_bg}>
        <NavbarC />
        <Text
          size={"$7xl"}
          weight="bold"
          css={{ color: "White", textAlign: "center", padding: "30vh 0" }}
        >
          On Road Vehicle Service Assistance
        </Text>
      </div>
    </>
  );
}

export default HomePage;
