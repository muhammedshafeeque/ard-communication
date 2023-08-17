import React, { useEffect, useState } from "react";
import { Button, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { nav } from "../../Constants/routes";
import axios from "../../Api/Axios";
import { useAlert } from "react-alert";
import { Stor } from "../../Context/Store";
function Shops() {
  const alert = useAlert();
  const { setBlockUi } = Stor();
  const navigate = useNavigate();
  const [shops, setShops] = useState([]);
  useEffect(() => {
    setBlockUi(true);
    axios
      .get("config/shop")
      .then(({ data }) => {
        setShops(data);
        setBlockUi(false);
      })
      .catch((err) => {
        setBlockUi(false);
        alert.error(err.response.data.message);
      });
  }, [alert, setBlockUi]);
  return (
    <div>
      <Container className="mt-5">
        <h4 className="mt-5" style={{ textAlign: "center" }}>
          Shops
        </h4>

        <div
          className="col-md-12"
          style={{ display: "flex", justifyContent: "flex-end" }}
        >
          <Button
            onClick={(e) => {
              e.preventDefault();
              navigate(nav.CREATE_SHOP);
            }}
          >
            Create Shop
          </Button>
        </div>
        <table className="table table-bordered mt-4" style={{maxWidth:'100%'}}>
          <thead>
            <tr>
              <th> Name </th>
              <th> MObile </th>
              <th> Flexi</th>
            </tr>
          </thead>
          <tbody>
            {shops.map((item) => {
              return (
                <tr key={item._id}>
                  <td>{item.name}</td>
                  <td>{item.mobile}</td>
                  <td>{item.flexiNumber}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </Container>
    </div>
  );
}

export default Shops;
