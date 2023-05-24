import {
  Spacer,
  Text,
  Divider,
  Pagination,
  Loading,
  Modal,
  Button,
} from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import NavbarC from "../../components/Navbar/Navbar";
import { getUserRequests } from "../../redux/Slices/requestSlice";
import UserRequest from "./UserRequest";
import classes from "./UserRequests.module.css";
import { updateStatusRequest } from "../../redux/Slices/requestSlice";

function UserRequests() {
  const [cancelvisible, setcancelvisible] = useState(null);

  const dispatch = useDispatch();

  const [page, setPage] = useState(
    localStorage.getItem("page") ? localStorage.getItem("page") : 1
  );
  const { requests, length, loading, message } = useSelector(
    (state) => state.request
  );

  useEffect(() => {
    localStorage.getItem("page") && localStorage.removeItem("page");
  }, []);

  useEffect(() => {
    dispatch(getUserRequests(page));
    localStorage.setItem("page", page);
  }, [page, message]);

  return (
    <>
      <NavbarC />
      <Spacer />
      <Text b size="$4xl" css={{ display: "block", textAlign: "center" }}>
        Your requests{" "}
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
              {requests?.map((request) => {
                return (
                  <UserRequest
                    request={request}
                    onCancel={() => setcancelvisible(request._id)}
                  />
                );
              })}
              <Spacer />
              {/* Request Cancel Modal */}
              <Modal
                open={cancelvisible}
                onClose={() => setcancelvisible(null)}
                width="30%"
                css={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Modal.Header>
                  <h4>Confirm Cancel Request</h4>
                </Modal.Header>
                <Modal.Body>
                  Are you sure? Do you want to cancel this request?
                </Modal.Body>
                <Modal.Footer>
                  <Button
                    onClick={() => setcancelvisible(null)}
                    css={{ width: "max-content", backgroundColor: "Black" }}
                  >
                    No
                  </Button>
                  <Button
                    css={{ backgroundColor: "DarkRed" }}
                    onClick={() => {
                      dispatch(
                        updateStatusRequest({
                          requestId: cancelvisible,
                          status: { status: "cancelled" },
                        })
                      );
                      setcancelvisible(null);
                    }}
                  >
                    Yes
                  </Button>
                </Modal.Footer>
              </Modal>
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
              initialPage={
                Number(localStorage.getItem("page"))
                  ? Number(localStorage.getItem("page"))
                  : 1
              }
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

export default UserRequests;
