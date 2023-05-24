import React, { useState, useEffect } from "react";
import NavbarC from "../../components/Navbar/Navbar";
import { Card, Text, Input, Button, Loading } from "@nextui-org/react";
import classes from "./MechanicSignUp.module.css";
import * as Yup from "yup";
import { Formik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { signUpMechanic } from "../../redux/Slices/authSlice";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import MechAvatar from "./mechanicavatar.jpg";

function MechanicSignUp() {
  const [img, setImg] = useState(MechAvatar);

  const [profilepic, setProfilepic] = useState(null);
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { token, loading } = useSelector((state) => state.auth);

  useEffect(() => {
    if (token) {
      navigate("/dashboard");
    }
  }, []);

  const initialValues = {
    name: "",
    email: "",
    mobile: "",
    address: "",
    password: "",
  };

  // Load image in img
  const onfilechange = (e) => {
    e.preventDefault();
    const reader = new FileReader();
    reader.onloadend = () => {
      setImg(reader.result);
    };
    reader.readAsDataURL(e.target.files[0]);
    setProfilepic(e.target.files[0]);
  };

  const mechanicSignUpSchema = Yup.object({
    name: Yup.string().required("Please enter your name."),
    email: Yup.string()
      .email("Enter valid email address.")
      .required("Please provide your email."),
    mobile: Yup.string()
      .length(10, "Enter valid mobile number.")
      .required("Please provide your mobile number."),
    address: Yup.string().required("Please provide your address."),
    password: Yup.string()
      .min(8, "Password is too short.")
      .required("Please create password."),
  });

  const handleSubmit = (values) => {
    const mechanicData = new FormData();
    mechanicData.append("profileImg", profilepic);
    mechanicData.append("name", values.name);
    mechanicData.append("email", values.email);
    mechanicData.append("mobile", values.mobile);
    mechanicData.append("address", values.address);
    mechanicData.append("password", values.password);

    dispatch(signUpMechanic({ mechanic: mechanicData, navigate }));
  };

  return (
    <>
      <NavbarC />
      <br />
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={mechanicSignUpSchema}
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
            <>
              <form className={classes.rform} onSubmit={handleSubmit}>
                <Card
                  variant="bordered"
                  css={{
                    display: "flex",
                    flexDirection: "column",
                    textAlign: "center",
                    justifyContent: "center",
                    width: "fit-content",
                    padding: "10px 50px",
                    alignSelf: "center",
                  }}
                >
                  <Text size={"$4xl"} weight="bold">
                    Mechanic Sign Up
                  </Text>

                  {/* Image Upload */}
                  <label htmlFor="pimg" style={{ cursor: "pointer" }}>
                    <img
                      src={img}
                      alt="Profile"
                      style={{ height: 128, width: 256 }}
                    />
                    <br />
                    <span
                      style={{
                        fontSize: "13px",
                        color: "gray",
                        textDecoration: "underline",
                      }}
                    >
                      Upload Mechanic Shop Image
                    </span>
                    <input
                      type="file"
                      id="pimg"
                      accept=".jpg, .png, .jpeg|image/*"
                      style={{ display: "none" }}
                      onChange={onfilechange}
                    />
                  </label>
                  <br />
                  <Input
                    placeholder="Name"
                    width="400px"
                    type="text"
                    name="name"
                    id="name"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.name}
                    clearable
                  />
                  {errors.name && touched.name && (
                    <span style={{ color: "red", textAlign: "end" }}>
                      {errors.name}
                    </span>
                  )}
                  <br />
                  <Input
                    placeholder="Email Address"
                    width="400px"
                    name="email"
                    id="email"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.email}
                    clearable
                  />
                  {errors.email && touched.email && (
                    <span style={{ color: "red", textAlign: "end" }}>
                      {errors.email}
                    </span>
                  )}
                  <br />
                  <Input
                    placeholder="Mobile Number"
                    width="400px"
                    labelLeft="+91"
                    name="mobile"
                    id="mobile"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.mobile}
                    clearable
                  />
                  {errors.mobile && touched.mobile && (
                    <span style={{ color: "red", textAlign: "end" }}>
                      {errors.mobile}
                    </span>
                  )}
                  <br />
                  <Input
                    placeholder="Address"
                    width="400px"
                    name="address"
                    id="address"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.address}
                    helperText="Full address with Pincode."
                    clearable
                  />
                  {errors.address && touched.address && (
                    <span style={{ color: "red", textAlign: "end" }}>
                      {errors.address}
                    </span>
                  )}
                  <br />
                  <Input.Password
                    placeholder="Password"
                    width="400px"
                    name="password"
                    id="password"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.password}
                    helperText="Minimum 8 characters."
                    clearable
                  />
                  {errors.password && touched.password && (
                    <span style={{ color: "red", textAlign: "end" }}>
                      {errors.password}
                    </span>
                  )}
                  <br />
                  <Button
                    type="submit"
                    disabled={!(isValid && dirty)}
                    css={{ backgroundColor: "Black" }}
                  >
                    {loading ? (
                      <Loading type="spinner" css={{ color: "White" }} />
                    ) : (
                      "Sign Up"
                    )}
                  </Button>
                </Card>
              </form>
            </>
          );
        }}
      </Formik>
      <br />
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
      ></ToastContainer>
    </>
  );
}

export default MechanicSignUp;
