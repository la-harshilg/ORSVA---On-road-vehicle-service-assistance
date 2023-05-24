import React from "react";
import NavbarC from "../../components/Navbar/Navbar";
import { Card, Text, Spacer, Button, Input } from "@nextui-org/react";
import { Formik } from "formik";
import * as Yup from "yup";
import classes from "./ResetPassword.module.css";
import { useDispatch } from "react-redux";
import { userresetPassword } from "../../redux/Slices/authSlice";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer } from "react-toastify";

function ResetPassword() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { resetToken } = useParams();

  const passwordSchema = Yup.object({
    password: Yup.string()
      .min(8, "Password must contains 8 characters.")
      .required("Please enter your password."),
    confirmpassword: Yup.string().oneOf(
      [Yup.ref("password"), null],
      "Passwords must match."
    ),
  });
  const handleSubmit = (values) => {
    console.log(values);
    dispatch(
      userresetPassword({
        navigate,
        resettoken: resetToken,
        data: { password: values.password },
      })
    );
  };

  return (
    <>
      <NavbarC />
      <Card className={classes.content} variant="bordered">
        <Text h3>Reset your Password</Text>
        <Formik
          initialValues={{ password: "", confirmpassword: "" }}
          onSubmit={handleSubmit}
          validationSchema={passwordSchema}
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
                <Input.Password
                  placeholder="Create Password"
                  name="password"
                  id="password"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password}
                  width="400px"
                  clearable
                />
                <br />
                {errors.password && touched.password && (
                  <span style={{ color: "red", textAlign: "end" }}>
                    {errors.password}
                  </span>
                )}
                <Spacer />

                <Input.Password
                  placeholder="Confirm Password"
                  name="confirmpassword"
                  id="confirmpassword"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.confirmpassword}
                  width="400px"
                  clearable
                />
                <br />
                {errors.confirmpassword && touched.confirmpassword && (
                  <span style={{ color: "red", textAlign: "end" }}>
                    {errors.confirmpassword}
                  </span>
                )}
                <Spacer />
                <Button
                  type="submit"
                  disabled={!(isValid && dirty)}
                  css={{ width: "400px", backgroundColor: "Black" }}
                >
                  Reset Password
                </Button>
              </form>
            );
          }}
        </Formik>
      </Card>
      <ToastContainer
        position="top-right"
        autoClose={3000}
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

export default ResetPassword;
