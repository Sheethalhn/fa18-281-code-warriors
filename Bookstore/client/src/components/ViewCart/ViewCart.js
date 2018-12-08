import React, {Component} from 'react';
import {Redirect} from 'react-router';
// import axios from 'axios';
import NumericInput from 'react-numeric-input';
import SweetAlert from 'react-bootstrap-sweetalert';
import '../../App.css';
import Header from '../Header/Header';
import * as API from '../../api/ViewCartAPI';
import * as APIBOOK from '../../api/BookAPI';
import * as APIINVENTORY from '../../api/InventoryAPI';

// DUMMY VALUES
// var resultData = [{price : 1.32, bookName: "book1", bookId : "5bf7a618746498683a9c4561"}, {price:2.45, bookName : "book2",  bookId : "5bf7a618746498683a9c4563"}]

function roundToTwo(num) {    
    return Math.ceil(num * 100)/100;
}


class ViewCart extends Component{
    constructor(props){
        super(props);
        this.state = {
            rows :[{}],
            bookstable : [{}],
            totalamount : 0,
            updatebooks :[{}],
            isLoading : true,
            alert : null,
            data : false
        };
        //Bind the handlers to this class
        this.updateCart = this.updateCart.bind(this)
        this.deletebook = this.deletebook.bind(this)
        this.changecount = this.changecount.bind(this)
        this.resetCart = this.resetCart.bind(this)
        this.proceedCheckout = this.proceedCheckout.bind(this)
        this.cancelAlert = this.cancelAlert.bind(this)
    }

    componentWillMount(){
        if(localStorage.getItem('userId') === null){
            window.location = '/';
        }
    }

    resetCart () {
        console.log(this.state.rows)
        this.setState ({
            updatebooks : JSON.parse(JSON.stringify(this.state.rows))
        })
    }

    deletebook (evt, i) {
        var ubooks = this.state.updatebooks
        ubooks.splice(i, 1)
        this.setState ({
            updatebooks : JSON.parse(JSON.stringify(ubooks)) 
        })
    }

    proceedCheckout = () => {
        // API CALL TO CHECK INVENTORY  - /payment
        var checkbook = this.state.rows
        var totalmount = this.state.totalamount
        // var rows = JSON.parse(JSON.stringify(this.state.rows))
        var rows = this.state.rows
        var checking = []
        for(var k=0; k<rows.length; k++){
            var a = {}
            a.bookId = rows[k].bookid
            a.bookCount = rows[k].bookcount
            checking.push(a)
        }
        var result = { "books" : checking }
        APIINVENTORY.viewInventory(result).then(resultData => {
            console.log(resultData)
            if(resultData.data === null){
                this.props.history.push({
                    pathname : "/payment",
                    state : {
                        checkbook : this.state.rows,
                        totalamount : this.state.totalamount
                    }
                });
            } else {
                const getAlert = () => (
                    <SweetAlert 
                        warning
                        showCancel
                        confirmBtnBsStyle="danger"
                        cancelBtnBsStyle="default"
                        title="Some Books are not available"
                        onConfirm={this.cancelAlert}>
                        {resultData.data}
                    </SweetAlert>
                );
                this.setState({
                  alert: getAlert(),
                })
           }
        })
    }

    cancelAlert = () => {
        this.setState({
            alert: null
        });
    }

    updateCart () {
        var books = JSON.parse(JSON.stringify(this.state.updatebooks))
        var table = JSON.parse(JSON.stringify(this.state.bookstable))
        table.books = []
        var totalamount = 0;
        for(var i=0; i<books.length;i++){
            var a = {}
            books[i].amount = roundToTwo(books[i].bookcount * books[i].price);
            a.bookid = books[i].bookid
            a.bookcount = books[i].bookcount
            totalamount += books[i].amount;
            table.books.push(a)
        }
        console.log(table)
        this.setState ({
            totalamount : totalamount,
            rows : JSON.parse(JSON.stringify(books))
        })
        var userid = localStorage.getItem('userId');
        var result = {"books": table.books }
        API.updateCart(userid, result)
        .then(response => {
            console.log("Status Code : ",response);
            if(response.status === 200){  
                console.log(response.data)
            }
        })
    }

    changecount = (evt, i) => {
        const ubooks = this.state.updatebooks;
        ubooks[i].bookcount = Number(evt.target.value);
        // update state
        this.setState ({
            updatebooks : ubooks
        })
    }

