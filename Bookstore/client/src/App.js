import React, {Component} from 'react';
import './App.css';


import {BrowserRouter} from 'react-router-dom';
import Calc from "./components/RoutesComponent";

class App extends Component {
    render() {
        return (
            <div className="App">
            <BrowserRouter>
            <Calc/>
            </BrowserRouter>
            </div>
    );
    }
}

export default App;