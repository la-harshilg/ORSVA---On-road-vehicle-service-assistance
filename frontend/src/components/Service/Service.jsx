import { Card, Image, Text } from "@nextui-org/react";
import React from "react";
import service1 from "../../images/service1.png";
import classes from "./Service.module.css";
import { MdDelete } from "react-icons/md";

function Service(props) {
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
      <div className={classes.deletebtn}>
        <MdDelete
          size="35px"
          style={{
            color: "white",
            backgroundColor: "rgb(134, 0, 0)",
            padding: "5px 5px",
            borderRadius: "7px",
            cursor: "pointer",
          }}
          onClick={() => {
            props.deleteService();
          }}
        />
      </div>
    </Card>
  );
}

export default Service;
