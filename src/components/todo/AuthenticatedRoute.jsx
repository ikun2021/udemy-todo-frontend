import { Component } from "react";
import { Route,Redirect } from "react-router-dom";
import AuthenticationService from "./AuthenticationService.jsx";

class AuthenticatedRoute extends Component{
    render(){
        if(AuthenticationService.isLoggedIn()){
           return <Route {...this.props}></Route>
        }else{
            return <Redirect to="/login"/>
        }
    } 
}

export default  AuthenticatedRoute