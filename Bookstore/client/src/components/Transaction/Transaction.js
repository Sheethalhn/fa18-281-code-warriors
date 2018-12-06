import React, {Component} from 'react';
import Header from '../Header/Header';
import axios from 'axios'
import './Design.css';


class Transaction extends Component{

    constructor(props){
        super(props);
        this.state={
            transactions: [],
            noTran:""
        }
    }

    componentWillMount() {
        if(localStorage.getItem('userId') === null){
            window.location = '/';
        }
        else {
            axios.get('http://localhost:3000/getAllTransactionByUser/'+localStorage.getItem('userId')).then((response) => {
                console.log("check response data", response.data);
                if (response.status === 200 && response.data !== null) {
                    this.setState({
                        transactions: response.data
                    })
                } else {
                    this.setState({
                        noTran: "Sorry, Please purchase some books to see transaction"
                    })
                }
            })
        }
    }

    renderBooks = (transaction) => {
        return transaction.books.map(book =>{
            return(
            <div>
                BookName: {book.bookname}<br/>
                Qty: {book.qty}<br/>
                Price: {book.price}<br/>
                <hr />
            </div>
            )
        })
    }


    render(){
        return(
            <div className="container">
                <Header/>

                    <p style={{ color: "black"}}>Recent Transactions</p> <br />

                    {this.state.transactions.map((transaction) => (
                        <div key={transaction.id} className="transaction" >
                            <div className="sub-transaction">
                            <p>Transaction Id: {transaction.id}</p>
                                {this.renderBooks(transaction)}
                                <p> Total Transaction amount: {transaction.totalamount}</p>
                            </div>
                        </div>
                    ))}

                {this.state.noTran}


            </div>


        );
    }
}

export default Transaction;