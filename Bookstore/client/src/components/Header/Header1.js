import React, { Component } from 'react';
import bookStoreLogo from './book_store.jpg';
import userImg from './user.png';
import cartImg from './cart.png';
import './header.css';

class Header1 extends Component {

    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <div>
                <header className="header1">
                    <div className="container-menu-header">
                        <div className="wrap_header">
                            <a href="/books" className="logo">
                                <img src={bookStoreLogo} alt="IMG-LOGO" className="header-img" />
                            </a>



                        </div>
                    </div>
                </header>

            </div>
        )
    }
}

export default Header1;