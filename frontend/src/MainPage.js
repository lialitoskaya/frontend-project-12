import { useContext } from "react";
import { AuthContext } from "./App";
import { Outlet } from "react-router-dom";
const MainPage = () => {
    
  const {setContext} = useContext(AuthContext);

  const logOutHandler = () => {
    localStorage.clear();
    setContext(null);
  };

  return (
    <div className="d-flex flex-column h-100">
      <nav className="navbar p-3 shadow-sm navbar-light bg-light">
        <a className="navbar-brand font-monospace" href="/">
          Hexlet chat
        </a>
        <button className="btn btn-outline-primary font-monospace" onClick={logOutHandler}>
          выйти
        </button>
      </nav>
      <Outlet/>
    </div>
  );
};

export default MainPage;
