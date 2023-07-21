import React from "react";
import Button from "react-bootstrap/esm/Button";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { nav } from "../../Constants/routes";
import { Col, Form, Row } from "react-bootstrap";
import axios from '../../Api/Axios'
import { useAlert } from "react-alert";
import { Stor } from "../../Context/Store";
function CreateShop() {
  const { register, handleSubmit } = useForm();
  const {setBlockUi}=Stor()
  const navigate = useNavigate();
  const alert=useAlert()
  const onSubmit = (data) => {
    setBlockUi(true)
    axios.post('config/shop',data).then((res)=>{
      setBlockUi(false)
      alert.success(res.data)
      navigate(nav.SHOPS)
    }).catch((err)=>{
      setBlockUi(false)
      alert.error(err.response.data.message);
    })
    
  };
  return (
    <div>
      <div className="container">
        <h4 style={{ textAlign: "center" }}>Create Shop</h4>
        <Form noValidate onSubmit={handleSubmit(onSubmit)}>
          <Row className="mb-3">
            <Form.Group as={Col} md="4" controlId="validationCustom01">
              <Form.Label>Name</Form.Label>
              <Form.Control
                {...register("name", { required: true })}
                type="text"
                placeholder="name"
              />
            </Form.Group>
            <Form.Group as={Col} md="4" controlId="validationCustom01">
              <Form.Label>Mobile</Form.Label>
              <Form.Control
                type="number"
                {...register("mobile", {
                  required: false,
                  minLength: 10,
                  maxLength: 10,
                })}
                placeholder="mobile"
              />
            </Form.Group>
            <Form.Group as={Col} md="4" controlId="validationCustom01">
              <Form.Label>Flexi Number</Form.Label>
              <Form.Control
                required
                type="mobile"
                {...register("flexiNumber", {
                  required: true,
                  minLength: 10,
                  maxLength: 10,
                })}
                minLength={9}
                maxLength={10}
                placeholder="Flexi Number"
              />
            </Form.Group>
            <Form.Group as={Col} md="4" controlId="validationCustom01">
              <Form.Label className="required">Contact Person</Form.Label>
              <Form.Control
                {...register("contactPerson", { required: true })}
                type="text"
                placeholder="Contact Person"
              />
            </Form.Group>
            <Form.Group as={Col} md="4" controlId="validationCustom01">
              <Form.Label className="required">OutStandigs</Form.Label>
              <Form.Control
                {...register("outStandigs", { required: true })}
                type="number"
                placeholder="OutStanding"
              />
            </Form.Group>
          </Row>
          <div className="col-md-12 submit-area" style={{}}>
            <Button
              variant="secondary"
              className="mr-3"
              onClick={(e) => {
                e.preventDefault();
                navigate(nav.SHOPS);
              }}
            >
              Cancel
            </Button>
            <Button type="submit" className="ml-3">
              {" "}
              Submit
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default CreateShop;
