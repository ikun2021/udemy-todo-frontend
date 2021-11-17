import React, { Component } from 'react';
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom';
import AuthenticatedRoute from './AuthenticatedRoute.jsx';
import LoginComponent from './LoginComponent.jsx';
import HeaderComponent from './HeaderComponent.jsx';
import ListComponent from './ListComponent.jsx';
import LogoutComponent from './LogoutComponent.jsx';
import WelcomeComponent from './WelcomeComponent.jsx';
import FooterComponent from './FooterComponent.jsx';
import ErrorComponent from './ErrorComponent.jsx';
import TodoComponent from  './TodoComponent.jsx';



export default class TodoApp extends Component{
    render(){
        return(
            <div className="TodoApp">
                <Router>
                <HeaderComponent/>
                    <Switch>
                    <Route path="/" exact component={LoginComponent}/>
                    <Route path="/logout" exact component={LogoutComponent}/>
                    <Route path="/login" component={LoginComponent}/>
                    <AuthenticatedRoute path="/welcome/:name" component={WelcomeComponent}/>
                    <AuthenticatedRoute path="/list" component={ListComponent}/>
                    <AuthenticatedRoute path="/todos/:id" component={TodoComponent}/>
                    <Route  component={ErrorComponent}/>
                    </Switch>   
                <FooterComponent/>      
                </Router>
            </div>
        )
    }
}










