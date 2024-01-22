import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      
    </div>
    <Routes>
        <Route element={<div><ul><li><Link to='/first'>first link</Link></li><li><Link to='/second'>second link</Link></li></ul></div>}/>
        <Route path='/' element={<div>On click open first task</div>}/>
        <Route path='second' element={<div>On click open second task</div>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
