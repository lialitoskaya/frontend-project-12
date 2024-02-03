import axios from "axios";
import { useState } from "react";
import { useContext } from "react";
import { AuthContext } from "./App";
import { useNavigate } from "react-router-dom";
const SignUpForm = () => {
  const navigate = useNavigate();
  const submitHandler = () => {
    axios.post('/api/v1/signup', user).then((res) => {
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('username', user.username);
        localStorage.setItem('password', user.password);
        setContext(localStorage);
        console.log(user)
        navigate('/', {replace: false});
    })
  }
  const [user, setUser] = useState({username: "", password: ""});
  const { setContext } = useContext(AuthContext);
  return (
    <div className="my-2 mx-4 form-floating mb-3">
      <div className="text-center ">
        <p className="">Регистрация</p>
        <div className="mb-3">
          <input onChange={(e) => setUser({...user, username: e.target.value})} value={user.username} className="form-control" placeholder="Имя"></input>
        </div>
        <div className="mb-3">
          <input className="form-control" placeholder="Пароль" onChange={(e) => setUser({...user, password: e.target.value})} value={user.password}/>
        </div>
        <button onClick={submitHandler} className="btn btn-secondary">Зарегистироваться</button>
      </div>
      
    </div>
  );
};

export default SignUpForm;
