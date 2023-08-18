import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import axios from "../../Api/Axios";
import { Stor } from "../../Context/Store";
import { useAlert } from "react-alert";

function ResetPassword() {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const { setBlockUi } = Stor();
  const alert = useAlert();

  const handleSubmit = (e) => {
    e.preventDefault();
    setBlockUi(true);
    axios
      .post("user/reset-password", { oldPassword, newPassword })
      .then(({ data }) => {
        setBlockUi(false);
        alert.success(data);
        window.location.reload()
      })
      .catch((err) => {
        setBlockUi(false);
        alert.error(err.response.data.message);
      });
  };
  const handleOldPasswordChange = (e) => {
    setOldPassword(e.target.value);
  };
  const handleNewPasswordChange = (e) => {
    setNewPassword(e.target.value);
  };
  return (
    <div className="container">
      <h4 className="mt-4" style={{ textAlign: "center" }}>
        Reset Password
      </h4>

      <Form onSubmit={handleSubmit} className="mt-3">
        <div className="col-md-12">
          <div className="row">
            <Form.Group className="mb-3 col-md-4" controlId="formBasicPassword">
              <Form.Label>Old Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Old Password"
                value={oldPassword}
                onChange={handleOldPasswordChange}
              />
            </Form.Group>
            <Form.Group className="mb-3 col-md-4" controlId="formBasicPassword">
              <Form.Label>New Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="New Password"
                value={newPassword}
                onChange={handleNewPasswordChange}
              />
            </Form.Group>
            <div className="submit-area col-md-4 mt-4">
              <Button
                variant="primary"
                style={{ maxHeight: "2.5rem" }}
                type="submit"
              >
                Change Password
              </Button>
            </div>
          </div>
        </div>
      </Form>
    </div>
  );
}

export default ResetPassword;
