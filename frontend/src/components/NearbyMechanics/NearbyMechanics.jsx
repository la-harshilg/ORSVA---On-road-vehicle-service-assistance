import { Spacer, Text, Divider } from "@nextui-org/react";
import React, { useEffect } from "react";
import NavbarC from "../Navbar/Navbar";
import Mechanics from "./Mechanics";

function NearbyMechanics() {
  useEffect(() => {
    localStorage.getItem("page") && localStorage.removeItem("page");
  }, []);

  return (
    <>
      <NavbarC />
      <Spacer />
      <Text b size="$4xl" css={{ display: "block", textAlign: "center" }}>
        Nearby Mechanics
      </Text>
      <Divider css={{ width: "90%", margin: "0 auto" }} />
      <Spacer />
      <Mechanics />
      <Spacer />
    </>
  );
}

export default NearbyMechanics;
