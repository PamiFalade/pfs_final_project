import React, { useState } from "react";
import { Navbar, Nav, Container, Button, Modal, Form } from "react-bootstrap";
import { useFormik } from "formik";
import "./landingPage.css";
import * as Accounts from "../modules/accountData.js";

export default function LandingPage() {
  const [logIn, setLogIn] = useState(false);

  const hideLoginModal = () => {
    setLogIn(false);
  };
  const showLoginModal = () => {
    setLogIn(true);
  };

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    onSubmit: (values) => {
      const account = Accounts.accountsData.find(
        (account) => account.username === values.username
      );
      if (account === null) {
        alert("Either username or password is incorrect");
      } else {
        if (account.password === values.password) {
          alert(`Welcome, ${account.name}`);
        } else {
          alert("Either username or password is incorrect");
        }
      }
    },
    validate: (values) => {
      let errors = {};
      if (!values.username) {
        errors.username = "Required";
      }
      if (!values.password) {
        errors.password = "Required";
      }

      return errors;
    },
  });

  return (
    <div className="page">
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand href="#home">
            <img
              src="https://media-exp1.licdn.com/dms/image/C4D0BAQG81bcDnvsNGQ/company-logo_200_200/0/1519934768980?e=2159024400&v=beta&t=z_pYRiNIoMIaIbBXWZs7tjIBhctAXIjB26BUGXF7cUU"
              height="50px"
            />
            Precise Financial Systems
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="#home">Home</Nav.Link>
              <Nav.Link href="#about">About</Nav.Link>
              <Nav.Link href="https://thepfs.biz/">Company Website</Nav.Link>
              <Nav.Link href="#findUs">Find Us</Nav.Link>
            </Nav>
            <Button
              variant="outline-primary"
              style={{ float: "right" }}
              onClick={showLoginModal}
            >
              Login
            </Button>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Modal
        show={logIn}
        onHide={hideLoginModal}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Login</Modal.Title>
        </Modal.Header>
        <Form onSubmit={formik.handleSubmit}>
          <Modal.Body>
            <Form.Group className="mb-5">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="johndoe123"
                name="username"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.username}
              />
              {formik.errors.username && formik.touched.username ? (
                <div className="errorMessage">{formik.errors.username}</div>
              ) : null}
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="johndoe123"
                name="password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
              />
              {formik.errors.password && formik.touched.password ? (
                <div className="errorMessage">{formik.errors.password}</div>
              ) : null}
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={hideLoginModal}>
              Create an Account
            </Button>
            <Button variant="primary" type="submit">
              Login
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>

      <div className="content">
        <h1>Welcome to PFS</h1>
      </div>
    </div>
  );
}
