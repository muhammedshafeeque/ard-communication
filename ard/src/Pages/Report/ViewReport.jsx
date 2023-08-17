import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../../Api/Axios";
import { useAlert } from "react-alert";
import { Container, Table } from "react-bootstrap";
function ViewReport() {
  const [report, setReport] = useState();
  const params = useParams();
  const alert = useAlert();
  useEffect(() => {
    axios
      .get("report/report/" + params.id)
      .then(({ data }) => {
        setReport(data);
      })
      .catch((error) => {
        alert.error(error.response.data.message);
      });
  }, [params.id]);
  return (
    <div>
      {report && (
        <Container className="mt-5">
          <h4 style={{ textAlign: "center" }}>Report</h4>

          <Table bordered className="mt-5">
            <thead>
              <tr>
                <th>Employee</th>
                <td colSpan={3}>{report.dse.activeUser.user.name}</td>
              </tr>
              <tr>
                <th>Dse</th>
                <td colSpan={3}>{report.dse.mobile}</td>
              </tr>
              <tr>
                <th>Date</th>
                <td colSpan={3}>{report.date}</td>
              </tr>
              <tr>
                <th>Opening</th>
                <td>{report.openingBalance}</td>
                <th>Closing Balance</th>
                <td>{report.closingBalance}</td>
              </tr>
              <tr>
                <th>Cash</th>
                <td>{report.liquidCash}</td>
                <th>Bank</th>
                <td>{report.CashOnBank}</td>
              </tr>
              <tr>
                <th>Sale</th>
                <th colSpan={3}>
                  {" "}
                  <span
                    style={{
                      display: "flex",
                      justifyContent: "flex-end",
                      width: "100%",
                    }}
                  >
                    {" "}
                    {Math.round(
                      ((report.openingBalance - report.closingBalance) / 1041) *
                        1000
                    )}{" "}
                    <span>&#8377;</span>
                  </span>
                </th>
              </tr>
            </thead>
          </Table>
        <div>
        <h5 className="mt-4"> Outstanding</h5>
          <Table bordered className="mt-2">
            <thead>
              <tr>
                <th>Shop</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
                {report.outstandings.map((out)=>{
                    return <tr key={out._id}>
                    <td>{out.shop.name}</td>
                    <td>{out.amount} <span>&#8377;</span></td>
                </tr>
                })}
                
            </tbody>
          </Table>
        </div>
        <div>
        <h5 className="mt-4">Outstanding Collections</h5>
          <Table bordered className="mt-2">
            <thead>
              <tr>
                <th>Shop</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
                {report.payments.map((pay)=>{
                    return <tr key={pay._id}>
                    <td>{pay.shop.name}</td>
                    <td>{pay.amount}</td>
                </tr>
                })}
                
            </tbody>
          </Table>
        </div>
          
        </Container>
      )}
    </div>
  );
}

export default ViewReport;
