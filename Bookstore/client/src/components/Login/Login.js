import React, {Component} from 'react';
import './Design.css'
import Header1 from '../Header/Header1';
import bookstore from './images/book_store.jpg';
import { Link } from 'react-router-dom';
import axios from "axios/index";


class Login extends Component{

    constructor(props){
        super(props);
        this.state={
            Username: '',
            Password: '',
            message: '',
            u_message: '',
            p_message: ''
        }
    }

    componentWillMount(){
        if(localStorage.getItem('userId') != null){
            window.location = "/books"
        }
    }

    doLogin = (data) => {
        this.setState({
            u_message: '',
            p_message: ''
        },()=>this.validateUsername(data))
    }

    validateUsername = (data) => {
        if(this.state.Username.length <= 0){
            this.setState({
                u_message: 'Username cannot be Empty'
            }, () => this.validatePassword(data))
        }
        else{
            this.validatePassword(data)
        }
    }

    validatePassword = (data) => {
        if(this.state.Password.length <= 0){
            this.setState({
                p_message: 'Password cannot be Empty'
            }, () => this.handleLogin(data))
        }
        else{
            this.handleLogin(data)
        }
    }

    handleLogin = (data) => {

        const req_header = {
            headers: { "apikey": "7d833d215308491aa2a60d18a83d61f1" }
        };

        if( this.state.u_message != 'Username cannot be Empty' && this.state.p_message != 'Password cannot be Empty') {
            axios.post('http://13.52.93.114:8000/userapi/login', data, req_header).then((response) => {
                //console.log(response);
                if (response.data == "true") {
                    axios.post('http://localhost:3000/getUserById', data).then((response) => {
                        console.log(response.data.id);
                        localStorage.setItem('userId', response.data.id);
                        window.location = "/books";
                        this.setState({
                            message: "Login Successful!!"
                        })
                    })

                }
                else {
                    this.setState({
                        message: "Login Failed!!"
                    })
                }

            })
        }

    }


    render(){
        return(
            <div className="container">
                <Header1/>
                <div className="login-box col-md-4">
                    <img src={bookstore} className="book-style" />
                    <p style={{ color: "white"}}>LOGIN HERE</p> <br />
                    <div className="form-body">
                        <input type="text" placeholder="Username" className="form-element"
                               onChange={(event) => {
                                   this.setState({
                                       Username: event.target.value,
                                       type: true
                                   });
                               }}
                        />
                        <p style={{ color: "red"}}>{this.state.u_message}</p>
                        <input  type="password" placeholder= "Password" className="form-element"
                                onChange={(event) => {
                                    this.setState({
                                        Password: event.target.value,
                                        type: true
                                    });
                                }}
                        />
                        <p style={{ color: "red"}}>{this.state.p_message}</p>

                    </div>
                    <button type="button" className="btn button-design"
                            onClick={()=>this.doLogin(this.state)}
                    >SIGNIN</button>
                    <br /><br />
                    <p style={{ color: "white" }}>Not a Member Already? <Link to="/signup">Signup here!!</Link> </p>
                    <p style={{ color: 'white'}}>{this.state.message}</p>

                </div>

            </div>


        );
    }
}

export default Login;