import { Component } from "react";
import { useNavigate } from "react-router";
import AuthenticationService from "./AuthenticationService.jsx";

//a controlled component: any change is dictated by state
class LoginComponent extends Component{
        //define initial state in constructor
        constructor(props){
        //必须声明super，才能在jsx中使用state
        super(props);
        this.state={
            username:'admin',   
            password:'',
            loginSuccess: false,
        }
        //如果方法在class中以箭函数的形式声明，则不需要bind this，因为箭函数会自动绑定this，调用时，还是要使用this.handleChange
        this.handleChange = this.handleChange.bind(this)
        this.loginClicked = this.loginClicked.bind(this)

    }
    

    //onClick传入直接方法名，this.方法名 不加括号 不传参数（不然会直接执行，不click也执行该方法）  方法要在construtor中绑定this
    //onClick还可以传入箭函数，可以传参数 onClick={()=>this.props.incrementMethod(this.props.by)}  provide a reference of this method
    //当给event listener传参数时，只能选择用箭函数！！！
    //render 方法也可以改成箭函数形式
    render (){
        return(
            <>
                <h1>Login</h1>

                {this.state.loginSuccess&&<span>You have logged in successfully!</span>} 
                
                <div className="container">    
                Username:<input type="text" name="username" value={this.state.username} onChange={this.handleChange}/> <br/>
                Password:<input type="password" name="password" value={this.state.password} onChange={this.handleChange}/><br/>
                <button className="btn btn-success" onClick={this.loginClicked}>Login</button> 
                </div> 
            </> 
        )
    }
    
    //Component内部的方法，不用加function
    handleChange =(event)=>{
        // console.log(event)
        // console.log(event.target.value)       name="username" name="password" 需与state里面的变量名称一致
        //不能直接改变state的值，要调用setState    新版本直接用hook useState
        //如果没有传入password，则state中password不变。setState是merge操作，改变了name，就更新name，password不更新。
        this.setState(
            {
                [event.target.name]: event.target.value  // target.name可以是username，可以是password。代码复用！左边的必须是常量不能是变量，所以加书括号
            }
        )
    }

    loginClicked(){
        const navigate = this.props.myHookValue
        navigate(`/welcome/${this.state.username}`)
    }


    // loginClicked(){ 
    //     AuthenticationService.executeAuth(this.state.username,this.state.password)
    //     .then(
    //         (response)=>{
    //             console.log(response);
    //             AuthenticationService.registerWithToken(this.state.username,response.data.token);
    //             this.props.history.push(`/welcome/${this.state.username}`)    //this.props.history.push
    //         }
    //     )
    // }
}

function withMyHook(Component) {
    return function WrappedComponent(props) {
      const myHookValue = useNavigate();
      return <Component {...props} myHookValue={myHookValue} />;
    }
  }

export default withMyHook(LoginComponent)