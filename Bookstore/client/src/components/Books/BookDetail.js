import React, { Component } from 'react';
import * as API from '../../api/BookAPI';
import Header from '../Header/Header';
import './books.css';
import { Button, Modal } from 'react-bootstrap';
import * as ViewCartAPI from '../../api/ViewCartAPI';

class BookDetail extends Component {

    constructor(props) {
        super(props);
        this.state = {
            bookObj: {}
        };
    }

    componentWillMount(){
        if(localStorage.getItem('userId') === null){
            window.location = '/';
        }
    }

    componentDidMount() {
        if (this.props.match.params.bookId != null) {
            API.getBookByIds(this.props.match.params.bookId)
                .then((resultData) => {
                    if (!!resultData && !!resultData.data && resultData.data.length > 0) {
                        this.setState({
                            bookObj: resultData.data[0]
                        });
                    } else {
                        console.log("There are no books in DB");
                    }
                });
        }
    }

    handleClose() {
        this.setState({ show: false });
    }

    handleShow(book) {
        let bookList = [];
        let payloadJson = {};
        let bookJSON = {};
        bookJSON.bookId = book.bookId;
        bookJSON.bookCount = 1;
        bookList.push(bookJSON);
        payloadJson.books = bookList;
        ViewCartAPI.addBookToCart(localStorage.getItem('userId'),payloadJson)
            .then((resultData) => {
                this.setState({
                    show: true,
                    bookName: book.bookName
                });
            });
    }

    render() {
        return (
            <div>
                <Header />
                <div className="container bgwhite p-t-35 p-b-80">
                    <div className="flex-w flex-sb">
                        <div className="w-size13 p-t-30 respon5">
                            <div className="wrap-slick3 flex-sb flex-w">
                                <div className="slick3">
                                    <div className="item-slick3" data-thumb="images/thumb-item-01.jpg">
                                        <div className="book-detail-img wrap-pic-w">
                                            <img src={'/images/' + this.state.bookObj.bookImg} alt="IMG-PRODUCT" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="w-size14 p-t-30 respon5">
                            <h4 className="product-detail-name m-text16 p-b-13">
                                <b>{this.state.bookObj.bookName}</b>
                            </h4>
                            <span className="m-text17">
                                Price: ${this.state.bookObj.price}
                            </span>
                            <p className="s-text8 p-t-10">
                                {this.state.bookObj.bookDesc}
                            </p>
                            <div className="p-t-33 p-b-60">
                                <div className="flex-r-m flex-w p-t-10">
                                    <div className="w-size16 flex-m flex-w">
                                        <div className="btn-addcart-product-detail size9 trans-0-4 m-t-10 m-b-10">
                                            <button onClick={this.handleShow}  className="flex-c-m sizefull bg1 bo-rad-23 hov1 s-text1 trans-0-4">
                                                Add to Cart
								            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Modal
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                    show={this.state.show}
                    onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Book Store</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Hurray! <h4>{this.state.bookObj.bookName}</h4> is added to cart !</Modal.Body>
                    <Modal.Footer>
                        <Button variant="success" onClick={this.handleClose}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }
}

export default BookDetail;