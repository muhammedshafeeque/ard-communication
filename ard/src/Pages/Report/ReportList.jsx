import React, { useEffect, useState } from "react";
import { Button, Container, Form, Row, Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { nav } from "../../Constants/routes";
import { Stor } from "../../Context/Store";
import axios from "../../Api/Axios";
import { useForm } from "react-hook-form";
import { useAlert } from "react-alert";
import {BiSearch} from 'react-icons/bi'
import moment from 'moment'
function ReportList() {
  const { user } = Stor();
  const navigate = useNavigate();
  const [reports, setReports] = useState([]);
  const alert = useAlert();
  const { register, handleSubmit,getValues } = useForm();
  useEffect(() => {
     axios.get('report/report').then(({data})=>{
      setReports(data)
     })
  }, []);
  const  onSubmit=(value)=>{
    
    axios.get(`report/report?fromDate=${moment(value.fromDate).format('DD-MM-YYYY')}&toDate=${moment(value.toDate).format('DD-MM-YYYY')}`).then(({data})=>{
      setReports(data)
     }).catch((err)=>{
      alert.error(err.response.data.message)
     })
  }
  return (
    <div>
      <Container>
        <h4 className="mt-5" style={{ textAlign: "center" }}>
          Reports
        </h4>

        <div
          className="col-md-12"
          style={{ display: "flex", justifyContent: "flex-end" }}
        >
          {user &&
            (user.alias !== "admin" ? (
              <Button
                onClick={(e) => {
                  e.preventDefault();
                  navigate(nav.CREATE_REPORT);
                }}
              >
                Create Report
              </Button>
            ) : (
              ""
            ))}
        </div>
      </Container>
      <div className="col-md-12 p-2">
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Row>
            <div style={{maxWidth:'40%'}} className="col-md-3 mt-3">
              <label htmlFor="" >From </label>
              <input required {...register('fromDate')} type="date" className="form-control" />
            </div>
            <div style={{maxWidth:'40%'}} className="col-md-3 mt-3">
              <label htmlFor="">To </label>
              <input required {...register('toDate')} type="date" min={getValues('fromDate')} className="form-control" />
            </div>
            <div style={{maxWidth:'20%'}} className="col-md-3 mt-3">
              <Button className="mt-4" type="submit"><BiSearch/></Button>
            </div>
          </Row>
        </Form>
      </div>
      <Container></Container>
      <div className="col-md-12 p-2">
        <Table striped bordered hover size="sm" className="col-md-12">
          <thead>
            <tr>
              <th>Dse</th>
              <th>Date</th>
              <th>Sale</th>
            </tr>
          </thead>
          <tbody>
            {reports.map((item)=>{
              return <tr key={item._id}>
              <td>{item.dse.activeUser?.user.name}</td>
              <td>{item.date}</td>
              <td>{Math.round(((item.openingBalance-item.closingBalance)/1041)*1041)}</td>
            </tr>
            })}
            
          </tbody>
        </Table>
      </div>
    </div>
  );
}

export default ReportList;
