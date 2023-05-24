import { Spacer, Pagination, Text, Divider, Loading } from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import NavbarC from "../../components/Navbar/Navbar";
import { getMechServices } from "../../redux/Slices/mechanicSlice";
import CreateRequest from "../Requests/CreateRequest";
import MechService from "./MechService";
import classes from "./MechServices.module.css";
import { IoArrowBackSharp } from "react-icons/io5";

function MechServices() {
  const { state } = useLocation();
  const [page, setpage] = useState(1);

  const [visible, setVisible] = useState(false);
  const [reqdata, setReqdata] = useState(null);

  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { services, length, loading } = useSelector((state) => state.mechanic);

  useEffect(() => {
    dispatch(getMechServices({ mechId: state.mechanic._id, page }));
  }, [page]);

  return (
    <>
      <NavbarC />
      <Spacer />
      <Text
        onClick={() => navigate(-1)}
        b
        size="$xl"
        css={{ display: "flex", cursor: "pointer", marginLeft: "2.5%" }}
      >
        <IoArrowBackSharp size="2%" /> Back
      </Text>
      <div className={classes.info}>
        <Text b size="$4xl" css={{ fontVariant: "small-caps" }}>
          {state.mechanic.name}
        </Text>
        <Text>All Mechanic Services.</Text>
        <Text>Available : 24X7</Text>
        <Text>{state.mechanic.address}</Text>
        <Text>Distance : {state.d.toPrecision(2)} KMs</Text>
        <Divider css={{ width: "90%", margin: "auto" }} />
      </div>
      <Spacer />
      <Text b size="$3xl" css={{ display: "block", textAlign: "center" }}>
        Available Services
      </Text>
      {services?.length !== 0 ? (
        <>
          {loading ? (
            <div style={{ display: "block", textAlign: "center" }}>
              <Spacer />
              <Loading type="default" size="xl" />
            </div>
          ) : (
            <>
              {services?.map((service) => {
                return (
                  <MechService
                    key={service._id}
                    servicename={service.name}
                    servicedesc={service.description}
                    serviceprice={service.amount}
                    onRequest={() => {
                      setVisible(true);
                      setReqdata({ service, mechanic: state.mechanic._id });
                    }}
                  />
                );
              })}
              <CreateRequest
                data={reqdata}
                open={visible}
                onClose={() => {
                  setVisible(false);
                }}
              />
              <Spacer />
            </>
          )}
          <div
            className={classes.pagination}
            style={{ display: `${loading ? "none" : "block"}` }}
          >
            <Pagination
              loop
              shadow
              noMargin
              size={"lg"}
              total={Math.ceil(length / 5)}
              initialPage={1}
              onChange={(page) => {
                setpage(page);
              }}
              color="gradient"
            />
          </div>
          <Spacer />
        </>
      ) : (
        <Text size="$2xl" css={{ display: "block", textAlign: "center" }}>
          No Servies Available
        </Text>
      )}
      <Spacer />
    </>
  );
}

export default MechServices;
