import React, { useEffect, useState } from "react";
import NavbarC from "../../components/Navbar/Navbar";
import { Spacer, Divider, Text, Pagination, Loading } from "@nextui-org/react";
import { useDispatch, useSelector } from "react-redux";
import {
  getMechanicsRequests,
  updateStatusRequest,
} from "../../redux/Slices/requestSlice";
import classes from "./MechanicRequests.module.css";
import MechanicRequest from "./MechanicRequest";

function MechanicRequests() {
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);

  const { requests, length, loading, message } = useSelector(
    (state) => state.request
  );

  useEffect(() => {
    dispatch(getMechanicsRequests(page));
  }, [page, message]);

  return (
    <>
      <NavbarC />
      <Spacer />
      <Text b size="$4xl" css={{ display: "block", textAlign: "center" }}>
        Requests History{" "}
      </Text>

      <Divider css={{ width: "90%", margin: "auto" }} />
      <Spacer />
      {requests?.length !== 0 ? (
        <>
          {loading ? (
            <div style={{ display: "block", textAlign: "center" }}>
              <Loading type="default" size="xl" />
            </div>
          ) : (
            <>
              {requests?.map((request, idx) => (
                <MechanicRequest
                  request={request}
                  onAccept={() => {
                    dispatch(
                      updateStatusRequest({
                        requestId: request._id,
                        status: { status: "inprogress" },
                      })
                    );
                  }}
                  onComplete={() => {
                    dispatch(
                      updateStatusRequest({
                        requestId: request._id,
                        status: { status: "completed" },
                      })
                    );
                  }}
                />
              ))}
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
                setPage(page);
              }}
              color="gradient"
            />
          </div>
        </>
      ) : (
        <Text size="$2xl" css={{ display: "block", textAlign: "center" }}>
          No Requests Yet
        </Text>
      )}
      <Spacer />
    </>
  );
}

export default MechanicRequests;
