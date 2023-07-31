import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import "./Dse.scss";
import { Link, useNavigate } from "react-router-dom";
import { nav } from "../../Constants/routes";
import { Stor } from "../../Context/Store";
import { useAlert } from "react-alert";
import axios from "../../Api/Axios";
import { BsFillTrashFill, BsFillPencilFill } from "react-icons/bs";

function Dse() {
  const [result, setResult] = useState([]);
  const navigate = useNavigate();
  const { setBlockUi } = Stor();
  const alert = useAlert();

  const setToLocalStorage = (_id, mobile, stock, status) => {
    localStorage.setItem("_id", _id);
    localStorage.setItem("mobile", mobile);
    localStorage.setItem("stock", stock);
    localStorage.setItem("status", status);
  };

  useEffect(() => {
    setBlockUi(true);
    axios
      .get("config/dse")
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
              navigate(nav.CREATE_DSE);
            }}
            variant="success"
          >
            Create DSC
          </Button>

          <h2 style={{ color: "lightblue", marginTop: -45 }}>Dse List</h2>
        </div>
        <Table striped bordered hover responsive className="mt-4 table">
          <thead>
            <tr>
              <th> MOBILE NO</th>
              <th>STOCK</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {result.map((item) => {
              return (
                <tr key={item._id}>
                  <td>{item.mobile}</td>
                  <td>{item.stock}</td>
                  <td
                    style={{
                      color: item.status === "active" ? "green" : "black",
                    }}
                  >
                    {item.status}
                  </td>
                  <td>
                    <span className="actions">
                      <Link to={nav.EDITDSE}>
                        <BsFillPencilFill
                          onClick={() =>
                            setToLocalStorage(
                              item._id,
                              item.mobile,
                              item.stock,
                              item.status
                            )
                          }
                        />
                      </Link>

                      <BsFillTrashFill className="delete-btn" />
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </Container>
    </div>
  );
}

export default Dse;
