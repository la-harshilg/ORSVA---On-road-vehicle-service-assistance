import { Modal, Text, Input, Spacer, Button, Loading } from "@nextui-org/react";
import React from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { addService } from "../../redux/Slices/serviceSlice";

function AddService(props) {
  const initialValues = {
    name: "",
    description: "",
    amount: null,
  };

  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.service);

  const serviceSchema = Yup.object({
    name: Yup.string().required("Please provide service name."),
    description: Yup.string().required("Please provide service description."),
    amount: Yup.number()
      .typeError("Amount must be number.")
      .min(0, "Amount must be greater than 0.")
      .required("Please provide service amount."),
  });
  const handleSubmit = (values) => {
    dispatch(addService(values));
    props.onClose();
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
        <Text h3>Add Service</Text>
      </Modal.Header>
      <Modal.Body>
        <Formik
          initialValues={initialValues}
          onSubmit={handleSubmit}
          validationSchema={serviceSchema}
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
                  placeholder="Service Name"
                  clearable
                  width="400px"
                  name="name"
                  id="name"
                  value={values.name}
                  onBlur={handleBlur}
                  onChange={handleChange}
                />
                <br />
                {errors.name && touched.name && (
                  <span style={{ color: "red", textAlign: "end" }}>
                    {errors.name}
                  </span>
                )}
                <Spacer />
                <Input
                  placeholder="Service Description"
                  clearable
                  width="400px"
                  name="description"
                  id="description"
                  value={values.description}
                  onBlur={handleBlur}
                  onChange={handleChange}
                />
                <br />
                {errors.description && touched.description && (
                  <span style={{ color: "red", textAlign: "end" }}>
                    {errors.description}
                  </span>
                )}
                <Spacer />
                <Input
                  placeholder="Service Amount"
                  type="number"
                  width="400px"
                  labelLeft="₹"
                  step="10"
                  name="amount"
                  id="amount"
                  value={values.amount}
                  onBlur={handleBlur}
                  onChange={handleChange}
                />
                <br />
                {errors.amount && touched.amount && (
                  <span style={{ color: "red", textAlign: "end" }}>
                    {errors.amount}
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
                  {loading ? <Loading type="spinner" /> : "Add Service"}
                </Button>
              </form>
            );
          }}
        </Formik>
      </Modal.Body>
    </Modal>
  );
}

export default AddService;
