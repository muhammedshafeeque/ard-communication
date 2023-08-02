import React, { useEffect, useState } from "react";
import { Button, Container, Form, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import axios from "../../Api/Axios";
import { Stor } from "../../Context/Store";
import { useAlert } from "react-alert";
function CreateReport() {
  const { register, handleSubmit, setValue, getValues } = useForm();
  const { setBlockUi } = Stor();
  const [baseData, setBaseData] = useState(null);
  const alert = useAlert();
  const submitForm = (data) => {
    console.log(data);
  };

  function getBaseData() {
    setBlockUi(true);
    axios
      .get("stock/get-dse-stock")
      .then((res) => {
        setBlockUi(false);
        setBaseData(res.data);
        setValue("opening", res.data.stockBalance);
      })
      .catch((err) => {
        setBlockUi(false);

        alert.error(err.respones.data.message);
      });
  }
  useEffect(() => {
    getBaseData();
  }, []);

  const calculator = () => {
    let data=getValues()
    if(data.opening){
      if(data.opening!=='',data.clossing!==''){
        let sale=Math.round(((Number(data.opening)-Number(data.clossing))/1041)*1000)
        setValue('sale',sale)
      }
    }
    
    
  };
  return (
    <div>
      <Container>
        <h6 style={{ textAlign: "center" }}>Create Report</h6>
        {baseData && (
          <div className="mt-5">
            <h6>Name:{baseData.name}</h6>
            <h6>Dse Number:{baseData.dseNumber}</h6>
          </div>
        )}
        <Form className="" onSubmit={handleSubmit(submitForm)}>
          <Row>
            <Form.Group className="col-md-4 mt-4">
              <Form.Label>Opnening Balance</Form.Label>
              <Form.Control
                {...register("opening")}
                disabled={true}
                type="number"
              />
            </Form.Group>
            <Form.Group className="col-md-4 mt-4">
              <Form.Label>Clossing Balance</Form.Label>
              <Form.Control
                {...register("clossing")}
                onBlur={calculator}
                type="number"
              />
            </Form.Group>
            <Form.Group className="col-md-4 mt-4">
              <Form.Label>Clossing Balance</Form.Label>
              <Form.Control
                {...register("sale")}
                disabled={true}
                type="number"
              />
            </Form.Group>
          </Row>
          
          <Button type="sybmit">Submit</Button>
        </Form>
      </Container>
    </div>
  );
}

export default CreateReport;
