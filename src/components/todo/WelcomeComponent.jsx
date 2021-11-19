import { Component } from 'react';
import {Link} from 'react-router-dom'


class WelcomeComponent extends Component{

    constructor(props){
        super(props);
        this.state={
            message:""
        }
    }
    

    //url传参问题还没有解决！！无法显示{this.props.name}
    render(){
        return(
            <>
            <h1>Welcome!</h1>
            <div className="container">
                Welcome to Todo. {this.props.name}  <br/>
                <Link to="/list"> My Todo list</Link>
            </div>
            </>
        )
    }
}

export default WelcomeComponent