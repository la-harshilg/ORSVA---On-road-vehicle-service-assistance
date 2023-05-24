import { Button, Card, Divider, Text } from "@nextui-org/react";
import React from "react";
import classes from "./Mechanic.module.css";

function Mechanic(props) {
  return (
    <Card
      variant="bordered"
      css={{
        width: "300px",
        height: "400px",
        display: "flex",
        flexDirection: "column",
        borderRadius: 0,
        margin: "auto",
        padding: "20px 20px",
      }}
      isHoverable
    >
      <Card.Body css={{ padding: "0" }}>
        <Card.Image
          src={props.image}
          width="100%"
          height="170px"
          objectFit="cover"
          css={{ border: "0.5px solid gray" }}
        />
        <Text
          b
          size={"$lg"}
          css={{
            margin: "5px 0",
            display: "flex",
            justifyContent: "space-around",
          }}
        >
          {props.name} <span>•</span>{" "}
          <span className={classes.time}>{props.time}</span>
        </Text>
      </Card.Body>
      <Divider css={{ width: "100%", margin: "auto" }} />
      {/* Content */}
      <Card.Footer
        css={{
          display: "flex",
          flexDirection: "column",
          height: "fit-content",
        }}
      >
        <Text css={{ color: "$gray600" }}>All Mechanic Service Available.</Text>
        <Text b css={{ color: "Black" }}>
          Call :{" "}
          <span style={{ color: "$gray700", fontWeight: "normal" }}>
            +91 {props.mobile}
          </span>
        </Text>
      </Card.Footer>
      <Divider css={{ width: "100%", margin: "auto" }} />
      <Button
        flat
        css={{
          margin: "10px auto",
          backgroundColor: "$gray100",
          color: "Black",
        }}
        onClick={props.onClick}
      >
        View Services
      </Button>
    </Card>
  );
}

export default Mechanic;
