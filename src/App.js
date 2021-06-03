import React from "react";
import './App.scss';
import "./styles/main.scss";

import Navbar from "./Component/Navbar";
import Sidebar from "./Component/Sidebar";
import Repo from "./Component/Repo";
class App extends React.Component {
  constructor(props) {
    super(props);
  }
  render(){
  return (
    <div className="App">
      <Navbar />
      <Sidebar />
      <Repo/>
    </div>
  );
  }
}

export default App;
