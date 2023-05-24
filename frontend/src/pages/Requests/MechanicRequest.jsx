import React from "react";
import classes from "./MechanicRequest.module.css";
import { Card, Spacer, Text } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";

function MechanicRequest(props) {
  const navigate = useNavigate();
  return (
    <Card
      variant="bordered"
      isHoverable
      css={{
        width: "70%",
        height: "fit-content",
        padding: "10px 10px",
        margin: "10px auto",
        borderRadius: "7px",
        display: "grid",
        gridTemplateColumns: "15% 30% 40% 15%",
      }}
    >
      <div className={classes[`status-${props.request.status}`]}>
        {props.request.status}
      </div>
      <div className={classes.requestinfo}>
        <Text b size="small">
          RequestId:{" "}
          <span style={{ fontWeight: "normal" }}>{props.request._id}</span>
        </Text>
        <br />
        <Text b size="$sm">
          Request From:{" "}
          <span style={{ fontWeight: "normal" }}>
            {props.request.user.name}
          </span>
        </Text>
      </div>
      <div className={classes.serviceinfo}>
        <Text b size="$sm">
          Description:{" "}
          <span style={{ fontWeight: "normal" }}>
            {props.request.description}
          </span>
        </Text>
        <br />
        <Text b size="$sm">
          Request Date:{" "}
          <span style={{ fontWeight: "normal" }}>
            {new Date(props.request.reqTime).toLocaleString("en-IN", {
              dateStyle: "full",
              timeStyle: "short",
            })}
          </span>
        </Text>
        <br />
        <Text b size="$sm">
          Service Vehicle:{" "}
          <span style={{ fontWeight: "normal" }}>
            {props.request.vehicle.modelname} ({props.request.vehicle.carno})
          </span>
        </Text>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <div
          className={classes.statusbtn}
          onClick={() => navigate(`/mechanic/requests/${props.request._id}`)}
        >
          View
        </div>
        {props.request.status === "pending" ? (
          <div className={classes.acceptbtn} onClick={props.onAccept}>
            Accept
          </div>
        ) : props.request.status === "inprogress" ? (
          <div className={classes.completebtn} onClick={props.onComplete}>
            Completed
          </div>
        ) : null}
      </div>
    </Card>
  );
}

export default MechanicRequest;
