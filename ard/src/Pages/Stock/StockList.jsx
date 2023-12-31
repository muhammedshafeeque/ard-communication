import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import { nav } from "../../Constants/routes";
import { Stor } from "../../Context/Store";
import { useAlert } from "react-alert";
import axios from "../../Api/Axios";

function StockList() {
  const [result, setResult] = useState([]);
  const navigate = useNavigate();
  const { setBlockUi } = Stor();
  const alert = useAlert();

  useEffect(() => {
    setBlockUi(true);
    axios
      .get("stock/get-dse-stock")
      .then((res) => {
        setBlockUi(false);
        setResult(res.data);
        console.log(res);
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
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            {result.map((item) => {
              return (
                <tr key={item._id}>
                  <td>{item.dseNumber}</td>
                  <td>{item.stockBalance}</td>
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
