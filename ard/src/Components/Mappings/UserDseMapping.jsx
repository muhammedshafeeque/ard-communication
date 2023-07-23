import React from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import UserTypeAhead from "../UserTypeAhead/UserTypeAhead";
import { useForm } from "react-hook-form";
import DseSelect from "../DseSelect/DseSelect";
import axios from "../../Api/Axios";
import { Stor } from "../../Context/Store";
import { useAlert } from "react-alert";
import { useNavigate } from "react-router-dom";
import { nav } from "../../Constants/routes";
function UserDseMapping() {
  const { control, handleSubmit } = useForm();
  const { setBlockUi } = Stor();
  const alert = useAlert();
  const navigate = useNavigate();
  const onSubmit = (data) => {
    setBlockUi(true);
    axios
      .patch(`config/user-dse-mapping/${data.dse}`, {
        userId: data.user._id,
      })
      .then((res) => {
        alert.success(res.data);
        setBlockUi(false);
        navigate(nav.ADMIN_HOME);
      })
      .catch((err) => {
        alert.error(err.response.data.message);
        setBlockUi(false);
      });
  };
  return (
    <div>
      <h5 style={{ textAlign: "center" }}>User Mapp To Dse </h5>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Row>
          <Form.Group as={Col} md="3">
            <UserTypeAhead control={control} />
          </Form.Group>
          <Form.Group as={Col} md="3">
            <DseSelect control={control} />
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
