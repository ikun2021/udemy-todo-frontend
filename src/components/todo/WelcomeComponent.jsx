import { Component } from 'react';
import {Link} from 'react-router-dom'


class WelcomeComponent extends Component{

    constructor(props){
        super(props);
    }
    

    //url传参问题还没有解决！！无法得到{this.props.name}
    //react router v6 中无法从props获取参数，并且，针对类组件的withRouter高阶组件已被移除。因此对于类组件来说，使用参数有两种兼容方法：

    //1. 将类组件改写为函数组件
    //2. 自己写一个HOC来包裹类组件，用useParams获取参数后通过props传入原本的类组件
    render(){
        console.log(this.props)
        return(
            
            <>
            <h1>Welcome!</h1>
            <div className="container">
                Welcome to Todo.  <br/>
                <Link to="/list"> My Todo list</Link>
            </div>
            </>
        )
    }
}

export default WelcomeComponent