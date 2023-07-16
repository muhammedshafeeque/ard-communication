import React from "react";
import Header from "../../Components/Header/Header";
import { Container } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import { PiTreeEvergreenFill } from "react-icons/pi";
import { PiTreeEvergreenLight } from "react-icons/pi";
import Button from "react-bootstrap/Button";
import { useState } from "react";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import ToggleButton from "react-bootstrap/ToggleButton";
import "./Dse.scss";

function Dse() {
  const [radioValue, setRadioValue] = useState("1");

  const radios = [
    { name: "Not Active", value: "1" },
    { name: "Active", value: "2" },
  ];
  return (
    <div>
      <Header />
      <Container>
         <div className="col-md-12 bg-light text-right">

        <Button  href="/createDsc" className="offset-10 mt-3 " variant="success">
          Create DSC
        </Button>
         </div>

        <h2 style={{ color: "lightblue", marginTop: 6 }}>Dse List</h2>
        <Table striped bordered hover responsive className="mt-4">
          <thead>
            <tr>
              <th>N0</th>
              <th> MOBILE NO</th>
              <th>STOCK</th>
              <th>
                <ButtonGroup>
                  {radios.map((radio, idx) => (
                    <ToggleButton
                      key={idx}
                      id={`radio-${idx}`}
                      type="radio"
                      variant={idx % 2 ? "outline-success" : "outline-danger"}
                      name="radio"
                      value={radio.value}
                      checked={radioValue === radio.value}
                      onChange={(e) => setRadioValue(e.currentTarget.value)}
                    >
                      {radio.name}
                    </ToggleButton>
                  ))}
                </ButtonGroup>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>9656757977</td>
              <td>4</td>
              <td>
                <PiTreeEvergreenFill />
              </td>
            </tr>
            <tr>
              <td>2</td>
              <td>9744433064</td>
              <td>3</td>
              <td>
                <PiTreeEvergreenFill />
              </td>
            </tr>
            <tr>
              <td>3</td>
              <td>7649434064</td>
              <td>0</td>
              <td>
                <PiTreeEvergreenLight />
              </td>
            </tr>
            <tr>
              <td>4</td>
              <td>6749439364</td>
              <td>0</td>
              <td>
                <PiTreeEvergreenLight />
              </td>
            </tr>
          </tbody>
        </Table>
      </Container>
    </div>
  );
}

export default Dse;
