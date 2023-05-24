import React, { useEffect, useState } from "react";
import NavbarC from "../../components/Navbar/Navbar";
import { Card, Text, Input, Button, Loading } from "@nextui-org/react";
import classes from "./UserSignUp.module.css";
import * as Yup from "yup";
import { Formik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { signUpUser } from "../../redux/Slices/authSlice";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

function UserSignUp() {
  const [img, setImg] = useState(
    "https://cdn-icons-png.flaticon.com/64/149/149071.png"
  );

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
    password: "",
    vehicleModel: "",
    vehicleNo: "",
  };

  const userSignUpSchema = Yup.object({
    name: Yup.string().required("Please enter your name."),
    email: Yup.string()
      .email("Enter valid email address.")
      .required("Please provide your email."),
    mobile: Yup.string()
      .length(10, "Enter valid mobile number.")
      .required("Please provide your mobile number."),
    password: Yup.string()
      .min(8, "Password is too short.")
      .required("Please create password."),
    vehicleModel: Yup.string().required("Please provide your vehicle model."),
    vehicleNo: Yup.string()
      .matches(
        /[A-Z]{2}[ ][0-9]{2}[ ][A-Z]{2}[ ][0-9]{4}/,
        "Enter valid vehicle number."
      )
      .required("Please provide your vehicle number."),
  });

  const onfilechange = (e) => {
    e.preventDefault();
    const reader = new FileReader();
    reader.onloadend = () => {
      setImg(reader.result);
    };
    reader.readAsDataURL(e.target.files[0]);
    setProfilepic(e.target.files[0]);
  };

  const handleSubmit = (values) => {
    const userData = new FormData();
    userData.append("profileImg", profilepic);
    userData.append("name", values.name);
    userData.append("email", values.email);
    userData.append("mobile", values.mobile);
    userData.append("password", values.password);
    userData.append("vehicleModel", values.vehicleModel);
    userData.append("vehicleNo", values.vehicleNo);

    dispatch(signUpUser({ user: userData, navigate }));
  };

  return (
    <>
      <NavbarC />
      <br />
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={userSignUpSchema}
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
                    User Sign Up
                  </Text>

                  <label htmlFor="pimg" style={{ cursor: "pointer" }}>
                    <img
                      src={img}
                      alt="Profile"
                      style={{ height: 64, width: 64, borderRadius: "100%" }}
                    />
                    <br />
                    <span
                      style={{
                        fontSize: "13px",
                        color: "gray",
                        textDecoration: "underline",
                      }}
                    >
                      Upload Profile Image
                    </span>
                    <input
                      type="file"
                      id="pimg"
                      accept=".jpg, .png, .jpeg|image/*"
                      name="pimg"
                      style={{ display: "none" }}
                      onChange={onfilechange}
                      required
                    />
                  </label>

                  <br />
                  <Input
                    placeholder="Name"
                    width="400px"
                    name="name"
                    id="name"
                    type="text"
                    value={values.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
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
                    type="email"
                    id="email"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
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
                    name="mobile"
                    id="mobile"
                    value={values.mobile}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    labelLeft="+91"
                    clearable
                  />
                  {errors.mobile && touched.mobile && (
                    <span style={{ color: "red", textAlign: "end" }}>
                      {errors.mobile}
                    </span>
                  )}
                  <br />
                  <Input.Password
                    placeholder="Password"
                    width="400px"
                    name="password"
                    id="password"
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    helperText="Minimum 8 characters."
                    clearable
                  />
                  {errors.password && touched.password && (
                    <span style={{ color: "red", textAlign: "end" }}>
                      {errors.password}
                    </span>
                  )}
                  <br />
                  <Text>Your Vehicle Details</Text>
                  <Input
                    placeholder="Vehicle Model Name"
                    width="400px"
                    name="vehicleModel"
                    id="vehicleModel"
                    value={values.vehicleModel}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    helperText="i.e. Suzuki Baleno"
                    clearable
                  />
                  {errors.vehicleModel && touched.vehicleModel && (
                    <span style={{ color: "red", textAlign: "end" }}>
                      {errors.vehicleModel}
                    </span>
                  )}
                  <br />
                  <Input
                    placeholder="Vehicle Number"
                    width="400px"
                    name="vehicleNo"
                    id="vehicleNo"
                    value={values.vehicleNo}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    helperText="i.e. GJ XX AA XXXX"
                    clearable
                  />
                  {errors.vehicleNo && touched.vehicleNo && (
                    <span style={{ color: "red", textAlign: "end" }}>
                      {errors.vehicleNo}
                    </span>
                  )}
                  <br />
                  <Button
                    type="submit"
                    css={{ backgroundColor: "Black" }}
                    disabled={!(isValid && dirty)}
                  >
                    {loading ? <Loading type="spinner" /> : "Sign Up"}
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
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
}

export default UserSignUp;
