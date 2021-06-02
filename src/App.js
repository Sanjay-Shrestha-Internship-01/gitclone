import React from "react";
import './App.scss';
import "./styles/main.scss";

import Navbar from "./Component/Navbar";
class App extends React.Component {
  constructor(props) {
    super(props);
  }
  render(){
  return (
    <div className="App">
      <Navbar />
    </div>
  );
  }
}

export default App;
