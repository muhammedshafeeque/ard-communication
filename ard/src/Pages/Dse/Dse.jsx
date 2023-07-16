import React from "react";
import { Container } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import "./Dse.scss";
import { useNavigate } from "react-router-dom";
import { nav } from "../../Constants/routes";

function Dse() {
  const navigate = useNavigate();

  return (
    <div>
      <Container>
        <div className="col-md-12  text-right">
          <Button
            className="offset-10 mt-4 "
            onClick={(e) => {
              e.preventDefault();
              navigate(nav.CREATE_DSE);
            }}
            variant="success"
          >
            Create DSC
          </Button>

          <h2 style={{ color: "lightblue", marginTop: -45 }}>Dse List</h2>
        </div>
        <Table striped bordered hover responsive className="mt-4">
          <thead>
            <tr>
              <th>N0</th>
              <th> MOBILE NO</th>
              <th>STOCK</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>9656757977</td>
              <td>4</td>
              <td>
                <button className="greenBtn">Yes</button>
              </td>
            </tr>
            <tr>
              <td>2</td>
              <td>9744433064</td>
              <td>3</td>
              <td>
                <button className="greenBtn">Yes</button>
              </td>
            </tr>
            <tr>
              <td>3</td>
              <td>7649434064</td>
              <td>0</td>
              <td>
                <button className="redBtn">No</button>
              </td>
            </tr>
            <tr>
              <td>4</td>
              <td>6749439364</td>
              <td>0</td>
              <td>
                <button className="redBtn">No</button>
              </td>
            </tr>
          </tbody>
        </Table>
      </Container>
    </div>
  );
}

export default Dse;
