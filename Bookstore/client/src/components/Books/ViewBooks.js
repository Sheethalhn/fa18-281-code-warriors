import React, { Component } from 'react';
import Header from '../Header/Header';
import './books.css';
import * as API from '../../api/BookAPI';
import { Link } from 'react-router-dom';

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
                    console.log(resultData)
                    this.setState({
                        bookList: JSON.parse(JSON.stringify(resultData.data))
                    });
                } else {
                    console.log("There are no open projects in DB");
                }
            });
    }

    render() {

        const beforeFiveNode = this.state.bookList.map((book, index) => {
            if (index < 5) {
                return <div key={index} className="col p-b-50">
                    <div className="block2">
                        <div className="block2-img wrap-pic-w of-hidden pos-relative block2-labelnew">
                            <img alt="book-img" className="book-img" key={index} src={require(`./images/img${index + 1}.jpg`)} />
                            <div className="block2-overlay trans-0-4">
                                <Link to="" className="block2-btn-addwishlist hov-pointer trans-0-4">
                                    <i className="icon-wishlist icon_heart_alt" aria-hidden="true"></i>
                                    <i className="icon-wishlist icon_heart dis-none" aria-hidden="true"></i>
                                </Link>
                                <div className="block2-btn-addcart w-size1 trans-0-4">
                                    <button className="flex-c-m size1 bg4 bo-rad-23 hov1 s-text1 trans-0-4">
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
            booktable.map((book, index) => {
                if (index >= 5) {
                    return <div key={index} className="col p-b-50">
                        <div className="block2">
                            <div className="block2-img wrap-pic-w of-hidden pos-relative">
                                <img alt="book-img" className="book-img" key={index} src={require(`./images/img${index + 1}.jpg`)} />
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
            </div>
        )
    }
}

export default ViewBooks;