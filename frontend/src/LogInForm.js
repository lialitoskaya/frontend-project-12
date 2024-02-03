import { Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { useFormik } from "formik";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

import { AuthContext } from "./App";

const LogInForm = () => {
  const [error, setError] = useState('');

  const { setContext } = useContext(AuthContext);
  
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    onSubmit: (values) => {
      axios
        .post("/api/v1/login", {
          username: values.username,
          password: values.password,
        })
        .then((res) => {
          const { token } = res.data;
          if(token.length > 0){
            localStorage.setItem("token", token);
            localStorage.setItem("username", values.username);
            localStorage.setItem("password", values.password);
            setContext(localStorage);
            navigate('/', {replace:false})
          };
        })
        .catch(() => {
          setError("unautorized");
        });
    },
  });

  return (
    <>
    <form
      className="col-12 col-md-6 mt-3 px-4 mt-mb-0"
      onSubmit={formik.handleSubmit}
    >
      <div className="form-floating mb-3">
        <h3>Username</h3>
        <input
          value={formik.values.username}
          onChange={formik.handleChange}
          type="username"
          name="username"
          className="form-control"
        />
      </div>
      <div name="username" />
      <div className="form-floating mb-4">
        <h3>Password</h3>
        <input
          onChange={formik.handleChange}
          type="password"
          name="password"
          className="form-control"
        />
      </div>
      <div name="password" />
      <Button type="submit" className="w-100 mb-3">
        Submit
      </Button>
      {error.length > 0 && (
        <div>
          <p className="text-danger">Проверьте правильность логина и пароля</p>
        </div>
      )}
    </form>
    <div className="my-3 text-center"><span>Нет аккаунта? </span><a href='/signup'>Регистрация</a></div>
    </>
  );
};
export default LogInForm;
