import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import AuthenticationService from './AuthenticationService.jsx';
import { Link } from 'react-router-dom'
class HeaderComponent extends Component {
    render() {

        const isLoggedIn = AuthenticationService.isLoggedIn();

        return (
            <header>
                <nav className="navbar navbar-expand-md bg-dark navbar-dark">
                    <a href="http://www.baidu.com" className="navbar-brand">Baidu</a>
                    <ul className="navbar-nav">
                        {isLoggedIn && <li><Link className="nav-link" to="/welcome/admin">Home</Link></li>}
                        {isLoggedIn && <li><Link className="nav-link" to="/list">TodoList</Link></li>}

                    </ul>
                    <ul className="navbar-nav navbar-collapse justify-content-end">
                        {!isLoggedIn && <li><Link className="nav-link" to="/login">Login</Link></li>}
                        {isLoggedIn && <li><Link className="nav-link" to="/logout" onClick={AuthenticationService.logout}>Logout</Link></li>}
                    </ul>
                </nav>
            </header>
        )
    }
}

export default HeaderComponent;