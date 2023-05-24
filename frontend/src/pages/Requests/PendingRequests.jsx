import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPendingRequests } from "../../redux/Slices/requestSlice";
import { Pagination, Loading, Text, Spacer } from "@nextui-org/react";
import classes from "./PendingRequests.module.css";
import MechanicRequest from "./MechanicRequest";
import { updateStatusRequest } from "../../redux/Slices/requestSlice";

function PendingRequests() {
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);

  const { requests, length, loading, message } = useSelector(
    (state) => state.request
  );

  useEffect(() => {
    dispatch(getPendingRequests(page));
  }, [page, message]);

  return requests?.length !== 0 ? (
    <>
      {loading ? (
        <div style={{ display: "block", textAlign: "center" }}>
          <Loading type="default" size="xl" />
        </div>
      ) : (
        <>
          {requests?.map((request) => (
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
        </>
      )}
      <Spacer />
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
      <Spacer />
    </>
  ) : (
    <Text size="$2xl" css={{ display: "block", textAlign: "center" }}>
      No Pending Requests
    </Text>
  );
}

export default PendingRequests;
