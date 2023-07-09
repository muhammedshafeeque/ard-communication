import React, { useEffect, useState } from "react";
import Header from "../../Components/Header/Header";
import { Row, Table } from "react-bootstrap";
import CreateuserModal from "../../Components/CreateUserModal/CreateuserModal";
import axios from "../../Api/Axios";
function Users() {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    axios.get("/user/users").then((res) => {
      setUsers(res.data);
    });
  }, []);

  return (
    <div>
      <Header />
      <h5 style={{ textAlign: "center" }} className="mt-2">
        Users
      </h5>
      <CreateuserModal />
      <Row>
        <Table
          striped
          bordered
          hover
          style={{ marginLeft: "15px", fontSize: "10px" }}
        >
          <thead>
            <tr>
              <th>Name</th>
              <th>Status</th>
              <th>Role</th>
            </tr>
          </thead>
          <tbody>
            {users.map((item,) => {
              return (
                <tr key={item._id}>
                  <td>{item.name}</td>
                  <td>{item.status}</td>
                  <td>{item.aleas}</td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </Row>
    </div>
  );
}

export default Users;
