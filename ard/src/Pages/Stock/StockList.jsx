import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import { nav } from "../../Constants/routes";
import { Stor } from "../../Context/Store";
import { useAlert } from "react-alert";
import axios from "../../Api/Axios";
import LineDseMapping from "../../Components/Mappings/LineDseMapping";

function StockList() {
  const [result, setResult] = useState([]);
  const navigate = useNavigate();
  const { setBlockUi } = Stor();
  const alert = useAlert();

  useEffect(() => {
    setBlockUi(true);
    axios
      .get("stock/stock")
      .then((res) => {
        setBlockUi(false);
        setResult(res.data);
      })
      .catch((err) => {
        setBlockUi(false);
        alert.error(err.message);
      });
  }, [alert, setBlockUi]);
  return (
    <div>
      <Container>
        <div className="col-md-12  text-right">
          <Button
            className="offset-10 mt-4 "
            onClick={(e) => {
              e.preventDefault();
              navigate(nav.ADDSTOCK);
            }}
            variant="success"
          >
            Add Stock
          </Button>

          <h2 style={{ color: "lightblue", marginTop: -45 }}>Stock List</h2>
        </div>
        <Table striped bordered hover responsive className="mt-4">
          <thead>
            <tr>
              <th>DSE NO</th>
              <th>Amout</th>
            </tr>
          </thead>
          <tbody>
            {result.map((item) => {
              return (
                <tr key={item._id}>
                  <td>{item.amount}</td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </Container>
    </div>
  );
}

export default StockList;
