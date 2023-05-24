import {
  Card,
  Text,
  Image,
  Spacer,
  Button,
  Divider,
  Popover,
  Grid,
  Row,
  Loading,
  Modal,
} from "@nextui-org/react";
import React, { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import classes from "./ProfileContent.module.css";
import { MdAddBox, MdDelete } from "react-icons/md";
import { useDispatch } from "react-redux";
import {
  deleteVehicle,
  getVehicles,
  setPrimaryVehicle,
} from "../../redux/Slices/vehicleSlice";
import { ToastContainer } from "react-toastify";
import {
  getUserProfile,
  mechanicdeleteAccount,
  userdeleteAccount,
} from "../../redux/Slices/authSlice";
import { useNavigate } from "react-router-dom";
import AddVehicle from "../Vehicle/AddVehicle";
import Map, { Marker, GeolocateControl, FullscreenControl } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";

function ProfileContent() {
  // Add Vehicle Modal
  const [visible, setVisible] = useState(false);
  const [deletevisible, setDeleteVisible] = useState(null);

  const { role, profile, loading: mainloading } = useSelector(
    (state) => state.auth
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { vehicles, message, loading } = useSelector((state) => state.vehicle);

  const primaryVehicle = useMemo(
    () => (role === "user" ? profile?.vehicle._id : null),
    [role, profile]
  );

  useEffect(() => {
    if (role === "user") {
      dispatch(getUserProfile());
      dispatch(getVehicles());
    }
  }, [message]);

  return (
    <>
      <Spacer />
      {role === "user" ? (
        mainloading ? (
          <div style={{ display: "block", textAlign: "center" }}>
            <Loading type="default" size="xl" />
          </div>
        ) : (
          <div className={classes.profile}>
            <Card
              variant="bordered"
              css={{ textAlign: "center", padding: "10px 0" }}
            >
              <Text h2>User Profile</Text>
              <Image
                src={profile?.profileImg}
                css={{
                  height: "150px",
                  width: "150px",
                  border: "1px solid black",
                  padding: "2px 2px",
                  borderRadius: "100%",
                }}
              />
              <Spacer x="0.5" />
              <Text h4>Personal Details</Text>
              <div className={classes.profileinfo}>
                <Text css={{ fontWeight: "$bold", fontSize: "17px" }}>
                  User Name :
                </Text>
                <Text>{profile?.name}</Text>
                <Text css={{ fontWeight: "$bold", fontSize: "17px" }}>
                  User Email :
                </Text>
                <Text>{profile?.email}</Text>
                <Text css={{ fontWeight: "$bold", fontSize: "17px" }}>
                  User Mobile :
                </Text>
                <Text>+91 {profile?.mobile}</Text>
              </div>
              <Spacer x="0.5" />
              <Text h4>Vehicles Details</Text>
              {loading ? (
                <div style={{ display: "block", textAlign: "center" }}>
                  <Loading type="default" size="md" />
                </div>
              ) : (
                <div className={classes.vehicles}>
                  {vehicles?.map((vehicle) => {
                    return (
                      <Card
                        isHoverable
                        variant="bordered"
                        key={vehicle._id}
                        css={{
                          width: "fit-content",
                          height: "fit-content",
                          padding: "20px 20px",
                          margin: "auto",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "space-between",
                          }}
                        >
                          <MdDelete
                            size="25px"
                            color="red"
                            style={{ cursor: "pointer" }}
                            onClick={() => {
                              setDeleteVisible(vehicle._id);
                            }}
                          />
                          {vehicle._id == primaryVehicle ? (
                            <div
                              style={{
                                padding: "0 5px",
                                borderRadius: "5px",
                                backgroundColor: "green",
                                color: "white",
                                fontSize: "15px",
                              }}
                            >
                              Primary
                            </div>
                          ) : (
                            <div
                              className={classes.setprimarybtn}
                              style={{
                                border: "1px solid black",
                                fontSize: "14px",
                                height: "fit-content",
                                padding: "0 5px",
                                borderRadius: "5px",
                                cursor: "pointer",
                              }}
                              onClick={() => {
                                dispatch(setPrimaryVehicle(vehicle._id));
                              }}
                            >
                              Set as Primary
                            </div>
                          )}
                        </div>
                        <Spacer />
                        <Text h5>{vehicle.modelname}</Text>
                        <Text size="smaller">
                          Vehicle Number : {vehicle.carno}
                        </Text>
                      </Card>
                    );
                  })}

                  <MdAddBox
                    size={"40%"}
                    style={{ cursor: "pointer", margin: "auto" }}
                    onClick={() => setVisible(true)}
                  />
                  <AddVehicle
                    open={visible}
                    onClose={() => setVisible(false)}
                    submmitted={() => setVisible(false)}
                  />

                  {/* Vehicle Delete Modal */}
                  <Modal
                    open={deletevisible}
                    onClose={() => setDeleteVisible(null)}
                    width="30%"
                    css={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Modal.Header>
                      <h4>Confirm Delete</h4>
                    </Modal.Header>
                    <Modal.Body>
                      Are you sure? Do you want to delete this vehicle?
                    </Modal.Body>
                    <Modal.Footer>
                      <Button
                        onClick={() => setDeleteVisible(null)}
                        css={{ width: "max-content", backgroundColor: "Black" }}
                      >
                        No
                      </Button>
                      <Button
                        css={{ backgroundColor: "DarkRed" }}
                        onClick={() => {
                          dispatch(deleteVehicle(deletevisible));
                          setDeleteVisible(null);
                        }}
                      >
                        Yes
                      </Button>
                    </Modal.Footer>
                  </Modal>
                </div>
              )}
              <Spacer />
              <Popover>
                <Popover.Trigger>
                  <Button
                    color="error"
                    flat
                    css={{
                      width: "300px",
                      margin: "auto",
                    }}
                  >
                    Delete Account
                  </Button>
                </Popover.Trigger>
                <Popover.Content>
                  <Grid.Container
                    css={{
                      borderRadius: "14px",
                      padding: "0.75rem",
                      maxWidth: "330px",
                    }}
                  >
                    <Row justify="center" align="center">
                      <Text b>Confirm</Text>
                    </Row>
                    <Row>
                      <Text>
                        Are you sure you want to delete this user ? By doing
                        this, you will not be able to recover the data.
                      </Text>
                    </Row>
                    <Grid.Container justify="center">
                      <Grid>
                        <Button
                          size="sm"
                          shadow
                          color="error"
                          onClick={() => dispatch(userdeleteAccount(navigate))}
                        >
                          Delete
                        </Button>
                      </Grid>
                    </Grid.Container>
                  </Grid.Container>
                </Popover.Content>
              </Popover>
            </Card>
          </div>
        )
      ) : (
        <div className={classes.profile}>
          <Card
            variant="bordered"
            css={{ textAlign: "center", padding: "10px 0" }}
          >
            <Text h2>Mechanic Profile</Text>
            <Image
              src={profile?.profileImg}
              width="300px"
              height="200px"
              objectFit="cover"
              css={{
                border: "0.5px solid black",
                padding: "2px 2px",
              }}
            />
            <Spacer x="0.5" />
            <Text h4>Personal Details</Text>
            <div className={classes.profileinfo}>
              <Text css={{ fontWeight: "$bold", fontSize: "17px" }}>
                Mechanic Name :
              </Text>
              <Text>{profile?.name}</Text>
              <Text css={{ fontWeight: "$bold", fontSize: "17px" }}>
                Mechanic Email :
              </Text>
              <Text>{profile?.email}</Text>
              <Text css={{ fontWeight: "$bold", fontSize: "17px" }}>
                Mechanic Mobile :
              </Text>
              <Text>+91 {profile?.mobile}</Text>
              <Text css={{ fontWeight: "$bold", fontSize: "17px" }}>
                Mechanic Address :
              </Text>
              <Text>{profile?.address}</Text>
            </div>
            <div>
              <Divider css={{ width: "90%", margin: "auto" }} />
              <Text css={{ fontWeight: "$bold", fontSize: "20px" }}>
                Mechanic's Shop Location
              </Text>
              <Map
                mapboxAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
                style={{
                  width: "500px",
                  height: "300px",
                  margin: "auto",
                  border: "1px solid black",
                }}
                initialViewState={{
                  longitude: profile.location.coordinates[1],
                  latitude: profile.location.coordinates[0],
                  zoom: 14,
                }}
                mapStyle="mapbox://styles/mapbox/streets-v11"
              >
                <Marker
                  longitude={profile.location.coordinates[1]}
                  latitude={profile.location.coordinates[0]}
                />

                <FullscreenControl />

                <GeolocateControl />
              </Map>
            </div>
            <Spacer x="0.5" />
            <Popover>
              <Popover.Trigger>
                <Button
                  color="error"
                  flat
                  css={{
                    width: "300px",
                    margin: "auto",
                  }}
                >
                  Delete Account
                </Button>
              </Popover.Trigger>
              <Popover.Content>
                <Grid.Container
                  css={{
                    borderRadius: "14px",
                    padding: "0.75rem",
                    maxWidth: "330px",
                  }}
                >
                  <Row justify="center" align="center">
                    <Text b>Confirm</Text>
                  </Row>
                  <Row>
                    <Text>
                      Are you sure you want to delete this user ? By doing this,
                      you will not be able to recover the data.
                    </Text>
                  </Row>
                  <Grid.Container justify="center">
                    <Grid>
                      <Button
                        size="sm"
                        shadow
                        color="error"
                        onClick={() =>
                          dispatch(mechanicdeleteAccount(navigate))
                        }
                      >
                        Delete
                      </Button>
                    </Grid>
                  </Grid.Container>
                </Grid.Container>
              </Popover.Content>
            </Popover>
          </Card>
        </div>
      )}

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

export default ProfileContent;
