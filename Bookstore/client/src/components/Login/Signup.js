import React, {Component} from 'react';
import './Design.css'
import bookstore from './images/book_store.jpg';
import { Link } from 'react-router-dom';
import Header from '../Header/Header';
import axios from 'axios'


class Signup extends Component{

    constructor(props){
        super(props);
        this.state={
            Username: '',
            Password: '',
            C_Password: '',
            FirstName: '',
            LastName: '',
            message: ''
        }
    }

    handleSignUp = (data) => {

        var config = {
            headers: {'Access-Control-Allow-Origin': '*',
                'Accept': 'application/json'
            }
        };
        axios.post('http://localhost:3000/signup',data,config).then((response) => {
            console.log(response);
            if(response.data == "true"){
                this.setState({
                    message: "Signup Successfull!"
                })
            }

        })

    }


    render(){
        return(
            <div className="container">
                <Header/>
                <div className="signup-box col-md-4">
                    <img src={bookstore} className="book-style" />
                    <p style={{ color: "white"}}>SIGNUP HERE</p> <br />
                    <div className="form-body">
                        <input type="text" placeholder="Username" className="form-element"
                               onChange={(event) => {
                                   this.setState({
                                       Username: event.target.value,
                                       type: true
                                   });
                               }}
                        />
                        <input  type="text" placeholder= "First Name" className="form-element"
                                onChange={(event) => {
                                    this.setState({
                                        FirstName: event.target.value,
                                        type: true
                                    });
                                }}
                        />
                        <input  type="text" placeholder= "Last Name" className="form-element"
                                onChange={(event) => {
                                    this.setState({
                                        LastName: event.target.value,
                                        type: true
                                    });
                                }}
                        />
                        <input  type="password" placeholder= "Password" className="form-element"
                                onChange={(event) => {
                                    this.setState({
                                        Password: event.target.value,
                                        type: true
                                    });
                                }}
                        />
                        <input  type="password" placeholder= "Confirm Password" className="form-element"
                                onChange={(event) => {
                                    this.setState({
                                        C_Password: event.target.value,
                                        type: true
                                    });
                                }}
                        />

                    </div>
                    <button type="button" className="btn button-design"
                        onClick={()=>this.handleSignUp(this.state)}
                    >SIGNUP</button>
                    <br /><br />
                    <p style={{ color: "white" }}>Already a Member? <Link to="/login">Login here!!</Link> </p>
                    <p>{this.state.message}</p>
                </div>

            </div>


        );
    }
}

export default Signup;