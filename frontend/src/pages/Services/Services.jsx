import {
  Button,
  Divider,
  Pagination,
  Spacer,
  Text,
  Modal,
  Loading,
} from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import NavbarC from "../../components/Navbar/Navbar";
import AddService from "../../components/Service/AddService";
import Service from "../../components/Service/Service";
import classes from "./Services.module.css";
import {
  deleteService,
  getServicesByMechanic,
} from "../../redux/Slices/serviceSlice";
import { ToastContainer } from "react-toastify";

function Services() {
  const [page, setpage] = useState(1);
  const [visible, setVisible] = useState(false);
  const [deleteVisible, setdeleteVisible] = useState(null);
  const dispatch = useDispatch();
  const { services, message, length, loading } = useSelector(
    (state) => state.service
  );

  useEffect(() => {
    dispatch(getServicesByMechanic(page));
  }, [message, page]);

  return (
    <>
      <NavbarC />
      <Spacer />
      <Text b size="$4xl" css={{ display: "block", textAlign: "center" }}>
        Manage your Services
      </Text>
      <Divider css={{ width: "90%", margin: "0 auto" }} />
      <Spacer />
      <Button
        css={{
          margin: "auto",
          backgroundColor: "$blue900",
          width: "400px",
        }}
        onClick={() => setVisible(true)}
      >
        <Text size="$lg" color="white">
          Add Service
        </Text>
      </Button>
      <Spacer />
      <AddService open={visible} onClose={() => setVisible(false)} />
      {services?.length !== 0 ? (
        <>
          {loading ? (
            <div style={{ display: "block", textAlign: "center" }}>
              <Loading type="default" size="xl" />
            </div>
          ) : (
            <>
              <div>
                {services?.map((service) => {
                  return (
                    <Service
                      servicename={service.name}
                      servicedesc={service.description}
                      serviceprice={service.amount}
                      deleteService={() => {
                        setdeleteVisible(service._id);
                      }}
                    />
                  );
                })}
                {/* Delete Service Modal */}
                <Modal
                  open={deleteVisible}
                  onClose={() => setdeleteVisible(null)}
                  width="30%"
                  css={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Modal.Header>
                    <h4>Confirm Delete Service</h4>
                  </Modal.Header>
                  <Modal.Body>
                    Are you sure? Do you want to delete this service?
                  </Modal.Body>
                  <Modal.Footer>
                    <Button
                      onClick={() => setdeleteVisible(null)}
                      css={{ width: "max-content", backgroundColor: "Black" }}
                    >
                      No
                    </Button>
                    <Button
                      css={{ backgroundColor: "DarkRed" }}
                      onClick={() => {
                        dispatch(deleteService(deleteVisible));
                        setdeleteVisible(null);
                      }}
                    >
                      Yes
                    </Button>
                  </Modal.Footer>
                </Modal>
              </div>
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
        </>
      ) : (
        <>
          <Spacer />
          <Text size="$2xl" css={{ display: "block", textAlign: "center" }}>
            No Services Yet
          </Text>
        </>
      )}
      <Spacer />
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
}

export default Services;
