import { Button, Card, Input, Loading, Spacer, Text } from "@nextui-org/react";
import { Formik } from "formik";
import React from "react";
import NavbarC from "../../components/Navbar/Navbar";
import classes from "./ForgotPassword.module.css";
import * as Yup from "yup";
import { ToastContainer } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { userforgotPassword } from "../../redux/Slices/authSlice";

function ForgotPassword() {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.auth);

  const emailSchema = Yup.object({
    email: Yup.string()
      .email("Enter valid email address.")
      .required("Please provide your email."),
  });

  const handleSubmit = (values) => {
    dispatch(userforgotPassword(values));
  };

  return (
    <>
      <NavbarC />
      <Card className={classes.content} variant="bordered">
        <Text h3>Forgot your Password?</Text>
        <Formik
          initialValues={{ email: "" }}
          onSubmit={handleSubmit}
          validationSchema={emailSchema}
        >
          {(formik) => {
            const {
              values,
              handleBlur,
              handleChange,
              handleSubmit,
              touched,
              errors,
              isValid,
              dirty,
            } = formik;
            return (
              <form onSubmit={handleSubmit}>
                <Input
                  placeholder="Email address"
                  name="email"
                  id="email"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email}
                  type="email"
                  width="400px"
                  clearable
                />
                <br />
                {errors.email && touched.email && (
                  <span style={{ color: "red", textAlign: "end" }}>
                    {errors.email}
                  </span>
                )}
                <Spacer />
                <Button
                  type="submit"
                  disabled={!(isValid && dirty)}
                  css={{ width: "400px", backgroundColor: "Black" }}
                >
                  {loading ? (
                    <Loading color="white" type="spinner" />
                  ) : (
                    "Send Mail"
                  )}
                </Button>
              </form>
            );
          }}
        </Formik>
      </Card>
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

export default ForgotPassword;
