import React from "react";
import { Button, Card, Image, Text } from "@nextui-org/react";
import classes from "./MechService.module.css";
import service1 from "../../images/service1.png";

function MechService(props) {
  return (
    <Card
      isHoverable
      variant="bordered"
      css={{
        width: "70%",
        height: "fit-content",
        margin: "10px auto",
        padding: "5px 10px",
        display: "grid",
        gridTemplateColumns: "10% 50% 20% 20%",
      }}
    >
      <div>
        <Image src={service1} objectFit="cover" />
      </div>
      <div style={{ margin: "auto 10%" }}>
        <Text size={"$4xl"} b>
          {props.servicename}
        </Text>
        <Text>{props.servicedesc}</Text>
      </div>
      <div className={classes["card-price"]}>₹ {props.serviceprice}</div>
      <div className={classes.requestbtn} onClick={props.onRequest}>
        Request
      </div>
    </Card>
  );
}

export default MechService;
