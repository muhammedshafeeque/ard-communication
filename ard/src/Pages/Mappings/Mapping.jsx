import React, { useState } from "react";
import { Col, Container, Form } from "react-bootstrap";
import { mappingTypes } from "../../Constants/constant";
import UserDseMapping from "../../Components/Mappings/UserDseMapping";
import LineDseMapping from "../../Components/Mappings/LineDseMapping";
import ShopLineMapping from "../../Components/Mappings/ShopLineMapping";

function Mapping() {
  const [mapping, setMapping] = useState(null);
  return (
    <div>
      <Container>
        <h4 style={{ textAlign: "center" }}>Mappings</h4>
        <Form className="mt-5">
          <Form.Group as={Col} md="4" controlId="validationCustom01">
            <Form.Label>Select Mapping</Form.Label>
            <Form.Select
              type="text"
              placeholder="name"
              onChange={(e) => {
                e.preventDefault();
                setMapping(e.target.value);
              }}
            >
              <option value={null}>Select</option>
              {mappingTypes.map((op) => {
                return (
                  <option key={op.code} value={op.code}>
                    {op.name}
                  </option>
                );
              })}
            </Form.Select>
          </Form.Group>
        </Form>
      </Container>
      {mapping !== null && (
        <Container className="mt-5">
          {mapping === "UDM" ? (
            <UserDseMapping />
          ) : mapping === "LDM" ? (
            <LineDseMapping />
          ) : mapping === "SLM" ? (
            <ShopLineMapping />
          ) : (
            ""
          )}
        </Container>
      )}
    </div>
  );
}

export default Mapping;
