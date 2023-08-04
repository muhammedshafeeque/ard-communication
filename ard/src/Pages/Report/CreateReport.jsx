import React, { useEffect, useState } from "react";
import { Button, Container, Form, Row } from "react-bootstrap";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import axios from "../../Api/Axios";
import { Stor } from "../../Context/Store";
import { useAlert } from "react-alert";
import ShopTypeAhead from "../../Components/ShopsTypeAhhead/ShopTypeAhead";

function CreateReport() {
  const { handleSubmit, control, setValue, register, getValues } = useForm();
  const { setBlockUi } = Stor();
  const [baseData, setBaseData] = useState(null);
  const alert = useAlert();
  const {
    fields: outstandingFields,
    append: outstandingAppend,
    remove: outstandingRemove,
  } = useFieldArray({
    control,
    name: "outstandings",
  });

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
         alert.error(err.response.data.message);
      });
  }

  useEffect(() => {
    getBaseData();
  }, [control]); // Added 'control' to the dependency array

  const calculator = () => {
    let data = getValues();
    console.log(data)
    if (data.opening && data.closing) {
      // Fixed the condition
      let cash=0
      let sale = Math.round(
        ((Number(data.opening) - Number(data.closing)) / 1041) * 1000
      );
      cash=sale
      if(data.outstandings.length){
        data.outstandings.forEach((out)=>{
          cash=cash-out.amount
        })
      }
      if(data.cashonBank!==""){
        cash=cash-Number(data.cashonBank)
      }

      setValue("sale", sale);
      setValue("cash",cash)
    }
  };

  return (
    <div>
      <Container>
        <h6 style={{ textAlign: "center" }}>Create Report</h6>
        {baseData && (
          <div className="mt-5">
            <h6>Name: {baseData.name}</h6>
            <h6>Dse Number: {baseData.dseNumber}</h6>
          </div>
        )}
        <Form className="" onSubmit={handleSubmit(submitForm)}>
          <Row>
            <Form.Group className="col-md-4 mt-4">
              <Form.Label>Opening Balance</Form.Label>
              <Form.Control
                {...register("opening")}
                disabled={true}
                type="number"
              />
            </Form.Group>
            <Form.Group className="col-md-4 mt-4">
              <Form.Label>Closing Balance</Form.Label>
              <Form.Control
                {...register("closing")}
                onBlur={calculator}
                type="number"
              />
            </Form.Group>
            <Form.Group className="col-md-4 mt-4">
              <Form.Label>Sale</Form.Label>
              <Form.Control
                {...register("sale")}
                disabled={true}
                type="number"
              />
            </Form.Group>
          </Row>
          <h6 className="mt-4">Outstandings</h6>
          {outstandingFields.map((item, index) => (
            <Row className="col-md-12" key={index}>
              <Form.Group className="mt-4 col-md-4" style={{ maxWidth: "40%" }} >
              <Form.Label>Shop</Form.Label>
                <Controller
                  name={`outstandings[${index}].shop`}
                  control={control}
                  render={({ field }) => (
                    <ShopTypeAhead
                      control={control} // Pass 'control' prop to child component
                      name={`outstandings[${index}].shop`}
                    />
                  )}
                />
              </Form.Group>

              <Form.Group className="col-md-4 mt-4" style={{ maxWidth: "30%" }}>
                <Form.Label>Amount</Form.Label>
                <Form.Control
                  {...control.register(`outstandings[${index}].amount`)}
                  type="number"
                  onBlur={calculator}
                />
              </Form.Group>
              <Form.Group className="mt-5 pt-2 mb-3" style={{ maxWidth: "30%" }}>
              <Button variant="danger" onClick={() => outstandingRemove(index)}>Remove</Button>
              </Form.Group>
              
            </Row>
          ))}
          <div className="submit-area">
            <Button
              onClick={(e) => {
                e.preventDefault();
                outstandingAppend({ shop: {}, amount: 0 });
              }}
            >
              Add to Outstandings
            </Button>
          </div>
          <Row>
          <Form.Group className="col-md-4 mt-4">
              <Form.Label>Cash On Bank</Form.Label>
              <Form.Control
                {...register("cashonBank")}
                onBlur={calculator}
                type="number"
              />
            </Form.Group>
          <Form.Group className="col-md-4 mt-4">
              <Form.Label>Liquid Cash</Form.Label>
              <Form.Control
                {...register("cash")}
                disabled={true}
                type="number"
              />
            </Form.Group>
          </Row>
          <Button type="submit">Submit</Button>
        </Form>
      </Container>
    </div>
  );
}

export default CreateReport;
