import React, { Component } from 'react';
import Header from '../Header/Header';
import './books.css';
import * as API from '../../api/API';


var booktable = [{ price: 1.32, bookname: "book1" },
{ price: 2.45, bookname: "book2" },
{ price: 1.32, bookname: "book3" },
{ price: 2.45, bookname: "book4" },
{ price: 1.32, bookname: "book5" },
{ price: 2.45, bookname: "book6" },
{ price: 2.45, bookname: "book7" },
{ price: 2.45, bookname: "book8" },
{ price: 2.45, bookname: "book9" },
{ price: 2.45, bookname: "book10" }
]

class ViewBooks extends Component {

    constructor(props) {
        super(props);
        this.state = {
            bookList: []
        };
    }

    componentDidMount() {
        API.getBooks()
            .then((resultData) => {
                if (!!resultData) {
                    this.setState({
                        bookList: resultData
                    });
                } else {
                    console.log("There are no open projects in DB");
                }
            });
    }

    render() {

        const beforeFiveNode = booktable.map((book, index) => {
            if (index < 5) {
                return <div key={index} className="col p-b-50">
                    <div className="block2">
                        <div className="block2-img wrap-pic-w of-hidden pos-relative block2-labelnew">
                            <img alt="book-img" className="book-img" key={index} src={require(`./img${index + 1}.jpg`)} />
                            <div className="block2-overlay trans-0-4">
                                <a href="/bookdetail" className="block2-btn-addwishlist hov-pointer trans-0-4">
                                    <i className="icon-wishlist icon_heart_alt" aria-hidden="true"></i>
                                    <i className="icon-wishlist icon_heart dis-none" aria-hidden="true"></i>
                                </a>
                                <div className="block2-btn-addcart w-size1 trans-0-4">
                                    <button className="flex-c-m size1 bg4 bo-rad-23 hov1 s-text1 trans-0-4">
                                        Add to Cart
                                </button>
                                </div>
                            </div>
                        </div>
                        <div className="block2-txt p-t-20">
                            <a href="product-detail.html" className="block2-name dis-block s-text3 p-b-5">
                                {book.bookname}
                            </a>
                            <span className="block2-price m-text6 p-r-5">
                                {book.price}
                            </span>
                        </div>
                    </div>
                </div>;
            } else {
                return '';
            }
        });

        const afterFiveNode =
            booktable.map((book, index) => {
                if (index >= 5) {
                    return <div key={index} className="col p-b-50">
                        <div className="block2">
                            <div className="block2-img wrap-pic-w of-hidden pos-relative">
                                <img alt="book-img" className="book-img" key={index} src={require(`./img${index + 1}.jpg`)} />
                                <div className="block2-overlay trans-0-4">
                                    <a href="/bookdetail" className="block2-btn-addwishlist hov-pointer trans-0-4">
                                        <i className="icon-wishlist icon_heart_alt" aria-hidden="true"></i>
                                        <i className="icon-wishlist icon_heart dis-none" aria-hidden="true"></i>
                                    </a>
                                    <div className="block2-btn-addcart w-size1 trans-0-4">
                                        <button className="flex-c-m size1 bg4 bo-rad-23 hov1 s-text1 trans-0-4">
                                            Add to Cart
                                </button>
                                    </div>
                                </div>
                            </div>
                            <div className="block2-txt p-t-20">
                                <a href="product-detail.html" className="block2-name dis-block s-text3 p-b-5">
                                    {book.bookname}
                                </a>
                                <span className="block2-price m-text6 p-r-5">
                                    {book.price}
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
            </div>
        )
    }
}

export default ViewBooks;