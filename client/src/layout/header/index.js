import React, { Component } from 'react';
import { NavLink, Link } from "react-router-dom";
import ReactDOM from 'react-dom';
import Headroom from 'react-headroom';
import Notifications from 'components/Notifications';
import ProfileMenu from 'components/ProfileMenu';
import ArticlesMenu from 'components/ArticlesMenu';
import Sidebar from 'components/Sidebar';
import image from './assets/logo.png';

import './index.css';

const modalRoot = document.getElementById('modal-root');

export default class Header extends Component {
    componentDidMount() {
        modalRoot.appendChild(this.el);
        this.handleResize();
        window.addEventListener('resize', this.handleResize);
    }

    componentWillUnmount() {
        modalRoot.removeChild(this.el);
        window.removeEventListener('resize', this.handleResize);
    }

    onHide = () => {
        this.setState({
            visible: false
        });
    }

    onControlssHide = () => {
        this.setState({
            controlsVisible: false
        });
    }

    state = {
        visible: false,
        controlsVisible: false,
    }

    el = document.createElement('div');

    handleResize = () => {
        window.innerWidth >= 1025
            && this.onHide()
            && this.onControlssHide();
    }

    renderSidebar() {
        return (
            ReactDOM.createPortal(
                <Sidebar
                    key="menu"
                    visible={this.state.visible}
                    position='right'
                    className="mobile-menu-wrapper"
                    onHide={this.onHide}
                >
                    {this.renderMenuLinks()}
                </Sidebar>,
                this.el
            )
        )
    }

    renderMenuLinks() {
        return (
            <ul className="menu">
                <li>
                    <NavLink
                        to="/"
                        activeClassName="active"
                        exact
                    >
                        Dashboard
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to="/menuitem1"
                        activeClassName="active"
                        exact
                    >
                        MenuItem1
                    </NavLink>
                </li>
            </ul>
        );
    }

    renderHeaderBottom() {
        return (
            <Headroom disableInlineStyles>
                <div className="header-bottom">
                    {this.renderMenuLinks()}
                </div>
            </Headroom>
        )
    }

    renderNavButton() {
        return (
            <button
                key="nav"
                className="header-bar-button"
                onClick={() => this.setState({ visible: true })}
            >
                <i className="fa far fa-navicon" />
            </button>
        );
    }

    renderControlsButton() {
        return (
            <button
                className="controls-button"
                onClick={() => this.setState({ controlsVisible: !this.state.controlsVisible })}
            >

                <i className="fa far fa-ellipsis-h" />
            </button>
        );
    }

    renderMobileButtons() {
        return (
            <div className="header-mobile-buttons">
                {this.renderNavButton()}
                {this.renderControlsButton()}
            </div>
        );
    }

    render() {
        const {
            controlsVisible,
        } = this.state;

        return (
            <header className={`header${controlsVisible ? ' controls-visible' : ''}`}>
                <div className="header-top-wrapper">
                    <div className="header-top">
                        <div className="header-left">
                            <div className="logo">
                                <Link to="/">
                                    <img src={image} alt="Walling Info Systems" />
                                </Link>
                            </div>
                            {this.renderMobileButtons()}
                        </div>
                        <div className={`header-right${controlsVisible ? ' show-controls' : ''}`}>
                            <div className="options">
                                <div className="notifications">
                                    <Notifications />
                                </div>
                                <div className="profile">
                                    <ProfileMenu />
                                </div>
                                <div className="news">
                                    <ArticlesMenu />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {this.renderHeaderBottom()}
                {this.renderSidebar()}
            </header>
        );
    }
}