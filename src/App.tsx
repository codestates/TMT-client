import React from 'react';
import logo from './logo.svg';
// import './App.css';
import Mainpage from './pages/Mainpage';

function App() {
  return (
    <div className="App">
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p> */}
      <Mainpage />
      {/* <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React 테스트
        </a>
      </header> */}
    </div>
  );
}

export default App