import React, { Component } from 'react';
import SweetAlert from 'react-bootstrap-sweetalert';
import './payment.css';
import amexlogo from './amex.jpg';
import masterlogo from './mastercard.jpg';
import visalogo from './visa.jpg';
import Header from '../Header/Header';
import * as API from '../../api/InventoryAPI';
import * as TransAPI from '../../api/TransactionAPI';
import * as CartAPI from '../../api/ViewCartAPI';



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
            transactionjson : [],
            checkbook: this.props.location.state.checkbook
            //     [{
            //         "bookId" : "5bf7a618746498683a9c4561",
            //         "bookCount":1
                
            //     }
            //     ]           

        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.cancelAlert = this.cancelAlert.bind(this)
    }

    componentWillMount(){
        if(localStorage.getItem('userId') === null){
            window.location = '/';
        }
    }
    

    handleSubmit(e) {
        e.preventDefault();
        var rows = this.state.checkbook
        console.log(rows)
        this.setState({ submitted: true });
        if (this.state.card_number !== undefined && this.state.card_number !== "" && this.state.name !== undefined && this.state.name !== ""  && this.state.cvv !== undefined && this.state.cvv !== "" ) {
            var checking = []
            for(var k=0; k< rows.length; k++){
                var a = {}
                a.bookId = rows[k].bookid
                a.bookCount = rows[k].bookcount
                checking.push(a)
            }
            // json for transaction
            var result = { books : checking}   
            var booksjson = []
            var total=0
            for(var k=0; k< rows.length; k++){
                var a = {}
                a.bookid = rows[k].bookid // "5bf7a618746498683a9c4561"
                a.bookname = rows[k].bookname   // "Mongo"
                a.qty = rows[k].bookcount     //1
                a.price = rows[k].amount     // 10
                total+=a.qty*a.price
                booksjson.push(a)
            }
            var payload = {userid:localStorage.getItem('userId'), books : booksjson, totalamount : total }
            this.payload = payload
            var self = this;
            API.viewInventory(result).then(resultData => {
                if(resultData.data === null && resultData.status === 200){
                    API.updateInventory(result).then(resultData =>{
                        if(resultData.status === 200)
                        {   
                            TransAPI.createTransaction(self.payload).then(resultData =>{
                               if(resultData.status === 200)
                               {   
                                   const getAlert = () => (
                                    <SweetAlert 
                                        warning
                                        showCancel
                                        confirmBtnBsStyle="danger"
                                        cancelBtnBsStyle="default"
                                        title="Successfull Transaction"
                                        onConfirm={this.cancelAlert}>
                                        {resultData.data}
                                    </SweetAlert>
                                );
                                    self.setState({alert: getAlert()})

                                     CartAPI.clearCart(localStorage.getItem('userId')).then(resultData =>{
                                        if(resultData.status === 200)
                                        {
                                            this.props.history.push("/books");
                                        }

                                    })
                                }

                            })
                            
                        }
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
                        </SweetAlert>
                    );
                    this.setState({
                      alert: getAlert(),
                    })
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
                                    <button type="submit" onClick ={this.handleSubmit} className="btn btnpayment" id="confirm-purchase">Pay Now</button>{this.state.alert}
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