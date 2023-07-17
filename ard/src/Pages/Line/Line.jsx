import React from "react";
import { Form, Col } from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import { BiLogInCircle } from "react-icons/bi";
import axios from "../../Api/Axios";
import "./line.scss";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Stor } from "../../Context/Store";
import { useAlert } from "react-alert";
import { nav } from "../../Constants/routes";

function Line() {
  const { setBlockUi } = Stor();
  const alert = useAlert();
  const { register, handleSubmit } = useForm();

  const navigate = useNavigate();
  const onSubmit = async (data) => {
    setBlockUi(true);
    axios
      .post("config/line", data)
      .then((res) => {
        setBlockUi(false);
        alert.success(res.data.message);
        navigate(nav.LINES)
      })
      .catch((err) => {
        setBlockUi(false);
        alert.error(err.response.data.message);
      });
  };
  return (
    <>

      <div className="line">
        <div className="container">
          <Container>
            <Row>
              <h2 style={{ textAlign: "center" }}>Create Line</h2>
              <Form onSubmit={handleSubmit(onSubmit)}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Row className="mt-5">
                    <Col md>
                      <Form.Label>Name </Form.Label>
                      <Form.Control
                        {...register("name", { required: true })}
                        type="text"
                        placeholder="Enter Your Name"
                      />
                    </Col>
                    <Col md>
                      <Form.Label>Code </Form.Label>
                      <Form.Control
                        {...register("code", { required: false })}
                        type="text"
                        placeholder="Enter Your Code"
                      />
                    </Col>
                    <Col md>
                      <Button
                          type="submit"
                          className="mt-3"
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
      </div>
    </>
  );
}

export default Line;
