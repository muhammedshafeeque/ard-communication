import React from "react";
import { Button, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { nav } from "../../Constants/routes";

function ReportList() {
  const navigate = useNavigate();
  return (
    <div>
      <Container >
        <h4 className="mt-5" style={{ textAlign: "center" }}>
          Reports
        </h4>

        <div
          className="col-md-12"
          style={{ display: "flex", justifyContent: "flex-end" }}
        >
          <Button
            onClick={(e) => {
              e.preventDefault();
              navigate(nav.CREATE_REPORT);
            }}
          >
            Create Report
          </Button>
        </div>
      </Container>
    </div>
  );
}

export default ReportList;
