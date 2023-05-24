import React from "react";
import NavbarC from "../../components/Navbar/Navbar";
import classes from "./NotFound.module.css";
import { Text } from "@nextui-org/react";
import { Link } from "react-router-dom";
import { FaHome, FaArrowRight } from "react-icons/fa";

function NotFound() {
  const IMG_URL =
    "https://static.vecteezy.com/system/resources/previews/009/665/168/original/a-man-wearing-a-suit-asking-for-help-on-his-mobile-for-a-broken-car-a-car-broke-middle-of-an-urban-road-and-the-businessman-asked-for-help-a-black-car-with-a-long-haired-man-flat-character-design-free-png.png";
  return (
    <>
      <NavbarC />
      <div className={classes.notpage}>
        <img src={IMG_URL} className={classes.nimg} alt="Not Found" />
        <div className={classes.textc}>
          <Text css={{ color: "$blue700" }} h1>
            404! <span style={{ color: "Black" }}>Page not found!</span>
          </Text>
        </div>
        <Link to="/" style={{ textAlign: "end" }}>
          <Text
            b
            size={"$lg"}
            css={{
              textDecoration: "underline",
              color: "$blue900",
            }}
          >
            <FaHome />
            &nbsp; Go to HomePage&nbsp; <FaArrowRight />
          </Text>
        </Link>
      </div>
    </>
  );
}

export default NotFound;
