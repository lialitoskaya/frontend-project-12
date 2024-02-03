import "./App.css";
import { Routes, Route } from "react-router-dom";
import LogInForm from "./LogInForm";
import { createContext, useState } from "react";
import React from "react";
import { Provider } from "react-redux";
import store from "./store.js";
import Chat from "./ChatPage.js";
import { Navigate } from "react-router-dom";
import SignUpForm from "./SignUpForm.js";
import MainPage from "./MainPage.js";

export const AuthContext = createContext({});

const App = () => {

  const [context, setContext] = useState(localStorage.token ? localStorage : null);

  

  return (
    <AuthContext.Provider value={{context, setContext}}>
      <Provider store={store}>
        <Routes>
          <Route
            path="/"
            element={<MainPage/>}
          >
            <Route index element={context ? <Chat /> : <Navigate to="/login" replace={false}/> }/>
            <Route path='/signup' element={<SignUpForm />} />
            <Route path="/login" element={<LogInForm />} />
            </Route>
          
        </Routes>
      </Provider>
    </AuthContext.Provider>
  );
};

export default App;
