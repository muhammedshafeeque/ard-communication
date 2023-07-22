import React from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import UserTypeAhead from "../UserTypeAhead/UserTypeAhead";
import { useForm } from "react-hook-form";

function UserDseMapping() {
  const { register, control, handleSubmit } = useForm();
  const onSubmit = (data) => {
    console.log(data);
  };
  return (
    <div>
      <h5 style={{ textAlign: "center" }}>User Mapp To Dse </h5>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Row>
          <Form.Group as={Col} md="3">
            <UserTypeAhead control={control} />
          </Form.Group>
          <div className="col-md-3 mt-4 submit-area ">
            <Button className="btn-sm" type="submit">
              Mapp
            </Button>
          </div>
        </Row>
      </Form>
    </div>
  );
}

export default UserDseMapping;
