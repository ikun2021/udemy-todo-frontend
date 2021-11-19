import React, { Component } from 'react';
import {BrowserRouter as Router,Route,Routes} from 'react-router-dom';
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
                    <Routes>
                    <Route path="/"  element={<LoginComponent/>}/>
                    <Route path="/logout"  element={<LogoutComponent/>}/>
                    <Route path="/login" element={<LoginComponent/>}/>
                    <Route path="/list" element={
                        <AuthenticatedRoute>
                            <ListComponent/>
                        </AuthenticatedRoute>
                    }/> 
                    <Route path="/welcome/:name" element={
                        <AuthenticatedRoute>
                             <WelcomeComponent/>
                        </AuthenticatedRoute>
                    }/> 
                    <Route path="/todos/:id" element={
                        <AuthenticatedRoute>
                            <TodoComponent/>
                        </AuthenticatedRoute>
                    }/>
                    <Route path="*" element={<ErrorComponent/>}/>
                    </Routes>  
                <FooterComponent/>      
                </Router>
            </div>
        )
    }
}










