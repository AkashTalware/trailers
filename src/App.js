import React, {Component} from 'react'
import './App.css';
import { Container } from 'react-bootstrap';
import {Route, Switch} from 'react-router-dom'
import HomePage from './Components/HomePage'
import ViewDetails from './Components/ViewDetails'
import Header from './Components/HeaderFooter/Header'

class App extends Component {

  render(){
  return (
    <div className="App">
    <Container>
    <Header/>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/viewdetails" component={ViewDetails} />
      </Switch>
    </Container>
    </div>
  );
  }
}

export default App;
