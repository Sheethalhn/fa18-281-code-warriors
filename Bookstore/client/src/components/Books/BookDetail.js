import React, { Component } from 'react';
import * as API from '../../api/API';
import Header from '../Header/Header';
import './books.css';


class BookDetail extends Component {

    constructor(props) {
        super(props);
        this.state = {
            bookObj: {},
            bookList: [],
            bookId: ""
        };
    }

    componentDidMount() {
        this.setState({
            bookId: this.props.match.params.bookId
        })
        if (this.state.bookId != null) {
            this.setState({
                bookObj: { price: 1.32, bookName: "book1", bookImg: "img1.jpg", bookDesc: "My desc-1", author: "Shreya Shah", bookId: "1" }
            });
            API.getBookByIds(this.state.bookId.split(","))
                .then((resultData) => {
                    if (!!resultData) {
                        this.setState({
                            bookObj: { price: 1.32, bookName: "book1", bookImg: "img1.jpg", bookDesc: "My desc-1", author: "Shreya Shah", bookId: "1" }
                        });
                    } else {
                        console.log("There are no books in DB");
                    }
                });
        }

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
                                            <img src={'/images/'+this.state.bookObj.bookImg} alt="IMG-PRODUCT" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="w-size14 p-t-30 respon5">
                            <h4 className="product-detail-name m-text16 p-b-13">
                                {this.state.bookObj.bookName}
                            </h4>
                            <span className="m-text17">
                                {this.state.bookObj.price}
                            </span>
                            <p className="s-text8 p-t-10">
                                {this.state.bookObj.bookDesc}
                            </p>
                            <div className="p-t-33 p-b-60">
                                <div className="flex-r-m flex-w p-t-10">
                                    <div className="w-size16 flex-m flex-w">
                                        <div className="btn-addcart-product-detail size9 trans-0-4 m-t-10 m-b-10">
                                            <button className="flex-c-m sizefull bg1 bo-rad-23 hov1 s-text1 trans-0-4">
                                                Add to Cart
								            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default BookDetail;