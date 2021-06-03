import React from "react";
import './App.scss';
import "./styles/main.scss";
import Navbar from "./Component/Navbar";
import Sidebar from "./Component/Sidebar";
import Repo from "./Component/Repo";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

class App extends React.Component {
  constructor(props) {
    super(props);
  }
  render(){
  return (
    <Router>
    <div className="App">
      <Navbar />
      <Sidebar />
      <Route path="/repo" component={Repo}/>
    </div>
    </Router>
  );
  }
}

export default App;
