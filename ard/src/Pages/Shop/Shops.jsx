import React from "react";
import { Button, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { nav } from "../../Constants/routes";
function Shops() {
  const navigate = useNavigate();
  return (
    <div>
      <Container className="mt-5">
        <h4
          className="mt-5"
          style={{ textAlign: "center" }}
         
        >
          Shops
        </h4>
        <div
          className="col-md-12"
          style={{ display: "flex", justifyContent: "flex-end" }}
        >
          <Button  onClick={(e) => {
            e.preventDefault();
            navigate(nav.CREATE_SHOP);
          }}>Create Shop</Button>
        </div>
      </Container>
    </div>
  );
}

export default Shops;
