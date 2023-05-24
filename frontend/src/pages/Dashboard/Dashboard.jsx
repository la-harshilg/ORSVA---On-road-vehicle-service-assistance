import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import NavbarC from "../../components/Navbar/Navbar";
import { Card, Divider, Spacer, Text } from "@nextui-org/react";
import PendingRequests from "../Requests/PendingRequests";
import classes from "./Dashboard.module.css";
import {
  getTotalRequests,
  getWeekwiseRequests,
} from "../../redux/Slices/requestSlice";
import CountUp from "react-countup";
import Chart from "react-apexcharts";

function Dashboard() {
  const { token, role } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const {
    totalRequests,
    totalPendingRequests,
    totalApprovedRequests,
    totalinprogressRequests,
    totalcancelledrequests,
    dayrequests,
    message,
  } = useSelector((state) => state.request);

  // Mechanic Dashboard Requests
  useEffect(() => {
    dispatch(getTotalRequests());
    dispatch(getWeekwiseRequests());
  }, [message]);

  useEffect(() => {
    if (
      (!token || token === "null" || token === "undefined") &&
      role === "user"
    ) {
      navigate("/signin");
    }
  }, [navigate, token]);

  return (
    <>
      <NavbarC />
      <Spacer />
      <Text b size="$4xl" css={{ display: "block", textAlign: "center" }}>
        Dashboard Information
      </Text>
      <Divider css={{ width: "90%", margin: "0 auto" }} />
      <Spacer />
      <div className={classes.dashboardinfo}>
        <div style={{ borderRight: "0.5px solid gray" }}>
          <Card
            isHoverable
            variant="bordered"
            css={{
              borderRadius: 0,
              padding: "0 10px",
              width: "80%",
            }}
          >
            <Text size="$xl">Total Requests</Text>
            <Text size="$4xl" b>
              <CountUp duration={1} end={totalRequests} />
            </Text>
          </Card>
          <Spacer />
          <Card
            isHoverable
            variant="bordered"
            css={{ borderRadius: 0, padding: "0 10px", width: "80%" }}
          >
            <Text size="$xl">Total Pending Requests</Text>
            <Text size="$4xl" b>
              <CountUp duration={1} end={totalPendingRequests} />
            </Text>
          </Card>
          <Spacer />
          <Card
            isHoverable
            variant="bordered"
            css={{ borderRadius: 0, padding: "0 10px", width: "80%" }}
          >
            <Text size="$xl">Total In Progress Requests</Text>
            <Text size="$4xl" b>
              <CountUp duration={1} end={totalinprogressRequests} />
            </Text>
          </Card>
          <Spacer />
          <Card
            isHoverable
            variant="bordered"
            css={{ borderRadius: 0, padding: "0 10px", width: "80%" }}
          >
            <Text size="$xl">Total Approved Requests</Text>
            <Text size="$4xl" b>
              <CountUp duration={1} end={totalApprovedRequests} />
            </Text>
          </Card>
          <Spacer />
          <Card
            isHoverable
            variant="bordered"
            css={{ borderRadius: 0, padding: "0 10px", width: "80%" }}
          >
            <Text size="$xl">Total Cancelled Requests</Text>
            <Text size="$4xl" b>
              <CountUp duration={1} end={totalcancelledrequests} />
            </Text>
          </Card>
        </div>
        {dayrequests && (
          <div style={{ margin: "0 5%" }}>
            <Chart
              type="bar"
              height="520px"
              width="100%"
              series={[
                {
                  name: "Requests",
                  data: Object.values(dayrequests),
                },
              ]}
              options={{
                chart: {
                  id: "requestsbyweek",
                },
                xaxis: {
                  categories: Object.keys(dayrequests),
                  title: {
                    text: "Weekdays",
                    style: {
                      fontSize: "14px",
                      fontWeight: "normal",
                    },
                  },
                },
                yaxis: {
                  tickAmount: Object.values(dayrequests).sort(
                    (a, b) => b - a
                  )[0],
                  labels: {
                    formatter: function (val) {
                      return val.toFixed(0);
                    },
                  },
                  title: {
                    text: "Total number of Requests",
                    style: {
                      fontSize: "14px",
                      fontWeight: "normal",
                    },
                  },
                },
                title: {
                  text: "Weekdaywise Total Requests",
                  align: "center",
                  margin: 10,
                  offsetX: 0,
                  offsetY: 0,
                  floating: false,
                  style: {
                    fontSize: "16px",
                    fontWeight: "bold",
                    color: "#263238",
                  },
                },
                annotations: {
                  xaxis: [
                    {
                      label: "Weekdays",
                    },
                  ],
                },
              }}
            />
          </div>
        )}
      </div>
      <Spacer />
      <Divider css={{ width: "90%", margin: "0 auto" }} />
      <div>
        <Text b size="$4xl" css={{ display: "block", textAlign: "center" }}>
          Pending Requests
        </Text>
        <Divider css={{ width: "90%", margin: "0 auto" }} />
        <Spacer />
        <PendingRequests />
      </div>
      <Spacer />
    </>
  );
}

export default Dashboard;
