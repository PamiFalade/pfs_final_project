import React, { useRef } from "react";
import {
  Navbar,
  Nav,
  Container,
  Button,
  Modal,
  Form,
  Card,
} from "react-bootstrap";
import SignaturePad from "react-signature-canvas";
import "./landingPage.css";
import { accountsData } from "../modules/accountData";
import { useFormik } from "formik";

export default function CreateAccount() {
  let sigPad = useRef({});
  let signature = "";

  function clear() {
    sigPad.current.clear();
  }

  function save() {
    signature = sigPad.current.toDataURL();
  }

  function show() {
    sigPad.current.show();
  }

  const initialValues = {
    phoneNumber: "",
    fullName: "",
    email: "",
    username: "",
    password: "",
    signature: "",
  };

  const onSubmit = (values) => {
    let account = { ...values };
    account.signature = signature;
    let accountJSON = JSON.stringify(account);
    accountsData.push(accountJSON);
    console.log("hi");
  };

  const validate = (values) => {
    let errors = {};

    if (!values.phoneNumber) {
      errors.phoneNumber = "Required!";
    }
    if (!values.fullName) {
      errors.fullName = "Required!";
    }
    if (!values.email) {
      errors.email = "Required!";
    }
    if (!values.username) {
      errors.username = "Required!";
    }
    if (!values.password) {
      errors.password = "Required!";
    }
    return errors;
  };

  const formik = useFormik({
    initialValues,
    onSubmit,
    validate,
  });

  return (
    <div className="formPage">
      <Card className="form">
        <Card.Header>
          <h2>Create an Account</h2>
        </Card.Header>
        <Form onSubmit={formik.handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Phone Number:</Form.Label>
            <Form.Control
              type="text"
              placeholder="0801 124 5678"
              name="phoneNumber"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.phoneNumber}
            />
            {formik.errors.phoneNumber && formik.touched.phoneNumber ? (
              <div className="errorMessage">{formik.errors.phoneNumber}</div>
            ) : null}
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Label>Full Name:</Form.Label>
            <Form.Control
              type="text"
              placeholder="John Doe"
              name="fullName"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.fullName}
            />
            {formik.errors.fullName && formik.touched.fullName ? (
              <div className="errorMessage">{formik.errors.fullName}</div>
            ) : null}
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Label>Email:</Form.Label>
            <Form.Control
              type="email"
              placeholder="john.doe@hotmail.com"
              name="email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
            />
            {formik.errors.email && formik.touched.email ? (
              <div className="errorMessage">{formik.errors.email}</div>
            ) : null}
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Label>Username:</Form.Label>
            <Form.Control
              type="text"
              placeholder="johnDoe1"
              name="username"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.username}
            />
            {formik.errors.username && formik.touched.username ? (
              <div className="errorMessage">{formik.errors.username}</div>
            ) : null}
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Label>Password:</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter desired password here"
              name="password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
            />
            {formik.errors.password && formik.touched.password ? (
              <div className="errorMessage">{formik.errors.password}</div>
            ) : null}
          </Form.Group>

          <div className="signaturePad" style={{ border: "solid black 1px" }}>
            <SignaturePad
              className="m-signature-pad"
              ref={sigPad}
              penColor="black"
              style={{ width: "100%" }}
            />
          </div>
          <div className="signatureButtons" style={{ padding: "2px" }}>
            <Button variant="dark">
              <i className="fas fa-arrow-left"></i>Back
            </Button>
            <Button variant="warning" onClick={clear}>
              {" "}
              Clear Signature
            </Button>
            <Button onClick={save} variant="info">
              <i className="fas fa-sign-in-alt"></i>Check in
            </Button>
          </div>
          <br />
          <Button variant="success">Create Account</Button>
        </Form>
      </Card>
    </div>
  );
}
