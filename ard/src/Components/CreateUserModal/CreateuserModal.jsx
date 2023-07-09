import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useState } from "react";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { useForm } from "react-hook-form";
import { Stor } from "../../Context/Store";
import axios from "../../Api/Axios";
import { useAlert } from "react-alert";
function CreateuserModal() {
  const [show, setShow] = useState(false);
  const { register, handleSubmit } = useForm();
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const { setBlockUi } = Stor();
  const alert = useAlert();

  const onSubmit = (data) => {
    setBlockUi(true);
    axios
      .post("admin/create-user", data)
      .then((res) => {
        setBlockUi(false);
        alert.success(res.data.message);
        setShow(false);
      })
      .catch((err) => {
        setBlockUi(false);
        alert.error(err.response.data.message);
      });
  };
  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Create
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Create User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form noValidate onSubmit={handleSubmit(onSubmit)}>
            <Row className="mb-3">
              <Form.Group as={Col} md="4" controlId="validationCustom01">
                <Form.Label>First name</Form.Label>
                <Form.Control
                  {...register("name", { required: true })}
                  type="text"
                  placeholder="First name"
                />
              </Form.Group>
              <Form.Group as={Col} md="4" controlId="validationCustom01">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  {...register("email", { required: false })}
                  placeholder="First name"
                />
              </Form.Group>
              <Form.Group as={Col} md="4" controlId="validationCustom01">
                <Form.Label>Mobile</Form.Label>
                <Form.Control
                  required
                  type="number"
                  {...register("mobile", {
                    required: true,
                    minLength: 10,
                    maxLength: 10,
                  })}
                  minLength={9}
                  maxLength={10}
                  placeholder="First name"
                />
              </Form.Group>
            </Row>
            <Button
              variant="secondary"
              style={{ width: "50%" }}
              onClick={handleClose}
            >
              Close
            </Button>
            <Button type="submit" style={{ width: "50%" }}>
              Submit
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default CreateuserModal;
