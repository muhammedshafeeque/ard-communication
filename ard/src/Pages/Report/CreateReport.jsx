import React, { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useFieldArray, useForm } from "react-hook-form";
import axios from "../../Api/Axios";
import { Stor } from "../../Context/Store";
import { useAlert } from "react-alert";
import ShopTypeAhead from "../../Components/ShopsTypeAhhead/ShopTypeAhead";
import { useNavigate } from "react-router-dom";
import { nav } from "../../Constants/routes";

function CreateReport() {
  const { control, register, handleSubmit, setValue, getValues, watch } =
    useForm();
    const navigate =useNavigate()
  const [base, setBase] = useState(null);
  const { setBlockUi } = Stor();
  const alert = useAlert();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "outStandings",
  });
  
  const [sale,setSale]=useState(0)
  const [cash,setCash]=useState()
  const openingBalance = watch("opening", base ? base.stockBalance : "");
 
  // Function to fetch data and set initial values
  useEffect(() => {
    axios
      .get("stock/get-dse-stock")
      .then((res) => {
        setBase(res.data);
        setValue("opening", res.data.stockBalance);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  // Function to handle amount change in the outStandings field
  const handleAmountChange = (index, value) => {
    setValue(`outStandings.${index}.amount`, value);
    calculateOutstandings();
  };

  // Function to calculate the total of outStandings
  const calculateOutstandings = () => {
    let data = getValues();
    let total = 0;
    data.outStandings.forEach((out) => {
      if (out.amount !== "") {
        total = total + parseInt(out.amount);
      }
    });
    let Cash=sale-total
    setValue("cash", Cash);
    setCash(Cash)
   
  };

  // Function to calculate cash and update cashToB field
  const calculateCash = () => {
    console.log(getValues("sale"))
    let cash = getValues("sale") - cash
    

  };

  // Function to handle form submission
  const onSubmit = (data) => {
    console.log(data);
    // Add your API call or further processing logic here
  };

  // Disable the submit button until the base data is available
  const isSubmitDisabled = base === null;

  return (
    <div>
      <div className="container mt-5">
        <h4 style={{ textAlign: "center" }}>Create Report</h4>

        {base && (
          <div
            className="mt-5"
            style={{
              display: "flex",
              justifyContent: "space-between",
              flexWrap: "wrap",
            }}
          >
            <h6>Name: {base.name}</h6>
            <h6>DSE: {base.dseNumber}</h6>
          </div>
        )}

        <Form className="mt-4" onSubmit={handleSubmit(onSubmit)}>
          <Row>
            <Form.Group as={Col} md="4" controlId="validationCustom01">
              <Form.Label>Opening Balance</Form.Label>
              <Form.Control
                name="opening"
                type="number"
                {...register("opening", {
                  required: false,
                  disabled: true,
                })}
                placeholder="Opening Balance"
              />
            </Form.Group>
            <Form.Group className="mt-3" as={Col} md="4" controlId="validationCustom01">
              <Form.Label>Closing Balance</Form.Label>
              <Form.Control
                type="number"
                {...register("closingBalance", {
                  required: true,
                  value: 0,
                })}
                onChange={(e) => {
                  if (e.target.value > 0) {
                    setValue(
                      "sale",
                      Math.round(((openingBalance - parseInt(e.target.value)) / 1041) * 1000)
                    );
                    setSale(Math.round(((openingBalance - parseInt(e.target.value)) / 1041) * 1000))
                  } else {
                    setValue("sale", 0);
                    setSale(0)
                  }
                  calculateCash();
                }}
                placeholder="Closing Balance"
              />
            </Form.Group>
            <Form.Group className="mt-3" as={Col} md="4" controlId="validationCustom01">
              <Form.Label>Sale</Form.Label>
              <Form.Control
                type="number"
                {...register("sale", {
                  required: true,
                  disabled: true,
                })}
                placeholder="Sale"
              />
            </Form.Group>
            <h6 className="mt-5">Outstandings</h6>
            <Container className="submit-area">
              {fields.length ? (
                <Button
                  className="mb-2 mt-2 float-right"
                  onClick={(e) => {
                    e.preventDefault();
                    navigate(nav.CREATE_SHOP);
                  }}
                >
                  Create New Shop
                </Button>
              ) : (
                ""
              )}
            </Container>
            {fields.map((item, index) => (
              <div key={item.id}>
                <Row className="mb-2">
                  <Form.Group as={Col} md="2" style={{ maxWidth: "60%" }}>
                    <Form.Label>Shop</Form.Label>
                    <ShopTypeAhead
                      control={control}
                      config={{ array: true, formName: "outStandings", index }}
                    />
                  </Form.Group>
                  <Form.Group as={Col} md="2" style={{ maxWidth: "40%" }}>
                    <Form.Label>Amount</Form.Label>
                    <Form.Control
                      name={`outStandings.${index}.amount`}
                      type="amount"
                      {...register(`outStandings.${index}.amount`)}
                      placeholder="Amount"
                      onChange={(e) => { e.preventDefault()
                        handleAmountChange(index, e.target.value)}}
                    />
                  </Form.Group>
                  <div className="submit-area">
                    <Button variant="danger" className="mt-2" onClick={() => remove(index)}>
                      Remove
                    </Button>
                  </div>
                </Row>
              </div>
            ))}
            <Container>
              <Button style={{ width: "100%" }} onClick={() => append({})}>
                Add New Outstandings
              </Button>
            </Container>
          </Row>
          <Row>
            <Form.Group className="mt-5" as={Col} md="4" controlId="validationCustom01">
              <Form.Label>Cash on Bank</Form.Label>
              <Form.Control
                type="cashOnBank"
                {...register("cashOnBank", {
                  required: true,
                  value: 0,
                })}
                placeholder="Cash on Bank"
              />
            </Form.Group>
            <Form.Group className="mt-4" as={Col} md="4" controlId="validationCustom01">
              <Form.Label>Cash</Form.Label>
              <Form.Control
                disabled={true}
                {...register('cash')}
              />
            </Form.Group>
          </Row>
          <Row>
            <Container className="mt-3 mb-4">
            <Button type="submit" style={{width:'100%'}} disabled={isSubmitDisabled}>
              Submit
            </Button>
            </Container>
            
          </Row>
        </Form>
      </div>
    </div>
  );
}

export default CreateReport;
