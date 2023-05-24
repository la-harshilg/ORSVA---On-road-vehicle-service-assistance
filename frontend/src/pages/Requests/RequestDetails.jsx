import {
  Card,
  Divider,
  Spacer,
  Text,
  Loading,
  Button,
} from "@nextui-org/react";
import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import NavbarC from "../../components/Navbar/Navbar";
import { getRequestById } from "../../redux/Slices/requestSlice";
import { IoArrowBackSharp } from "react-icons/io5";

// Map Route
import L from "leaflet";
import Map from "../../components/RouteMap/Maps";

// Download Invoice
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

function RequestDetails() {
  //invoice
  const invoiceRef = useRef();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { requestId } = useParams();
  const { request, loading } = useSelector((state) => state.request);

  useEffect(() => {
    dispatch(getRequestById(requestId));
  }, []);

  const handlerDownloadPdf = async () => {
    const element = invoiceRef.current;
    const canvas = await html2canvas(element);
    const data = canvas.toDataURL("image/png");

    const pdf = new jsPDF();
    const imgProperties = pdf.getImageProperties(data);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProperties.height * pdfWidth) / imgProperties.width;

    pdf.addImage(data, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save(`invoice#${request._id}.pdf`);
  };

  return (
    <>
      <NavbarC />
      <Spacer />
      <Text
        onClick={() => navigate(-1)}
        b
        size="$xl"
        css={{
          display: "flex",
          cursor: "pointer",
          marginLeft: "2.5%",
        }}
      >
        <IoArrowBackSharp size="2%" /> Back
      </Text>
      <Text b size="$4xl" css={{ display: "block", textAlign: "center" }}>
        Request Details{" "}
      </Text>
      <Divider css={{ width: "90%", margin: "auto" }} />
      <Spacer />
      {loading ? (
        <div style={{ display: "block", textAlign: "center" }}>
          <Loading type="default" size="xl" />
        </div>
      ) : (
        <>
          <Card
            ref={invoiceRef}
            variant="bordered"
            css={{
              borderRadius: "0",
              width: "70%",
              margin: "auto",
              padding: "2.5% 2.5%",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <div>
                <Text b size="small">
                  Request ID :{" "}
                  <span style={{ fontWeight: "normal" }}>#{requestId}</span>
                </Text>
                <br />
                <Text b size="small">
                  Payment Mode :{" "}
                  <span style={{ fontWeight: "normal" }}>
                    {request?.payment_mode.toUpperCase()}
                  </span>
                </Text>
                <Text size="smaller">
                  Status :{" "}
                  <span
                    style={{
                      backgroundColor: `${
                        request?.status === "completed"
                          ? "darkgreen"
                          : request?.status === "pending"
                          ? "rgb(246, 190, 0)"
                          : request?.status === "cancelled"
                          ? "darkred"
                          : "darkblue"
                      }`,
                      color: `${
                        request?.status === "completed"
                          ? "white"
                          : request?.status === "pending"
                          ? "black"
                          : "white"
                      }`,
                      padding: "3px 5px",
                    }}
                  >
                    {request?.status.toUpperCase()}
                  </span>
                </Text>
              </div>
              <div>
                <Text css={{ lineHeight: 1 }}>
                  Request Date :{" "}
                  <span style={{ fontWeight: "500" }}>
                    {new Date(request?.reqTime).toLocaleString("en-US")}
                  </span>
                </Text>
              </div>
            </div>
            <Spacer />
            <div>
              <Text css={{ lineHeight: 1 }}>From,</Text>
              <Text size="small" b css={{ lineHeight: 1 }}>
                {request?.mechanic.name}
              </Text>
              <Text size="smaller" css={{ lineHeight: 1 }}>
                {request?.mechanic.address}
              </Text>
            </div>
            <Spacer />
            <div>
              <Text css={{ lineHeight: 1 }}>To,</Text>
              <Text size="small" b css={{ lineHeight: 1 }}>
                {request?.user.name}
              </Text>
              <Text size="smaller" css={{ lineHeight: 1 }}>
                {request?.user.email}
              </Text>
              <Spacer />
              <Text size="smaller" css={{ lineHeight: 1 }}>
                <Text b>Contact</Text>
                <br />
                +91 {request?.user.mobile}
              </Text>
            </div>
            <Spacer />
            <Divider />
            <Spacer />
            <div>
              <Text b css={{ textDecoration: "underline" }}>
                Vehicle details
              </Text>
              <div>
                <Text css={{ lineHeight: 1 }}>
                  Modelname :{" "}
                  <span style={{ fontWeight: "500" }}>
                    {request?.vehicle.modelname}
                  </span>
                </Text>
                <Text css={{ lineHeight: 1 }}>
                  Vehicle Number :{" "}
                  <span style={{ fontWeight: "500" }}>
                    {request?.vehicle.carno}
                  </span>
                </Text>
              </div>
            </div>
            <Spacer />
            <div>
              <Text b css={{ textDecoration: "underline" }}>
                Service details
              </Text>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Text>1 X {request?.service.name}</Text>
                <Text>₹ {request?.service.amount}</Text>
              </div>
              <Divider />
              <Text b css={{ display: "block", textAlign: "end" }}>
                Total Amount : ₹ {request?.billAmount}
              </Text>
            </div>
            <Spacer />
          </Card>
          <Spacer />
          {request?.status === "completed" && (
            <Button flat onClick={handlerDownloadPdf} css={{ margin: "auto" }}>
              Download Invoice
            </Button>
          )}
          {(request?.status === "pending" ||
            request?.status === "inprogress") && (
            <div>
              <Text
                b
                size="$4xl"
                css={{ display: "block", textAlign: "center" }}
              >
                Route to Request
              </Text>
              <Divider css={{ width: "90%", margin: "auto" }} />
              <Spacer />
              <Map
                mechanicpoint={L.latLng(
                  request?.mechanic.location.coordinates[0],
                  request?.mechanic.location.coordinates[1]
                )}
                userpoint={L.latLng(
                  request?.reqLoc.coordinates[0],
                  request?.reqLoc.coordinates[1]
                )}
                user={`<b>${request?.user.name}</b>`}
                mechanic={`<b>${request?.mechanic.name}</b>`}
              />
            </div>
          )}
        </>
      )}
      <Spacer />
    </>
  );
}

export default RequestDetails;
