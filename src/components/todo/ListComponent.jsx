import React, { Component } from 'react';
import TodoDataSerive from '../../api/todo/TodoDataService.js'   
import moment from 'moment';
import { useNavigate } from 'react-router';

//we can pass method of parent component to child component as props  
class ListComponent extends Component{
    //constructor render componentDIdMount（lifecycle method）的执行顺序
    constructor(props){
        super(props)
        this.state ={
            list:[],
            message:null
        }
        this.deleteClicked =this.deleteClicked.bind(this)
        this.refresh=this.refresh.bind(this)
        this.updateClicked=this.updateClicked.bind(this)
        this.addClicked=this.addClicked.bind(this)
    }

    
    //組件渲染后調用life circle method
    //调用顺序：constructor--render--componentDidMount--(state update后)再次render
    componentDidMount(){
        this.refresh();
        
    }
    

    //when a component is remove from the view
    // componentWillUnmount(){
    //     console.log('WillUnmount')
    // }

    // shouldComponentUpdate(nextProps,nextState){
    //     console.log(nextProps) 
    //     console.log(nextState)
    //some conditonal logic to return true or false
    //     return true  //render组件
    //     return false //即使this.state更新，也不render组件
    // }

    refresh(){
        let name = sessionStorage.getItem("Username")
        TodoDataSerive.findAll(name)
        .then(
            response=>{
                console.log('findall method gets called')
                console.log(response.data);
                this.setState(
                    {list:response.data}
                    )
            }
        )
        .catch()
    }

    deleteClicked(id){
        let name = sessionStorage.getItem("Username")
        console.log("delete"+id+name)
        TodoDataSerive.deleteById(name,id)
        .then(
            response=>{
                this.setState({message:`delete of todo id ${id} successfully`})
                this.refresh()
            }
        )
        .catch()
    }
    

    //跳转去todo内容的页面
    updateClicked(id){
        const navigate = this.props.myHookValue
        navigate(`/todos/${id}`)
        
    }

    addClicked(){
        const navigate = this.props.myHookValue
        //show todo page with empty form
        navigate(`/todos/-1`)
    }
    

    render(){
        return(
            <>
            <h1>List</h1> 
            <button className="btn btn-success" onClick={this.addClicked}>Add new Todo</button>
            {this.state.message&&<div className="alert alert-success">{this.state.message}</div>}
            <div className="container">
            <table className="table">
                <thead>
                <tr>
                    <th>description</th>
                    <th>targetDate</th>
                    <th>isDone</th>
                    <th>delete</th>
                    <th>update</th>
                </tr>
                </thead>
                <tbody>
                {this.state.list.map(
                    todo =>
                        <tr key={todo.id}>
                            <td>{todo.description}</td>  
                            <td>{moment(todo.targetDate).format("YYYY-MM-DD")}</td> 

                            <td>{todo.done.toString()}</td> 

                            <td><button className="btn btn-warning" onClick={()=>this.deleteClicked(todo.id)}>delete</button></td>
                            <td><button className="btn btn-success" onClick={()=>this.updateClicked(todo.id)}>update</button></td>
                        </tr>
                    )}
                </tbody>       
            </table>
            </div>
            
            </>
        )
    }
}
//可以在class外define default props，还可以作props的type check
//ListComponent.defaultProps = {by:1};
//ListComponent.propTypes={
//     by:propTypes.number
// }

function withMyHook(Component) {
    return function WrappedComponent(props) {
      const myHookValue = useNavigate();
      return <Component {...props} myHookValue={myHookValue} />;
    }
}

export default withMyHook(ListComponent)

