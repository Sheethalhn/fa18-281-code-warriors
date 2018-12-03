import React, { Component } from 'react';
import Header from '../Header/Header';
import './books.css';
import * as API from '../../api/BookAPI';
import * as ViewCartAPI from '../../api/ViewCartAPI';
import { Link } from 'react-router-dom';
import { Button, Modal } from 'react-bootstrap';

class ViewBooks extends Component {

    constructor(props) {
        super(props);
        this.state = {
            bookList: [],
            bookName: ""
        };

        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }

    componentDidMount() {
        API.getBooks()
            .then((resultData) => {
                if (!!resultData && !!resultData.data) {
                    console.log(resultData)
                    this.setState({
                        bookList: JSON.parse(JSON.stringify(resultData.data))
                    });
                } else {
                    console.log("There are no open projects in DB");
                }
            });
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
        console.log("payloadJson :",payloadJson);
        ViewCartAPI.addBookToCart(localStorage.getItem('userId'),payloadJson)
            .then((resultData) => {
                this.setState({
                    show: true,
                    bookName: book.bookName
                });
            });
    }

    render() {

        const beforeFiveNode = this.state.bookList.map((book, index) => {
            if (index < 5) {
                return <div key={index} className="col p-b-50">
                    <div className="block2">
                        <div className="block2-img wrap-pic-w of-hidden pos-relative block2-labelnew">
                            <img alt="book-img" className="book-img" key={index} src={'/images/' + book.bookImg} />
                            <div className="block2-overlay trans-0-4">
                                <Link to="" className="block2-btn-addwishlist hov-pointer trans-0-4">
                                    <i className="icon-wishlist icon_heart_alt" aria-hidden="true"></i>
                                    <i className="icon-wishlist icon_heart dis-none" aria-hidden="true"></i>
                                </Link>
                                <div className="block2-btn-addcart w-size1 trans-0-4">
                                    <button onClick={() => { this.handleShow(book) }} className="flex-c-m size1 bg4 bo-rad-23 hov1 s-text1 trans-0-4">
                                        Add to Cart
                                </button>
                                </div>
                            </div>
                        </div>
                        <div className="block2-txt p-t-20">
                            <Link to={'/bookdetail/' + book.bookId} className="block2-name dis-block s-text3 p-b-5">
                                {book.bookName}
                            </Link>
                            <span className="block2-price m-text6 p-r-5">
                                Price: ${book.price}
                            </span>
                        </div>
                    </div>
                </div>;
            } else {
                return '';
            }
        });

        const afterFiveNode =
            this.state.bookList.map((book, index) => {
                if (index >= 5) {
                    return <div key={index} className="col p-b-50">
                        <div className="block2">
                            <div className="block2-img wrap-pic-w of-hidden pos-relative">
                                <img alt="book-img" className="book-img" key={index} src={'/images/' + book.bookImg} />
                                <div className="block2-overlay trans-0-4">
                                    <a href="/bookdetail" className="block2-btn-addwishlist hov-pointer trans-0-4">
                                        <i className="icon-wishlist icon_heart_alt" aria-hidden="true"></i>
                                        <i className="icon-wishlist icon_heart dis-none" aria-hidden="true"></i>
                                    </a>
                                    <div className="block2-btn-addcart w-size1 trans-0-4">
                                        <button onClick={this.handleShow} className="flex-c-m size1 bg4 bo-rad-23 hov1 s-text1 trans-0-4">
                                            Add to Cart
                                </button>
                                    </div>
                                </div>
                            </div>
                            <div className="block2-txt p-t-20">
                                <Link to={'/bookdetail/' + book.bookId} className="block2-name dis-block s-text3 p-b-5">
                                    {book.bookName}
                                </Link>
                                <span className="block2-price m-text6 p-r-5">
                                    Price: ${book.price}
                                </span>
                            </div>
                        </div>
                    </div>;
                } else {
                    return '';
                }
            });

        return (
            <div>
                <Header />
                <div className="container d-flex justify-content-center">
                    {beforeFiveNode}
                </div>
                <div className="container d-flex justify-content-center">
                    {afterFiveNode}
                </div>
                {this.state.bookList.length === 0 && <h4>We're Sorry! No Books Available!</h4>}
                    <Modal
                        aria-labelledby="contained-modal-title-vcenter"
                        centered
                        className="modal-dialog-centered"
                        show={this.state.show}
                        onHide={this.handleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>Book Store</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>Hurray! <h4>{this.state.bookName}</h4> is added to cart !</Modal.Body>
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

export default ViewBooks;