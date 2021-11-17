import { Component } from 'react';
import {Link} from 'react-router-dom'


class WelcomeComponent extends Component{

    constructor(props){
        super(props);
        this.state={
            message:""
        }
    }
   
    render(){
        return(
            <>
            <h1>Welcome!</h1>
            <div className="container">
                Welcome to Todo.  {this.props.match.params.name} <br/>
                <Link to="/list"> Your Todo list</Link>
            </div>
            </>
            /* <div className="container">
                Click here to get a hello from backend
                <button onClick={this.retrieveHello} className="btn btn-success">Get welcome message</button>
            </div>
            <div className="container">
                Click here to get a bean from backend
                <button onClick={this.retrieveVariable} className="btn btn-success">CLICK</button>
            </div>
            <div className="container">
               hello world, {this.state.message}
            </div>
            </> */
        )
    }

    // retrieveHello(){
    //     HelloService.executeHelloService()
    //     //you get a promise ,then define what to do after that
    //     //success
    //     .then(response=>this.handleSuccessPromise(response))
    //     //fail
    //     .catch(error=>this.handleFailedPromise(error))
        
    // }

    // retrieveBean(){
    //     HelloService.executeBeanService()
    //     //you get a promise ,then define what to do after that
    //     //success
    //     .then(response=>this.handleSuccessPromise(response))
    //     //fail
    //     .catch(error=>this.handleFailedPromise(error))
        
    // }

    // retrieveVariable(){
    //     HelloService.executeVariableService(this.props.match.params.name)
    //     //you get a promise ,then define what to do after that
    //     //success
    //     .then(response=>this.handleSuccessPromise(response))
    //     //fail
    //     .catch(error=>this.handleFailedPromise(error))
        
    // }

    // handleSuccessPromise(response){
    //     this.setState({message:response.data})
    // }

    // handleFailedPromise(error){
    //     console.log(error.response)
    //     this.setState({message:error.response.data.message})
    // }
}

export default WelcomeComponent