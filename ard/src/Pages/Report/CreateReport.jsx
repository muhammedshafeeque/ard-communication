import React, { useEffect, useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import axios from "../../Api/Axios";
import { Stor } from "../../Context/Store";
import { useAlert } from "react-alert";

function CreateReport() {
  const { register, handleSubmit, setValue } = useForm();
  const [base, setBase] = useState(null);
  const { setBlockUi } = Stor();
  const alert = useAlert();

  const onSubmit = (data) => {
    // Handle form submission here, e.g., make an API call with the form data
    console.log(data);
  };

  useEffect(() => {
    axios
      .get("stock/get-dse-stock")
      .then((res) => {
        setBase(res.data);
        setValue("opening", res.data.stockBalance);
      })
      .catch((error) => {
        // Handle API request error
        console.error("Error fetching data:", error);
        // Optionally, set an error state to display an error message to the user
      });
  }, []);

  return (
    <div>
      <div className="container mt-5">
        <h4 style={{ textAlign: "center" }}>Create Report</h4>

        {base && (
          <div
            className="mt-5"
            style={{
              display: "flex",
              justifyContent: "space-between",
              flexWrap: "wrap",
            }}
          >
            <h6>Name: {base.name}</h6>
            <h6>DSE: {base.dseNumber}</h6>
          </div>
        )}

        <Form className="mt-4" onSubmit={handleSubmit(onSubmit)}>
          <Row>
            <Form.Group as={Col} md="4" controlId="validationCustom01">
              <Form.Label>Opening Balance</Form.Label>
              <Form.Control
                name="opening"
                type="number"
                {...register("opening", {
                  required: false,
                  disabled: true,
                })}
                placeholder="mobile"
              />
            </Form.Group>
            <Form.Group className="mt-3" as={Col} md="4" controlId="validationCustom01">
              <Form.Label>Clossig Balance</Form.Label>
              <Form.Control
                type="number"
                {...register("clossingBalance", {
                  required: true,
                })}
                placeholder="Clossing Balance"
              />
            </Form.Group>
          </Row>
        </Form>
      </div>
    </div>
  );
}

export default CreateReport;
