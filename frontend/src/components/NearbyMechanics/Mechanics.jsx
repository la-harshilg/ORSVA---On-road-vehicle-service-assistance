import { Pagination, Spacer, Loading } from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllMechanics,
  getnearbyMechanics,
} from "../../redux/Slices/mechanicSlice";
import Mechanic from "./Mechanic";
import classes from "./Mechanics.module.css";
import { getDistanceFromLatLonInKm } from "../../utils/distance";
import { useNavigate } from "react-router-dom";

function Mechanics() {
  const dispatch = useDispatch();
  const [page, setpage] = useState(1);
  const [location, setLocation] = useState(null);
  const { mechanics, length, loading } = useSelector((state) => state.mechanic);

  const navigate = useNavigate();

  // Getting current location
  useEffect(() => {
    // if (navigator.geolocation.getCurrentPosition) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        console.log(position);
        setLocation({
          lat: position?.coords.latitude,
          lng: position?.coords.longitude,
        });
        dispatch(
          getnearbyMechanics({
            location: {
              lat: position?.coords.latitude,
              lng: position?.coords.longitude,
            },
            page: 1,
          })
        );
      },
      () => {
        setLocation(null);
        dispatch(getAllMechanics(1));
      }
    );
  }, []);

  const onPageChange = (newpage) => {
    console.log(newpage);
    dispatch(
      location === null
        ? getAllMechanics(newpage)
        : getnearbyMechanics({ location, page: newpage })
    );
  };

  return (
    <>
      {loading ? (
        <div style={{ display: "block", textAlign: "center" }}>
          <Loading type="default" size="xl" />
        </div>
      ) : (
        <>
          <div className={classes.mechanics}>
            {mechanics?.map((mechanic) => {
              const d = getDistanceFromLatLonInKm(
                location?.lat,
                location?.lng,
                mechanic.location.coordinates[0],
                mechanic.location.coordinates[1]
              );
              const slug = mechanic.name
                .toLowerCase()
                .trim()
                .replace(/[^\w\s-]/g, "")
                .replace(/[\s_-]+/g, "-")
                .replace(/^-+|-+$/g, "");
              return (
                <Mechanic
                  key={mechanic._id}
                  image={mechanic.profileImg}
                  name={mechanic.name}
                  address={mechanic.address}
                  mobile={mechanic.mobile}
                  time={
                    location != null
                      ? `${Math.ceil((d / 40) * 60)} mins`
                      : "Enable Location"
                  }
                  onClick={() => {
                    navigate(`/nearbymechanics/${slug}`, {
                      state: { mechanic, d },
                    });
                  }}
                />
              );
            })}
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
          total={Math.ceil(length / 6)}
          initialPage={1}
          onChange={onPageChange}
          color="gradient"
        />
      </div>
      <Spacer />
    </>
  );
}

export default Mechanics;
