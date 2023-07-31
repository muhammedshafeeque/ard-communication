import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "./Actions.scss";
import axios from "../../Api/Axios";
import { nav } from "../../Constants/routes";
import { useNavigate } from "react-router-dom";
import { useAlert } from "react-alert";
import { Stor } from "../../Context/Store";

function Actions() {
  const [id, setId] = useState(0);
  const [mobile, setMobile] = useState("");
  const [stock, setStock] = useState("");
  const [status, setStatus] = useState("");
  const navigate = useNavigate();
  const { setBlockUi } = Stor();
  const alert = useAlert();
  useEffect(() => {
    setId(localStorage.getItem("_id"));
    setMobile(localStorage.getItem("mobile"));
    setStock(localStorage.getItem("stock"));
    setStatus(localStorage.getItem("status"));
  }, []);

  const handleUpdate = (e) => {
    e.preventDefault();
    axios
      .patch(`config/dse/${id}`, {
        mobile: mobile,
        stock: stock,
        status: status,
      })
      .then((res) => {
        setBlockUi(false);
        // alert.success(res.data.message);
        navigate(nav.DSE);
      })
      .catch((err) => {
        setBlockUi(false);
        // alert.error(err.response.data.message);
      });
  };

  return (
    <>
      <Form>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Mobile No</Form.Label>
          <Form.Control
            type="number"
            placeholder="Mobile No"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
          />
          <Form.Label>Stock</Form.Label>
          <Form.Control
            type="number"
            placeholder="Stock"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
          />
          <select name="status">
            <option value={status} onChange={(e) => setStatus(e.target.value)}>
              Active
            </option>
            <option value={status} onChange={(e) => setStatus(e.target.value)}>
              Not Active
            </option>
          </select>
        </Form.Group>

        <Button variant="primary" type="submit" onClick={handleUpdate}>
          Update
        </Button>
      </Form>
    </>
  );
}

export default Actions;
