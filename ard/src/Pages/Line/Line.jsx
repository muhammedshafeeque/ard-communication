import React from "react";
import { Form, Col } from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import { BiLogInCircle } from "react-icons/bi";
import "./line.scss";

function Line() {
 
  return (
    <>

      <div className="line">
        <div className="container">
          <Container>
            <Row>
              <h2 >Create Line</h2>
              <Form>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Row className="mt-5">
                    <Col md>
                      <Form.Label>Name </Form.Label>
                      <Form.Control type="text" placeholder="Enter Your Name" />
                    </Col>
                    <Col md>
                      <Form.Label>Code </Form.Label>
                      <Form.Control type="text" placeholder="Enter Your Code" />
                    </Col>
                    <Col md>
                      <Button>
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
