import React, { useEffect } from "react";
import { Container } from "react-bootstrap";
import "./login.scss";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import axios from "../../Api/Axios";
import { useForm } from "react-hook-form";
import { getToken, setToken } from "../../Common/auth";
import { useAlert } from "react-alert";
import { useNavigate } from "react-router-dom";
import { nav } from "../../Constants/routes";
import { Stor } from "../../Context/Store";

function Login() {
  const alert = useAlert();
  const { setBlockUi, setUser } = Stor();
  const navigate = useNavigate("");
  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => {
    setBlockUi(true);
    axios
      .post("auth/login", data)
      .then((res) => {
        setBlockUi(false);
        setToken(res.data.token);
        setUser(res.data.userData);
        alert.success("Login Success");
        if (res.data && res.data.userData.aleas === "admin") {
          navigate(nav.ADMIN_HOME);
        } else {
          navigate(nav.HOME);
        }
      })
      .catch((err) => {
        setBlockUi(false);
        localStorage.clear()
        alert.error(err.response.data.message);
      });
  };
  useEffect(() => {
    let token = getToken();
    if (token) {
      axios
        .get("auth/get-req-user")
        .then((res) => {
          if (res.data) {
            if (res.data.aleas && res.data.aleas === "admin") {
              navigate(nav.ADMIN_HOME);
            } else {
              navigate(nav.HOME);
            }
          }
        })
        .catch(() => {
          localStorage.clear();
        });
    }
  }, [navigate]);
  return (
    <div>
      <Container className="login_body mt-5">
        <div className="input_area mt-5">
          <h2 className="mt-5" style={{ textAlign: "center" }}>
            Login To ARD
          </h2>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>User Name</Form.Label>
              <Form.Control
                {...register("mobile", { required: true })}
                type="number"
                placeholder="Enter Mobile"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                {...register("password", { required: true })}
                type="password"
                placeholder="Password"
              />
            </Form.Group>
            <Button variant="primary" style={{ width: "100%" }} type="submit">
              Submit
            </Button>
          </Form>
        </div>
      </Container>
    </div>
  );
}

export default Login;
