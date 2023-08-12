import React, { useEffect, useState } from "react";

import { Button, Row, Table } from "react-bootstrap";
import axios from "../../Api/Axios";
import { useNavigate } from "react-router-dom";
import { nav } from "../../Constants/routes";
import { Stor } from "../../Context/Store";
import { useAlert } from "react-alert";

function Users() {
  const [users, setUsers] = useState([]);
  const {setBlockUi}=Stor()
  const navigate = useNavigate();
  const alert=useAlert()
  useEffect(() => {
    setBlockUi(true)
    axios.get("/user/users").then((res) => {
      setUsers(res.data);
      setBlockUi(false)
    }).catch((err)=>{
      setBlockUi(false)
      alert.error(err.message)
    })
  }, [setBlockUi,alert]);

  return (
    <div>
      <div className="container">
        <h5 style={{ textAlign: "center" }} className="mt-2">
          Users
        </h5>
        <Row className="col-md-12 mt-5" >
          <div  className=" col-md-12" style={{display:"flex",justifyContent:'flex-end'}}>
            <Button onClick={(e)=>{
              e.preventDefault()
              navigate(nav.CREATE_USER)
            }} >Create User</Button>
          </div>
        </Row>

        <Table >
          <thead>
            <tr>
              <th>Name</th>
              <th>Status</th>
              <th>Role</th>
            </tr>
          </thead>
          <tbody>
            {users.map((item) => {
              return (
                <tr key={item._id}>
                  <td>{item.name}</td>
                  <td>{item.status}</td>
                  <td>{item.alias}</td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
    </div>
  );
}

export default Users;
