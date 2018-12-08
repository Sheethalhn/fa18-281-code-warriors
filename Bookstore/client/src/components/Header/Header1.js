import React, { Component } from 'react';
import bookStoreLogo from './book_store.jpg';
import userImg from './login.png';
import cartImg from './signup.png';
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
                            <a href="/" className="logo">
                                <img src={bookStoreLogo} alt="IMG-LOGO" className="header-img" />
                            </a>

                            <div className="header-icons">
                                <a href="/login" className="header-wrapicon1 dis-block">
                                    <img src={userImg} className="header-icon1" alt="ICON" />
                                </a>

                                <span className="linedivide1"></span>

                                <div className="header-wrapicon2">
                                    <a href="/signup">
                                        <img src={cartImg} className="header-icon1 js-show-header-dropdown" alt="ICON" />
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

export default Header1;