import React, {Component} from 'react';
import './Design.css'
import Header from '../Header/Header';
import bookstore from './images/book_store.jpg';
import { Link } from 'react-router-dom';


class Login extends Component{


    render(){
        return(
            <div className="container">
                <Header/>
                <div className="login-box col-md-4">
                    <img src={bookstore} className="book-style" />
                    <p style={{ color: "white"}}>LOGIN HERE</p> <br />
                    <div className="form-body">
                        <input type="text" placeholder="Username" className="form-element"/>
                        <input  type="password" placeholder= "Password" className="form-element"/>

                    </div>
                    <button type="button" className="btn button-design">SIGNIN</button>
                    <br /><br />
                    <p style={{ color: "white" }}>Not a Member Already? <Link to="/signup">Signup here!!</Link> </p>
                </div>

            </div>


        );
    }
}

export default Login;