    getContents () {
    var rows = this.state.rows
    if(!this.state.isLoading){
        if(rows.length > 0) {
            return Object.keys(rows).map(function(i) {
              return <tr className="table-row" key ={i}>
              <td className="column-1">
                  <div className="cart-img-product b-rad-4 o-f-hidden">
                    <img src={'/images/' + rows[i].bookimg} style  ={{width : "210px", height : "300px"}} alt="IMG-PRODUCT"/>
                  </div>
              </td>
              <td className="column-2">{rows[i].bookname}</td>
              <td className="column-3">${rows[i].price}</td>
              <td className="column-4">
              <NumericInput min={0} value={rows[i].bookcount} readOnly/>
              </td>
              <td className="column-5">${rows[i].amount}</td>
          </tr>
            })
          } else {
            return <div className="">
            <h4 className="m-text20 p-b-24"> Cart is empty</h4> </div>
          }
        }
    } 

    editContents () {
        var self =  this;
        var updatebooks = self.state.updatebooks
        if(!this.state.isLoading){
            if(updatebooks.length > 0) {
                return Object.keys(updatebooks).map(function(i) {
                  return <tr className="table-row" key ={i}>
                  <td className="column-1">
                      <div className="cart-img-product b-rad-4 o-f-hidden">
                          <img src={'/images/' + updatebooks[i].bookimg} style  ={{width : "210px", height : "300px"}} alt="IMG-PRODUCT"/>
                      </div>
                  </td>
                  <td className="column-2">{updatebooks[i].bookname}</td>
                  <td className="column-3">${updatebooks[i].price}</td>
                  <td className="column-4">
                  <input type = "number" min={1} step ="any" value={updatebooks[i].bookcount} onChange ={(evt) => self.changecount(evt, i)}/>
                  </td>
                  <td className="column-6">
                  <button onClick ={(evt) => self.deletebook(evt, i)}><img alt="alt img" src= "images/delete.png"/></button></td>
              </tr>
                })
              } else {
                return <div className="">
                <h4 className="m-text20 p-b-24"> Cart is empty</h4> </div>
              }
            }
        } 
    
    componentWillMount() {
        
    }

    componentDidMount() {
        var userid = localStorage.getItem('userId');
        API.viewCart(userid).then(response => {
            console.log("Status Code : ",response);
            if(response.status === 200){  
                if(response.data !== "Cart Empty") {
                console.log(response.data.books)
                var books = JSON.parse(JSON.stringify(response.data.books))
                console.log("books");
                console.log(books);
                this.books=books
                this.response = response.data
                let bookIds = books.map(a => a.bookid);
                this.totalamount = 0;
                var self = this;
                APIBOOK.getBookByIds(bookIds).then(resultData => {
                    for(var i = 0; i < self.books.length; i++){
                        let bookObj = resultData.data.find(obj => obj.bookId == self.books[i].bookid);
                        self.books[i].bookimg = bookObj.bookImg
                        self.books[i].bookname = bookObj.bookName
                        self.books[i].price = bookObj.price
                        self.books[i].amount = roundToTwo(self.books[i].bookcount * self.books[i].price);
                        self.totalamount += self.books[i].amount;
                    }
                    console.log(self.totalamount)
                    var books1 = JSON.parse(JSON.stringify(self.books))
                     this.setState ({
                        bookstable : self.response,
                        totalamount : self.totalamount,
                        rows : self.books,
                        updatebooks : books1,
                        isLoading : false,
                        data : true
                    })
                }) 
                }

                    // for(var i = 0; i < self.books.length; i++){
                    //     let bookObj = resultData.find(obj => obj.bookId == self.books[i].bookid);
                    //     // self.books[i].bookimg = bookObj.bookImg
                    //     self.books[i].bookname = bookObj.bookName
                    //     self.books[i].price = bookObj.price
                    //     self.books[i].amount = roundToTwo(self.books[i].bookcount * self.books[i].price);
                    //     self.totalamount += self.books[i].amount;
                    // }
                    // console.log(self.totalamount)
                    // var books1 = JSON.parse(JSON.stringify(self.books))
                    //  this.setState ({
                    //     bookstable : self.response,
                    //     totalamount : self.totalamount,
                    //     rows : self.books,
                    //     updatebooks : books1,
                    //     isLoading : false
                    // })
            }
        });
    }
    
