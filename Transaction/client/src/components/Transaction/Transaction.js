import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import Header from '../Header/Header';
import axios from 'axios'


class Transaction extends Component{

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

    componentWillMount() {
        axios.get('http://localhost:3000/getAllTransactionByUser/12345').then((response) => {
            console.log(response);
            if(response.data == "true"){
                this.setState({
                    message: "get tran Successfull!"
                })
            }

        })
    }


    handleSignUp = (data) => {

        var config = {
            // headers: {'Access-Control-Allow-Origin': '*',
            //     'Accept': 'application/json'
            // }
        };


    }


    render(){
        return(
            <div className="container">
                <Header/>
                <div className="signup-box col-md-4">
                    <p style={{ color: "white"}}>Recent Transactions</p> <br />
                    <div className="form-body">
                        <input type="text" placeholder="Username" className="form-element"
                               onChange={(event) => {
                                   this.setState({
                                       Username: event.target.value,
                                       type: true
                                   });
                               }}
                        />
                </div>
			</div>
            </div>


        );
    }
}

export default Transaction;