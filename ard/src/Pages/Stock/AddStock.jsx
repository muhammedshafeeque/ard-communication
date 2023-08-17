import React from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { BiLogInCircle } from "react-icons/bi";
import { nav } from "../../Constants/routes";
import { useAlert } from "react-alert";
import { Stor } from "../../Context/Store";
import { useNavigate } from "react-router-dom";
import axios from "../../Api/Axios";
import DseSelect from "../../Components/DseSelect/DseSelect";
function AddStock() {
  const { setBlockUi } = Stor();
  const alert = useAlert();
  const { register, handleSubmit,control } = useForm();
  const navigate = useNavigate();
  const onSubmit = async (data) => {
    
    setBlockUi(true);
    axios
      .post("stock/stock", {dseId:data.dse,amount:data.amount})
      .then((res) => {
        setBlockUi(false);
        alert.success(res.data);
        navigate(nav.STOCK);
      })
      .catch((err) => {
        setBlockUi(false);
        alert.error(err.response.data.message);
      });
  };
  return (
    <div>
      <h2 className="mt-4 " style={{ textAlign: "center" }}>
        Add Stock
      </h2>
      <Container>
        <Row>
          <Form className="mb-3" onSubmit={handleSubmit(onSubmit)}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Row className="mt-5">
                <Col sm="8">
                  <DseSelect control={control}/>
                </Col>
                <Col sm="8">
                  <Form.Label>Amount </Form.Label>
                  <Form.Control
                    {...register("amount", { required: true })}
                    type="number"
                    placeholder="Amount"
                  />
                </Col>
                <Col sm="8" className="mt-3">
         
                  <div className="submit-area">
                  <Button
                    className="mr-2"
                    variant="secondary"
                    style={{ width: "20%" }}
                    onClick={(e) => {
                      e.preventDefault();
                      navigate(nav.STOCK);
                    }}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" style={{ width: "30%" }}>
                    Submit
                  </Button>
                  </div>
            
                </Col>
              </Row>
            </Form.Group>
          </Form>
        </Row>
      </Container>
    </div>
  );
}

export default AddStock;
