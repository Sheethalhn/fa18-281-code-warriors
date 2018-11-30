import React, {Component} from 'react';
import './Design.css'
import bookstore from './images/book_store.jpg';
import { Link } from 'react-router-dom';
import Header from '../Header/Header';


class Signup extends Component{

    constructor(props){
        super(props);
        this.state={
            
        }
    }


    render(){
        return(
            <div className="container">
                <Header/>
                <div className="signup-box col-md-4">
                    <img src={bookstore} className="book-style" />
                    <p style={{ color: "white"}}>SIGNUP HERE</p> <br />
                    <div className="form-body">
                        <input type="text" placeholder="Username" className="form-element"/>
                        <input  type="text" placeholder= "First Name" className="form-element"/>
                        <input  type="text" placeholder= "Last Name" className="form-element"/>
                        <input  type="password" placeholder= "Password" className="form-element"/>
                        <input  type="password" placeholder= "Confirm Password" className="form-element"/>

                    </div>
                    <button type="button" className="btn button-design">SIGNUP</button>
                    <br /><br />
                    <p style={{ color: "white" }}>Already a Member? <Link to="/login">Login here!!</Link> </p>
                </div>

            </div>


        );
    }
}

export default Signup;