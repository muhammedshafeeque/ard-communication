import React from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { BiLogInCircle } from "react-icons/bi";
import { Stor } from "../../Context/Store";
import { useNavigate } from "react-router-dom";
import { useAlert } from "react-alert";
import { useForm } from "react-hook-form";
import axios from "../../Api/Axios";
import { nav } from "../../Constants/routes";

import "./createDsc.scss";

function CreateDse() {
  const { setBlockUi } = Stor();
  const alert = useAlert();
  const { register, handleSubmit } = useForm();
  

  const navigate = useNavigate();
  const onSubmit = async (data) => {
    setBlockUi(true);
    axios
      .post("config/dse", data)
      .then((res) => {
        setBlockUi(false);
        alert.success(res.data.message);
        navigate(nav.DSE);
      })
      .catch((err) => {
        setBlockUi(false);
        alert.error(err.response.data.message);
      });
  };
  return (
    <>
      <div className="createDse">
        <h2 className="mt-4 " style={{ textAlign: "center" }}>
          Create Dse
        </h2>
        <Container>
          <Row>
            <Form className="mb-3" onSubmit={handleSubmit(onSubmit)}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Row className="mt-5">
                  <Col sm="8">
                    <Form.Label>Mobile Number</Form.Label>
                    <Form.Control
                      {...register("mobile", { required: true })}
                      type="number"
                      placeholder="Enter Your Mobile No"
                    />
                  </Col>
                  <Col sm="8">
                    <Form.Label>Stock </Form.Label>
                    <Form.Control
                      {...register("stock", { required: true })}
                      type="number"
                      placeholder="Enter Stock Count"
                    />
                  </Col>
                  <Col sm="8" className="mt-3">
                    <Button
                      type="submit"
                    >
                      <BiLogInCircle />
                      Submit
                    </Button>
                  </Col>
                </Row>
              </Form.Group>
            </Form>
          </Row>
        </Container>
      </div>
    </>
  );
}

export default CreateDse;
