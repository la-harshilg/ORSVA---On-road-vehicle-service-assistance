import { Modal, Button, Spacer, Text, Radio } from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import classes from "./CreateRequest.module.css";
import { useDispatch, useSelector } from "react-redux";
import { createRequest } from "../../redux/Slices/requestSlice";
import { useNavigate } from "react-router-dom";
import Logo from "../../images/Logo";

import useRazorpay from "react-razorpay";

function CreateRequest(props) {
  const { profile } = useSelector((state) => state.auth);

  const [reqlocation, setReqlocation] = useState(null);
  const initialValues = {
    description: "",
  };

  const [checked, setChecked] = useState("cod");
  const Razorpay = useRazorpay();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setReqlocation({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      });
    });
  }, []);

  const requestSchema = Yup.object({
    description: Yup.string().required("Please provide request description."),
  });

  const handleSubmit = (values) => {
    const data = props.data;
    const reqData = {
      description: values.description,
      service: data.service._id,
      mechanic: data.mechanic,
      billAmount: data.service.amount,
      payment_mode: checked,
      reqLoc: {
        type: "Point",
        coordinates: [reqlocation?.lat, reqlocation?.lng],
      },
    };

    const handlePayment = (info) => {
      const options = {
        key: "rzp_test_7zOkCZhm1NMEd3", // Enter the Key ID generated from the Dashboard
        amount: info.billAmount * 100, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
        currency: "INR",
        name: "ORVSA",
        description: info.description,
        image: <Logo />,
        handler: function (response) {
          console.log(response);
          dispatch(createRequest({ data: reqData, navigate: navigate }));
          props.onClose();
        },
        prefill: {
          name: profile.name,
          email: profile.email,
          contact: profile.mobile,
        },
        notes: {
          address: "ORSVA, Surat, Gujarat",
        },
        theme: {
          color: "#000000",
        },
      };

      const rzp1 = new Razorpay(options);

      rzp1.on("payment.failed", function (response) {
        console.log(response);
      });

      rzp1.open();
    };

    checked === "prepaid"
      ? handlePayment(reqData)
      : dispatch(createRequest({ data: reqData, navigate: navigate }));
  };

  console.log(checked);

  return (
    <Modal
      open={props.open}
      onClose={props.onClose}
      closeButton
      width="500px"
      css={{ height: "fit-content", padding: "10px 10px" }}
    >
      <Modal.Header>
        <Text h3>Create Request</Text>
      </Modal.Header>
      <Modal.Body>
        <Formik
          initialValues={initialValues}
          onSubmit={handleSubmit}
          validationSchema={requestSchema}
        >
          {(formik) => {
            const {
              values,
              handleChange,
              handleSubmit,
              errors,
              touched,
              handleBlur,
              isValid,
              dirty,
            } = formik;
            return (
              <form style={{ textAlign: "center" }} onSubmit={handleSubmit}>
                <textarea
                  className={classes.tarea}
                  placeholder="Request Description"
                  width="400px"
                  name="description"
                  id="description"
                  value={values.description}
                  onBlur={handleBlur}
                  rows={5}
                  cols={40}
                  onChange={handleChange}
                ></textarea>
                <br />
                {errors.description && touched.description && (
                  <span style={{ color: "red", textAlign: "end" }}>
                    {errors.description}
                  </span>
                )}
                <Spacer />
                <Text b size="large">
                  Payment Options
                </Text>
                <Radio.Group
                  orientation="horizontal"
                  value={checked}
                  onChange={setChecked}
                >
                  <Radio value="cod" size="sm" css={{ margin: "0 13.5%" }}>
                    Cash on Service
                  </Radio>
                  <Radio value="prepaid" size="sm" css={{ margin: "0 13.5%" }}>
                    Prepaid
                  </Radio>
                </Radio.Group>
                <Spacer />
                <Button
                  type="submit"
                  disabled={!(isValid && dirty)}
                  css={{
                    backgroundColor: "Black",
                    width: "400px",
                    margin: "auto",
                  }}
                >
                  Submit Request
                </Button>
              </form>
            );
          }}
        </Formik>
      </Modal.Body>
    </Modal>
  );
}

export default CreateRequest;
