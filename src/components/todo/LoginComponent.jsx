import { Component } from "react";
import AuthenticationService from "./AuthenticationService.jsx";

//a controlled component: any change is dictated by state
class LoginComponent extends Component{

    constructor(props){
        super(props);
        this.state={
            username:'admin',   
            password:'123123',
            loginSuccess: false,
        }
        this.handleChange = this.handleChange.bind(this)
        this.loginClicked = this.loginClicked.bind(this)

    }

    render(){
        return(
            <div>
                <h1>Login</h1>
                <div className="container">    
                Username:<input type="text" name="username" value={this.state.username} onChange={this.handleChange}/> <br/>
                Password:<input type="password" name="password" value={this.state.password} onChange={this.handleChange}/><br/>
                <button className="btn btn-success" onClick={this.loginClicked}>Login</button> 
                </div> 
            </div> 
        )
    }
    
    //a generic event to handle changes
    handleChange(event){
        this.setState(
            {
                [event.target.name]: event.target.value  // 左边的必须是常量不能是变量，所以加书括号
            }
        )
    }


    loginClicked(){ 
        AuthenticationService.executeAuth(this.state.username,this.state.password)
        .then(
            (response)=>{
                console.log(response);
                AuthenticationService.registerWithToken(this.state.username,response.data.token);
                this.props.history.push(`/welcome/${this.state.username}`)    
            }
        )
    }
}

export default LoginComponent