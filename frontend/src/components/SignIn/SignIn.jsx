import React, { useEffect, useState } from "react";
import { ToggleButtonGroup, ToggleButton } from "@mui/material";
import NavbarC from "../Navbar/Navbar";
import { Card, Text, Input, Button, Loading } from "@nextui-org/react";
import classes from "./SignIn.module.css";
import { Formik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { signInUser, signInMechanic } from "../../redux/Slices/authSlice";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";

function SignIn() {
  const [role, setrole] = useState("user");

  const dispatch = useDispatch();
  const { token, loading, role: lrole } = useSelector((state) => state.auth);

  const navigate = useNavigate();

  useEffect(() => {
    if (token && lrole === "mechanic") {
      navigate("/dashboard");
    } else if (token && lrole === "user") {
      navigate("/nearbymechanics");
    }
  }, [token, navigate]);

  const initialValues = {
    email: "",
    password: "",
  };

  const signInSchema = Yup.object({
    email: Yup.string()
      .email("Enter valid email address.")
      .required("Please provide your email."),
    password: Yup.string()
      .min(8, "Password is too short.")
      .required("Please enter your password."),
  });

  const handleSubmit = async (values) => {
    if (role === "user") {
      dispatch(signInUser({ user: values, navigate }));
    } else if (role === "mechanic") {
      dispatch(signInMechanic({ mechanic: values, navigate }));
    }
  };

  return (
    <>
      <NavbarC />
      <br />
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={signInSchema}
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
                    Sign In
                  </Text>

                  <ToggleButtonGroup
                    color="primary"
                    value={role}
                    id="role"
                    onChange={(e) => {
                      setrole(e.target.value);
                    }}
                    exclusive
                    fullWidth={true}
                    aria-label="Role"
                  >
                    <ToggleButton value="user">User</ToggleButton>
                    <ToggleButton value="mechanic">Mechanic</ToggleButton>
                  </ToggleButtonGroup>
                  <br />
                  <Input
                    type="email"
                    name="email"
                    id="email"
                    value={values.email}
                    placeholder="Email Address"
                    width="400px"
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
                  <Input.Password
                    name="password"
                    id="password"
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Password"
                    width="400px"
                    clearable
                  />
                  {errors.password && touched.password && (
                    <span style={{ color: "red", textAlign: "end" }}>
                      {errors.password}
                    </span>
                  )}
                  <Link to="/forgotpassword">Forgot Password?</Link>
                  <br />
                  <Button
                    type="submit"
                    disabled={!(isValid && dirty)}
                    css={{ backgroundColor: "Black" }}
                  >
                    {loading ? <Loading type="spinner" /> : "Sign In"}
                  </Button>
                  <br />
                </Card>
              </form>
              <br />
            </>
          );
        }}
      </Formik>
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

export default SignIn;
