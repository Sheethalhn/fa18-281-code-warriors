import React, {Component} from 'react';
import axios from 'axios';
import NumericInput from 'react-numeric-input';
import '../../App.css';
import Header from '../Header/Header';

// DUMMY VALUES
var booktable = [{price : 1.32, bookname: "book1"}, {price:2.45, bookname : "book2"}]

class ViewCart extends Component{
    constructor(props){
        super(props);
        this.state = {
            rows :[{}],
            bookstable : [{}],
            totalamount : 0,
            updatebooks :[{}],
            isLoading : true,
        };
        //Bind the handlers to this class
        this.updateCart = this.updateCart.bind(this)
        this.deletebook = this.deletebook.bind(this)
        this.changecount = this.changecount.bind(this)
        this.resetCart = this.resetCart.bind(this)
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

    updateCart () {
        var books = this.state.updatebooks
        console.log(this.state.bookstable)
        var table = JSON.parse(JSON.stringify(this.state.bookstable))
        console.log(table)
        table.books = []
        var totalamount = 0;
        for(var i=0; i<books.length;i++){
            var a = []
            books[i].amount = books[i].bookcount * books[i].price;
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
        //var userid = 1;
        // axios.post(`http://localhost:3001/updatecart/${userid}`, table)
        // .then(response => {
        //     console.log("Status Code : ",response);
        //     if(response.status === 200){  
        //         console.log(response.data)
        //     }
        //    })
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
                      <img src="images/item-10.jpg" alt="IMG-PRODUCT"/>
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
            <h4> Cart is empty</h4> </div>
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
                          <img src="images/item-10.jpg" alt="IMG-PRODUCT"/>
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
                <h4> Cart is empty</h4> </div>
              }
            }
        } 
    
    componentWillMount() {
        
    }

    componentDidMount() {
        var userid = 1; // DUMMY VALUE
        axios.get(`http://localhost:3001/viewcart/${userid}`)
        .then(response => {
            console.log("Status Code : ",response);
            if(response.status === 200){  
                var books = JSON.parse(JSON.stringify(response.data.books))
                var totalamount = 0;
                for(var i=0; i<books.length;i++){
                    //TODO API CALL TO BOOKS TO GET PRICE
                    books[i].price = booktable[i].price
                    books[i].bookname = booktable[i].bookname
                    books[i].amount = books[i].bookcount * books[i].price;
                    totalamount += books[i].amount;
                }
                var books1 = JSON.parse(JSON.stringify(books))
                this.setState ({
                    bookstable : response.data,
                    totalamount : totalamount,
                    rows : books,
                    updatebooks : books1,
                    isLoading : false
                })
            }
        });
    }
    
    render(){
        return(
         <div>
            <Header/>
            <section className="bg-title-page p-t-40 p-b-50 flex-col-c-m" style= {{backgroundImage: "url(images/heading-pages-01.jpg)"}}>
                <h2 className="l-text2 t-center">
                    Cart
                </h2>
            </section>
            <section className="cart bgwhite p-t-70 p-b-100">
                <div className="container">
                    <div className="container-table-cart pos-relative">
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
                    </div>

                    <div className="flex-w flex-sb-m p-t-25 p-b-25 bo8 p-l-35 p-r-60 p-lr-15-sm">
                        <div className="size10 trans-0-4 m-t-10 m-b-10"> 
                            <button className="flex-c-m sizefull bg1 bo-rad-23 hov1 s-text1 trans-0-4" data-toggle="modal" data-target="#editmodal">
                                Update Cart
                            </button>
                            <div className="modal fade modal-xl" id="editmodal" tabIndex="-1" role="dialog" aria-labelledby="modallabel" aria-hidden="true"  style = {{marginTop : "40px"}}>
                                <div className="modal-dialog modal-dialog-centered modal-xl">
                                    <div className="modal-content">
                                        <div className="modal-header">
                                            <h5 className="modal-title" id="modallabel">Edit Cart</h5>
                                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                            &times;
                                            </button>
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
                                          <div className="modal-footer">
                                                <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick = {this.resetCart}>Close</button>
                                                <button type="submit" className="btn btn-primary" data-dismiss="modal" onClick = {this.updateCart}>Save changes</button>
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
                            <button className="flex-c-m sizefull bg1 bo-rad-23 hov1 s-text1 trans-0-4">
                                Proceed to Checkout
                            </button>
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