    render(){
        return(
         <div>
            <Header/>
            <section className="bg-title-page p-t-40 p-b-50 flex-col-c-m" style= {{backgroundImage: "url(images/cart.jpg)"}}>
                <h2 className="l-text2 t-center">
                    Cart
                </h2>
            </section>
            <section className="cart bgwhite p-t-70 p-b-100">
                <div className="container ">
                    {this.state.data ?
                    <div className="container-table-cart pos-relative" style = {{borderLeft: "1px solid #e6e6e6" ,
    borderRight: "1px solid #e6e6e6", borderTop: "1px solid #e6e6e6"}}>
                        <div className="wrap-table-shopping-cart bgwhite">
                            <table className="table-shopping-cart">
                            <tbody>
                                <tr className="table-head">
                                    <th className="column-1"></th>
                                    <th className="column-2" style = {{textAlign : "center"}}>Product</th>
                                    <th className="column-3" style = {{textAlign : "center"}}>Price</th>
                                    <th className="column-4" style = {{textAlign : "center"}}>Quantity</th>
                                    <th className="column-5" style = {{textAlign : "center"}}>Total</th>
                                </tr>
                                {this.getContents()}
                              </tbody>
                            </table>
                        </div>
                    </div> : 
                    <div className="">
                    <h4 className="m-text20 p-b-24"> Cart is empty</h4> </div>
                    }

                    <div className="flex-w flex-sb-m p-t-25 p-b-25 bo8 p-l-35 p-r-60 p-lr-15-sm">
                        <div className="size10 trans-0-4 m-t-10 m-b-10"> 
                            <button className="flex-c-m sizefull bg1 bo-rad-23 hov1 s-text1 trans-0-4" data-toggle="modal" data-target="#editmodal">
                                Edit Cart
                            </button>
                            <div className="modal fade modal-xl" id="editmodal" tabIndex="-1" role="dialog" aria-labelledby="modallabel" aria-hidden="true"  style = {{marginTop : "100px", marginLeft : "100px"}}>
                                <div className="modal-dialog modal-dialog-centered modal-xl" style = {{width : "1200px"}}>
                                    <div className="modal-content">
                                        <div className="modal-header">
                                            <h5 className="m-text20 p-b-24" id="modallabel">Edit Cart</h5>
                                            {/* <button type="button" className="close" data-dismiss="modal" onClick = {this.resetCart} aria-label="Close">
                                            &times;
                                            </button> */}
                                        </div>
                                        <div className="modal-body">
                                        <table className="table-shopping-cart">
                                            <tbody>
                                                <tr className="table-head">
                                                    <th className="column-1"></th>
                                                    <th className="column-2" style = {{textAlign : "center"}}>Product</th>
                                                    <th className="column-3" style = {{textAlign : "center"}}>Price</th>
                                                    <th className="column-4" style = {{textAlign : "center"}}>Quantity</th>
                                                    <th className="column-5" style = {{textAlign : "center"}}></th>
                                                </tr>
                                                {this.editContents()}
                                            </tbody>
                                          </table>
                                          <div className = "modal-footer">
                                          <div className="size10 trans-0-4 m-t-10 m-b-10">
                                                <button type="button" className="flex-c-m sizefull bg1 bo-rad-23 hov1 s-text1 trans-0-4" data-dismiss="modal" onClick = {this.resetCart}>Close</button></div>         
                                                <div className="size10 trans-0-4 m-t-10 m-b-10">
                                                <button type="submit" className="flex-c-m sizefull bg1 bo-rad-23 hov1 s-text1 trans-0-4" data-dismiss="modal" onClick = {this.updateCart}>Save changes</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bo9 w-size18 p-l-40 p-r-40 p-t-30 p-b-38 m-t-30 m-r-0 m-l-auto p-lr-15-sm">
                        <h5 className="m-text20 p-b-24">
                            Cart Totals
                        </h5>

                        <div className="flex-w flex-sb-m p-t-26 p-b-30">
                            <span className="m-text22 w-size19 w-full-sm">
                                Total:
                            </span>

                            <span className="m-text21 w-size20 w-full-sm">
                                ${this.state.totalamount}
                            </span>
                        </div>

                        <div className="size15 trans-0-4">
                            <button className="flex-c-m sizefull bg1 bo-rad-23 hov1 s-text1 trans-0-4" onClick = {this.proceedCheckout}>
                                Proceed to Checkout
                            </button> {this.state.alert}
                        </div>
                    </div>
                </div>
            </section>

            <footer className="bg6 p-t-45 p-b-43 p-l-45 p-r-45">
                
            </footer>
         </div>
        )
    }
}

export default ViewCart;
