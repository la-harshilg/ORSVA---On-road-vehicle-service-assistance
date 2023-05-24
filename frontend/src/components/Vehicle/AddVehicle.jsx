import { Button, Input, Modal, Spacer, Text } from "@nextui-org/react";
import { Formik } from "formik";
import React from "react";
import { useDispatch } from "react-redux";
import * as Yup from "yup";
import { addVehicle } from "../../redux/Slices/vehicleSlice";

function AddVehicle(props) {
  const dispatch = useDispatch();
  const initialValues = {
    modelname: "",
    carno: "",
  };

  const vehicleSchema = Yup.object({
    modelname: Yup.string().required("Please provide your vehicle model."),
    carno: Yup.string()
      .matches(
        /[A-Z]{2}[ ][0-9]{2}[ ][A-Z]{2}[ ][0-9]{4}/,
        "Enter valid vehicle number."
      )
      .required("Please provide your vehicle number."),
  });

  const handleSubmit = (values) => {
    // console.log(values);
    dispatch(addVehicle(values));
    props.submmitted();
  };

  return (
    <Modal
      open={props.open}
      onClose={props.onClose}
      closeButton
      width="500px"
      css={{ height: "fit-content", padding: "10px 10px" }}
    >
      <Modal.Header>
        <Text h3>Add Vehicle</Text>
      </Modal.Header>
      <Modal.Body>
        <Formik
          initialValues={initialValues}
          onSubmit={handleSubmit}
          validationSchema={vehicleSchema}
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
                <Input
                  placeholder="Vehicle Model"
                  clearable
                  width="400px"
                  name="modelname"
                  id="modelname"
                  value={values.modelname}
                  onBlur={handleBlur}
                  onChange={handleChange}
                />
                <br />
                {errors.modelname && touched.modelname && (
                  <span style={{ color: "red", textAlign: "end" }}>
                    {errors.modelname}
                  </span>
                )}
                <Spacer />
                <Input
                  placeholder="Vehicle No"
                  clearable
                  width="400px"
                  name="carno"
                  id="carno"
                  value={values.carno}
                  onBlur={handleBlur}
                  onChange={handleChange}
                />
                <br />
                {errors.carno && touched.carno && (
                  <span style={{ color: "red", textAlign: "end" }}>
                    {errors.carno}
                  </span>
                )}
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
                  Add Vehicle
                </Button>
              </form>
            );
          }}
        </Formik>
      </Modal.Body>
    </Modal>
  );
}

export default AddVehicle;
