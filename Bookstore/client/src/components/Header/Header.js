import React, { Component } from 'react';
import bookStoreLogo from './book_store.jpg';
import bookImg from './download.png';
import cartImg from './cart1.png';
import tranImg from './transaction.png';
import logoutImg from './logout.jpg';
import './header.css';

class Header extends Component {

    constructor(props) {
        super(props);
        this.state = {
        };
    }

    doLogout = () => {
        localStorage.removeItem('userId');
        window.location = "/";
    }

    render() {
        return (
            <div>
                <header className="header1">
                    <div className="container-menu-header">
                        <div className="wrap_header">
                            <a href="/" className="logo">
                                <img src={bookStoreLogo} alt="IMG-LOGO" className="header-img" />
                            </a>
                            <div className="header-icons">
                                <a href="/books" className="header-wrapicon1 dis-block">
                                    <img src={bookImg} className="header-icon1" alt="ICON" />
                                </a>

                                <span className="linedivide1"></span>

                                <div className="header-wrapicon2">
                                    <a href="/viewshoppingcart">
                                        <img src={cartImg} className="header-icon1 js-show-header-dropdown" alt="ICON" />
                                    </a>
                                </div>
                                <span className="linedivide1"></span>
                                <div className="header-wrapicon2">
                                    <a href="/transaction">
                                        <img src={tranImg} className="header-icon1 js-show-header-dropdown" alt="ICON" />
                                    </a>
                                </div>
                                <span className="linedivide1"></span>
                                <div className="header-wrapicon2">
                                    <a onClick= {()=>this.doLogout()}>
                                        <img src={logoutImg} className="header-icon1 js-show-header-dropdown" alt="ICON" />
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </header>

            </div>
        )
    }
}

export default Header;