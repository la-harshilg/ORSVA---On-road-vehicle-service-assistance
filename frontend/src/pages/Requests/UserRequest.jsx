import { Card, Spacer, Text } from "@nextui-org/react";
import React from "react";
import { useNavigate } from "react-router-dom";
import classes from "./UserRequest.module.css";

import { MdCancel } from "react-icons/md";

function UserRequest(props) {
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
        "@sm": {
          gridTemplateColumns: "25% 25% 25% 25%",
        },
        "@md": {
          gridTemplateColumns: "10% 35% 40% 15%",
        },
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
          Request To:{" "}
          <span style={{ fontWeight: "normal" }}>
            {props.request.mechanic.name} - {props.request.mechanic.address}
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
      <div className={classes.status_group}>
        <div
          className={classes.statusbtn}
          onClick={() => navigate(`/user/requests/${props.request._id}`)}
        >
          View Status
        </div>
        {props.request.status === "pending" && (
          <div className={classes.cancel_btn} onClick={props.onCancel}>
            <MdCancel color="white" size={20} /> <span>Cancel</span>
          </div>
        )}
      </div>
    </Card>
  );
}

export default UserRequest;
