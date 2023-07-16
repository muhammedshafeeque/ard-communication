import React, { useEffect, useState } from "react";
import { Button, Container, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import { AiFillDelete } from "react-icons/ai";
import "./listLine.scss";
import { nav } from "../../Constants/routes";
import axios from "../../Api/Axios";
import { Stor } from "../../Context/Store";
import { useAlert } from "react-alert";

function ListLine() {
  const [result, setResult] = useState([]);
  const { setBlockUi } = Stor();
  const alert = useAlert();

  useEffect(() => {
    setBlockUi(true);
    axios
      .get("config/line")
      .then((res) => {
        setBlockUi(false);
        setResult(res.data);
      })
      .catch((err) => {
        setBlockUi(false);
        alert.error(err.message);
      });
  }, [alert,setBlockUi]);
  return (
    <div>

      <Container>
        <div className="title">
          <h1>Line Lists</h1>
          <Link to={nav.CREATE_LINE}>
            <Button className="btn-lg float-right">Create Line</Button>
          </Link>
        </div>

        <Table striped bordered hover className="mt-3">
          <thead>
            <tr>
      
              <th> Name</th>
              <th>Code</th>
              <th>Action</th>
            </tr>
          </thead>
        
          <tbody>
              {result.map((item)=>{
            return (
              <tr key={item._id}>
                <td>{item.name}</td>

                <td>{item.code}</td>

                <td style={{display:'flex'}}>
                  <p>Edit</p>
                  <AiFillDelete />
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

export default ListLine;
