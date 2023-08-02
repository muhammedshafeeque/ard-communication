import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";

import { useNavigate } from "react-router-dom";
import { nav } from "../../Constants/routes";



function ResetPassword() {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Old Password:", oldPassword);
    console.log("New Password:", newPassword);
    navigate(nav.HOME)
    setOldPassword("");
    setNewPassword("");
  };
  const handleOldPasswordChange = (e) => {
    setOldPassword(e.target.value);
  };
   const handleNewPasswordChange = (e) => {
     setNewPassword(e.target.value);
   };
  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Old Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Old Password"
            value={oldPassword}
            onChange={handleOldPasswordChange}
          />
        </Form.Group>

        <Form.Group className="mb-3 " controlId="formBasicPassword">
          <Form.Label>New Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="New Password"
            value={newPassword}
            onChange={handleNewPasswordChange}
          />
        </Form.Group>

        <Button variant="primary" type="submit"
        >
          Change Password
        </Button>
      </Form>
    </div>
  );
}

export default ResetPassword;

