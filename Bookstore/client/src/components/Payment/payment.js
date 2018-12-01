import React, { Component } from 'react';
import SweetAlert from 'react-bootstrap-sweetalert';
import './payment.css';
import amexlogo from './amex.jpg';
import masterlogo from './mastercard.jpg';
import visalogo from './visa.jpg';
import Header from '../Header/Header';
import * as API from '../../api/InventoryAPI';


class Payment extends Component {

    constructor(props) {
        super(props);
        this.state = {
            card_number: '',
            name: '',
            expiration: '',
            cvv: '',
            submitted: false,
            alert : null,
            checkbook: {
                "books" :
                [{
                    "bookId" : "5bf7a618746498683a9c4561",
                    "bookCount":10
                
                },{	"bookId" : "5bf7a618746498683a9c4563",
                    "bookCount" :1
                    }
                ]
                }
            //checkbook: this.props.location.state.checkbook ? this.props.location.state.checkbook : [{}]
            //checkbook: this.props.location.state.checkbook

        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.cancelAlert = this.cancelAlert.bind(this)
    }

    handleSubmit(e) {
        e.preventDefault();
        this.setState({ submitted: true });
        if (this.state.card_number !== undefined && this.state.card_number !== "" && this.state.name !== undefined && this.state.name !== ""  && this.state.cvv !== undefined && this.state.cvv !== "" ) {
            API.viewInventory(this.state.checkbook).then(resultData => {
                if(resultData.length === 0){
                    console.log(resultData);
                    API.updateInventory(this.state.checkbook).then(resultData =>{
                    })
                    
                } else {
                    console.log(resultData);
                    const getAlert = () => (
                        <SweetAlert 
                            warning
                            showCancel
                            confirmBtnBsStyle="danger"
                            cancelBtnBsStyle="default"
                            title="Some Books are not available"
                            onConfirm={this.cancelAlert}>
                            {resultData}
                        </SweetAlert>
                    );
                    // this.setState({
                    //   alert: getAlert(),
                    // })
                }
            })
            
        } 
    }
    cancelAlert = () => {
        this.setState({
            alert: null
        });
    }
    handleCancel(){
        this.props.history.push("/books");
    }
    render() {
        return (
            <div className="outerBody">
                <Header />
                <div className="row justify-content-center">
                    <div className="creditCardForm">
                        <div className="heading">
                            <h1>Confirm Purchase</h1>
                        </div>
                        <div className="payment">
                            <form onSubmit={this.handleSubmit}>
                                <div className="form-group owner">
                                    <label for="owner">Name</label>
                                    <input
                                        type="text"
                                        className="col-sm-12"
                                        id="owner"
                                        name="name"
                                        value={this.state.name}
                                        onChange={(event) => {
                                            this.setState({
                                                name: event.target.value
                                            });
                                        }}
                                        required />
                                </div>
                                <div className="form-group CVV">
                                    <label for="cvv">CVV</label>
                                    <input
                                        type="number"

                                        className="col-sm-12" id="cvv"
                                        max="9999"
                                        value={this.state.cvv}
                                        onChange={(event) => {
                                            this.setState({
                                                cvv: event.target.value
                                            });
                                        }}
                                        required />
                            
                                </div>
                                <div className="form-group" id="card-number-field">
                                    <label for="cardNumber">Card Number</label>
                                    <input
                                        type="number"
                                        className="col-sm-12"
                                        id="cardNumber"
                                        value={this.state.card_number}
                                        onChange={(event) => {
                                            this.setState({
                                                card_number: event.target.value
                                            });
                                        }}
                                        required />

                                </div>
                                <div className="form-group" id="expiration-date">
                                    <label>Expiration Date</label>
                                    <div className="form-group form-control-sm ">
                                        <select>
                                            <option value="01">January</option>
                                            <option value="02">February </option>
                                            <option value="03">March</option>
                                            <option value="04">April</option>
                                            <option value="05">May</option>
                                            <option value="06">June</option>
                                            <option value="07">July</option>
                                            <option value="08">August</option>
                                            <option value="09">September</option>
                                            <option value="10">October</option>
                                            <option value="11">November</option>
                                            <option value="12" selected>December</option>
                                        </select>
                                        <select>
                                            <option value="16"> 2018</option>
                                            <option value="17"> 2019</option>
                                            <option value="18"> 2020</option>
                                            <option value="19"> 2021</option>
                                            <option value="20"> 2022</option>
                                            <option value="21"> 2023</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="form-group" id="credit_cards">
                                    <img src={visalogo} id="visa" />
                                    <img src={masterlogo} id="mastercard" />
                                    <img src={amexlogo} id="amex" />
                                </div>
                                <div className="form-group" id="pay-now">
                                    <button type="submit" className="btn btnpayment" id="confirm-purchase">Pay Now</button>{this.state.alert}
                                    <button type="button" onClick ={this.handleCancel} className="btn btnpayment" id="cancel-purchase">Cancel</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )

    }
}

export default Payment;