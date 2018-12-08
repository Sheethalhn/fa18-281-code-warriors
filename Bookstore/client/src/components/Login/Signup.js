import React, {Component} from 'react';
import './Design.css'
import bookstore from './images/book_store.jpg';
import { Link } from 'react-router-dom';
import Header1 from '../Header/Header1';
import axios from 'axios';
import * as API from '../../api/ViewCartAPI'


class Signup extends Component{

    constructor(props){
        super(props);
        this.state={
            Username: '',
            Password: '',
            C_Password: '',
            FirstName: '',
            LastName: '',
            message: '',
            u_message: '',
            p_message: '',
            cp_message: '',
            f_message: '',
            l_message: '',
            userId: localStorage.getItem('userId')
        }
    }

    componentWillMount(){
        //localStorage.removeItem('userId');
        if(localStorage.getItem('userId') != null){
            window.location = "/books"
        }
    }

    doSignUp = (data) => {
        this.setState({
            u_message: '',
            p_message: '',
            cp_message: '',
            f_message: '',
            l_message: ''
        },()=>this.validateUsername(data))
    }
    validateUsername = (data) => {
        if(this.state.Username.length < 8){
            this.setState({
                u_message: 'Username should be atleast 8 in length'
            }, () => this.validatePassword(data))
        }
        else{
            this.validatePassword(data)
        }
    }

    validatePassword = (data) => {
        if(this.state.Password.length < 8){
            this.setState({
                p_message: 'Password should be atleast 8 in length'
            }, () => this.validateCPassword(data))
        }
        else{
            this.validateCPassword(data)
        }
    }

    validateCPassword = (data) => {
        if(this.state.Password != this.state.C_Password){
            this.setState({
                cp_message: 'Passwords donot Match'
            }, () => this.validateFname(data))
        }
        else{
            this.validateFname(data)
        }
    }

    validateFname = (data) => {
        if(this.state.FirstName.length <= 0){
            this.setState({
                f_message: 'First Name cannot be empty'
            }, () => this.validateLname(data))
        }
        else{
            this.validateLname(data)
        }
    }

    validateLname = (data) => {
        if(this.state.LastName.length <= 0){
            this.setState({
                l_message: 'Last Name cannot be empty'
            }, () => this.handleSignUp(data))
        }
        else{
            this.handleSignUp(data)
        }
    }

    handleSignUp = (data) => {

        const req_header = {
            headers: { "apikey": "7d833d215308491aa2a60d18a83d61f1" }
        };
        var userid = 0;

        //console.log(this.state.u_message);
        if(this.state.u_message != 'Username should be atleast 8 in length' && this.state.p_message != 'Password should be atleast 8 in length' && this.state.cp_message != 'Passwords donot Match' && this.state.f_message != 'First Name cannot be empty' && this.state.l_message != 'Last Name cannot be empty') {
            axios.post('http://13.52.93.114:8000/userapi/signup', data, req_header).then((response) => {
                console.log(response);
                if (response.data == "true") {

                    this.setState({
                        message: "Signup Successfull!"
                    })
                    axios.post('http://13.52.93.114:8000/userapi/getUserById', data, req_header).then((response) => {
                        userid = response.data.id;

                    },API.addNewCart(Number(userid)));


                }
                else {
                    this.setState({
                        message: "User already exists!!"
                    })
                }

            })
        }

    }


    render(){
        return(
            <div className="container">
                <Header1/>
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
                        <p style={{ color: 'red'}}>{this.state.u_message}</p>
                        <input  type="text" placeholder= "First Name" className="form-element"
                                onChange={(event) => {
                                    this.setState({
                                        FirstName: event.target.value,
                                        type: true
                                    });
                                }}
                        />
                        <p style={{ color: 'red'}}>{this.state.f_message}</p>
                        <input  type="text" placeholder= "Last Name" className="form-element"
                                onChange={(event) => {
                                    this.setState({
                                        LastName: event.target.value,
                                        type: true
                                    });
                                }}
                        />
                        <p style={{ color: 'red'}}>{this.state.l_message}</p>
                        <input  type="password" placeholder= "Password" className="form-element"
                                onChange={(event) => {
                                    this.setState({
                                        Password: event.target.value,
                                        type: true
                                    });
                                }}
                        />
                        <p style={{ color: 'red'}}>{this.state.p_message}</p>
                        <input  type="password" placeholder= "Confirm Password" className="form-element"
                                onChange={(event) => {
                                    this.setState({
                                        C_Password: event.target.value,
                                        type: true
                                    });
                                }}
                        />
                        <p style={{ color: 'red'}}>{this.state.cp_message}</p>

                    </div>
                    <button type="button" className="btn button-design"
                        onClick={()=>this.doSignUp(this.state)}
                    >SIGNUP</button>
                    <br /><br />
                    <p style={{ color: "white" }}>Already a Member? <Link to="/login">Login here!!</Link> </p>
                    <p style={{ color: 'white'}}>{this.state.message}</p>
                </div>

            </div>


        );
    }
}

export default Signup;