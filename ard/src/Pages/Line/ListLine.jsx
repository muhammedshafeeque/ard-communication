import React from "react";
import { Button, Container, Table } from "react-bootstrap";
import Header from "../../Components/Header/Header";
import { Link } from "react-router-dom";
import {AiFillDelete} from "react-icons/ai"
import "./listLine.scss";
import {nav} from '../../Constants/routes'
function ListLine() {
  return (
    <div>
      <Header />
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
              <th>No</th>
              <th> Name</th>
              <th>Code</th>
              <th>Update</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>Shafeeque</td>

              <td>sh</td>
              <td>Edit</td>
              <td>
                <AiFillDelete />
              </td>
            </tr>
            <tr>
              <td>2</td>
              <td>Anwar</td>
              <td>sn</td>
              <td>Edit</td>
              <td>
                <AiFillDelete />
              </td>
            </tr>
            <tr>
              <td>3</td>
              <td>shafi</td>
              <td>gd</td>
              <td>Edit</td>
              <td>
                <AiFillDelete />
              </td>
            </tr>
          </tbody>
        </Table>
      </Container>
    </div>
  );
}

export default ListLine;
