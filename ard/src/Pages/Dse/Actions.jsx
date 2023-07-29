import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "./Actions.scss";

function Actions() {
  return (
    <div className="modal-container">
      <div className="modal">
        <Form>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Mobile No</Form.Label>
            <Form.Control type="number" placeholder="Mobile No" />
            <Form.Label>Stock</Form.Label>
            <Form.Control type="number" placeholder="Stock" />
          <select name="status">
            <option value="active">Active</option>
            {/* <option value="noactive">Not Active</option> */}
          </select>
          </Form.Group>

          <Button variant="primary" type="submit" className="btn">
            Submit
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default Actions;
